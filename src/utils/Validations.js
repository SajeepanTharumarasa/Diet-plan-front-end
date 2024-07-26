import { isNumber } from './Helpers';

export function validateUserDietInfo(values) {
	let errors = {};
	if (!values.gender || values.gender === '') {
		errors.gender = 'Gender is required';
	}

	if (!values.age || values.age === '') {
		errors.age = 'Age is required';
	} else if (!isNumber(values.age)) {
		errors.age = 'Please enter number';
	}

	if (!values.weight || values.weight === '') {
		errors.weight = 'Weight is required';
	} else if (!isNumber(values.weight)) {
		errors.weight = 'Please enter number';
	}

	if (!values.height || values.height === '') {
		errors.height = 'Height is required';
	} else if (!isNumber(values.height)) {
		errors.height = 'Please enter number';
	}

	if (!values.dietGoal || values.dietGoal === '') {
		errors.dietGoal = 'Diet goal is required';
	}

	if (!values.foodPreference || values.foodPreference === '') {
		errors.foodPreference = 'Food Preference is required';
	}

	if (!values.cuisine || values.cuisine === '') {
		errors.cuisine = 'Cuisine is required';
	}

	if (!values.healthCondition || values.healthCondition === '') {
		errors.healthCondition = 'Health Condition is required';
	}

	if (!values.allergicFood || values.allergicFood === '') {
		errors.allergicFood = 'Allergic Food is required';
	}

	if (!values.bmi || values.bmi === '') {
		errors.bmi = 'BMI is required';
	} else if (!isNumber(values.bmi)) {
		errors.bmi = 'Please enter number';
	}

	if (!values.bodyFat || values.bodyFat === '') {
		errors.bodyFat = 'Body Fat is required';
	} else if (!isNumber(values.bodyFat)) {
		errors.bodyFat = 'Please enter number';
	}

	if (!values.glucose || values.glucose === '') {
		errors.glucose = 'Glucose is required';
	} else if (!isNumber(values.glucose)) {
		errors.glucose = 'Please enter number';
	}

	if (!values.totalCholesterol || values.totalCholesterol === '') {
		errors.totalCholesterol = 'Total Cholesterol is required';
	} else if (!isNumber(values.totalCholesterol)) {
		errors.totalCholesterol = 'Please enter number';
	}

	if (!values.systolicBloodPressure || values.systolicBloodPressure === '') {
		errors.systolicBloodPressure = 'Systolic Blood Pressure is required';
	} else if (!isNumber(values.systolicBloodPressure)) {
		errors.systolicBloodPressure = 'Please enter number';
	}

	if (
		!values.diastolicBloodPressure ||
		values.diastolicBloodPressure === ''
	) {
		errors.diastolicBloodPressure = 'Diastolic Blood Pressure is required';
	} else if (!isNumber(values.diastolicBloodPressure)) {
		errors.diastolicBloodPressure = 'Please enter number';
	}

	if (
		!values.highDensityLipoprotein ||
		values.highDensityLipoprotein === ''
	) {
		errors.highDensityLipoprotein = 'High Density Lipoprotein is required';
	} else if (!isNumber(values.highDensityLipoprotein)) {
		errors.highDensityLipoprotein = 'Please enter number';
	}

	if (!values.lowDensityLipoprotein || values.lowDensityLipoprotein === '') {
		errors.lowDensityLipoprotein = 'Low Density Lipoprotein is required';
	} else if (!isNumber(values.lowDensityLipoprotein)) {
		errors.lowDensityLipoprotein = 'Please enter number';
	}

	if (!values.tcHDLRatio || values.tcHDLRatio === '') {
		errors.tcHDLRatio = 'Tc/HDL Ratio is required';
	} else if (!isNumber(values.tcHDLRatio)) {
		errors.tcHDLRatio = 'Please enter number';
	}

	if (!values.triglycerides || values.triglycerides === '') {
		errors.triglycerides = 'Triglycerides is required';
	} else if (!isNumber(values.triglycerides)) {
		errors.triglycerides = 'Please enter number';
	}

	return errors;
}

export function validateFoodInfo(values) {
	let errors = values.map(() => ({}));

	values.map((value, index) => {
		if (!value.item || value.item === '') {
			errors[index].item = 'Food is required';
		}

		if (!value.qty || value.qty === '') {
			errors[index].qty = 'Quantity is required';
		}

		if (Object.prototype.hasOwnProperty.call(value, 'reason')) {
			if (!value.reason || value.reason === '') {
				errors[index].reason = 'Reason is required';
			}
		}

		if (Object.prototype.hasOwnProperty.call(value, 'calorie')) {
			if (!value.calorie || value.calorie === '') {
				errors[index].calorie = 'Calorie is required';
			}
		}
	});

	const allErrorsEmpty = errors.every(
		error => Object.keys(error).length === 0,
	);

	return allErrorsEmpty ? {} : errors;
}
