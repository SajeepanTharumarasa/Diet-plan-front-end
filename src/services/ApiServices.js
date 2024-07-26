import axios from 'axios';

// eslint-disable-next-line no-undef
const baseUrl = process.env.REACT_APP_API_URL;

export async function addUserInformation(data) {
	try {
		const response = await axios.post(
			`${baseUrl}/disease_calorie_predictor`,
			data,
		);
		return response.data;
	} catch (error) {
		if (error.response) {
			return error.response.data;
		} else {
			console.error('Something went wrong', error.message);
			return { error: true, message: error.message };
		}
	}
}

export async function AddAllExportSuggestions(bodyData) {
	try {
		const response = await fetch(`${baseUrl}/expert_suggestion`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(bodyData),
		});

		const reader = response.body.getReader();
		const decoder = new TextDecoder();
		let receivedData = '';
		let jsonData = null;

		// eslint-disable-next-line no-constant-condition
		while (true) {
			const { done, value } = await reader.read();
			if (done) break;

			receivedData += decoder.decode(value, { stream: true });

			const dataIndex = receivedData.indexOf('data: ');
			const endIndex = receivedData.indexOf('data: Success');

			if (dataIndex !== -1 && endIndex !== -1) {
				const jsonString = receivedData
					.substring(dataIndex + 6, endIndex)
					.trim();
				try {
					jsonData = JSON.parse(jsonString);
					break;
				} catch (e) {
					console.error('Error parsing JSON:', e);
				}
			}
		}

		reader.cancel();
		return jsonData;
	} catch (error) {
		console.error('Error fetching plan data:', error);
	}
}

/***
 * This is a stream api
 */
export const generateDietPlan = async (bodyData, updateDietPlan) => {
	try {
		const response = await fetch(`${baseUrl}/generate_plan`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(bodyData),
		});

		const reader = response.body.getReader();
		const decoder = new TextDecoder('utf-8');
		let jsonBuffer = '';

		const handleStream = async () => {
			// eslint-disable-next-line no-constant-condition
			while (true) {
				const { done, value } = await reader.read();
				if (done) {
					processRemainingBuffer(jsonBuffer);
					break;
				}
				jsonBuffer += decoder.decode(value, { stream: true });
				jsonBuffer = processBuffer(jsonBuffer, updateDietPlan);
			}
		};

		handleStream();
	} catch (error) {
		console.error('Error fetching plan:', error);
	}
};

const processBuffer = (buffer, updateDietPlan) => {
	let boundary;
	while ((boundary = buffer.indexOf('\n')) !== -1) {
		const jsonString = buffer.slice(0, boundary);
		buffer = buffer.slice(boundary + 1); // Update the buffer before parsing to ensure complete data is removed even if parsing fails.
		if (jsonString.trim()) {
			// Only process non-empty lines
			try {
				const newJson = jsonString.replace('data: ', '');
				const dayMealPlan = JSON.parse(newJson);
				updateDietPlan(dayMealPlan);
			} catch (error) {
				console.error('Error parsing JSON:', error);
			}
		}
	}
	return buffer;
};

const processRemainingBuffer = (buffer, updateDietPlan) => {
	if (buffer.trim()) {
		// Only process non-empty remaining buffer
		try {
			const newJson = buffer.replace('data: ', '');
			const dayMealPlan = JSON.parse(newJson);
			updateDietPlan(dayMealPlan);
		} catch (error) {
			console.error('Error parsing remaining JSON:', error);
		}
	}
};

export async function fetchGeneralData() {
	try {
		const response = await axios.post(
			`${baseUrl}/cousin_disease_food_list`,
		);
		return response.data;
	} catch (error) {
		if (error.response) {
			return error.response.data;
		} else {
			console.error('Something went wrong', error.message);
			return { message: error.message };
		}
	}
}

export async function addAllInformation(bodyData) {
	try {
		const response = await axios.post(`${baseUrl}/save_info`, bodyData);
		return response.data;
	} catch (error) {
		if (error.response) {
			return error.response.data;
		} else {
			console.error('Something went wrong', error.message);
			return { message: error.message };
		}
	}
}
