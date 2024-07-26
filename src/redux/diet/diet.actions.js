import {
	ADD_ALL_EXPERT_SUGGESTION_ERROR,
	ADD_ALL_EXPERT_SUGGESTION_REQUEST,
	ADD_ALL_EXPERT_SUGGESTION_SUCCESS,
	ADD_USER_INFO_ERROR,
	ADD_USER_INFO_REQUEST,
	ADD_USER_INFO_SUCCESS,
	FETCH_DIET_PLAN_ERROR,
	FETCH_DIET_PLAN_REQUEST,
	FETCH_DIET_PLAN_SUCCESS,
	FETCH_DIET_SUMMARY_ERROR,
	FETCH_DIET_SUMMARY_REQUEST,
	FETCH_DIET_SUMMARY_SUCCESS,
	FETCH_GENERAL_DATA_ERROR,
	FETCH_GENERAL_DATA_REQUEST,
	FETCH_GENERAL_DATA_SUCCESS,
	REMOVE_DIET_PLAN_ERROR,
	REMOVE_DIET_PLAN_REQUEST,
	REMOVE_DIET_PLAN_SUCCESS,
	UPDATE_EXPERT_SUGGESTION_ERROR,
	UPDATE_EXPERT_SUGGESTION_REQUEST,
	UPDATE_EXPERT_SUGGESTION_SUCCESS,
} from './';
import * as dietService from '../../services/ApiServices';
import { createData } from '../../components/DietTable';

export const fetchDietPlan = bodyData => {
	return async dispatch => {
		try {
			dispatch({ type: FETCH_DIET_PLAN_REQUEST });

			const dispatchPlanData = data => {
				const planData = JSON.parse(data);
				dispatch({
					type: FETCH_DIET_PLAN_SUCCESS,
					payload: createData(
						planData['Breakfast'],
						planData['Lunch'],
						planData['Dinner'],
						planData['Morning Snack'],
						planData['Eve_snack_Items'],
						planData['Pre-workout Snack'],
						planData['Post-workout Snack'],
					),
				});
			};

			await dietService.generateDietPlan(bodyData, dispatchPlanData);
		} catch (error) {
			console.log(error);
			dispatch({ type: FETCH_DIET_PLAN_ERROR });
		}
	};
};

export const getSummaryData = (summaryData, data) => {
	return async dispatch => {
		try {
			dispatch({ type: FETCH_DIET_SUMMARY_REQUEST });

			dispatch({
				type: FETCH_DIET_SUMMARY_SUCCESS,
				payload: {
					...summaryData,
					daily_need_calori: data.daily_need_calori,
					dieses: data.dieses,
				},
			});
		} catch (error) {
			console.log(error);
			dispatch({ type: FETCH_DIET_SUMMARY_ERROR });
		}
	};
};

export const addUserInformation = (bodyData, summaryData, errorCallback) => {
	return async dispatch => {
		try {
			dispatch({ type: ADD_USER_INFO_REQUEST });

			const data = await dietService.addUserInformation(bodyData);

			if (data.error) {
				errorCallback(data.message);
			} else {
				dispatch(getSummaryData(summaryData, data));

				dispatch({
					type: ADD_USER_INFO_SUCCESS,
					payload: bodyData,
				});
			}
		} catch (error) {
			console.log(error);
			dispatch({ type: ADD_USER_INFO_ERROR });
		}
	};
};

export const updateExportSuggestionInformation = (
	data,
	dayIndex,
	itemKey,
	notUpdatedItems,
) => {
	return async dispatch => {
		try {
			dispatch({ type: UPDATE_EXPERT_SUGGESTION_REQUEST });

			dispatch({
				type: UPDATE_EXPERT_SUGGESTION_SUCCESS,
				payload: {
					data,
					dayIndex,
					itemKey,
					updates: data.updates,
					notUpdatedItems,
				},
			});
		} catch (error) {
			console.log(error);
			dispatch({ type: UPDATE_EXPERT_SUGGESTION_ERROR });
		}
	};
};

export const AddAllExportSuggestion = bodyData => {
	return async dispatch => {
		try {
			dispatch({ type: ADD_ALL_EXPERT_SUGGESTION_REQUEST });

			const data = await dietService.AddAllExportSuggestions(bodyData);
			const formattedData = data.map(planData => {
				return createData(
					planData['breakfast'],
					planData['lunch'],
					planData['dinner'],
					planData['morningSnack'],
					planData['eveningSnack'],
					planData['preWorkout'],
					planData['postWorkout'],
				);
			});

			dispatch({
				type: ADD_ALL_EXPERT_SUGGESTION_SUCCESS,
				payload: formattedData,
			});
		} catch (error) {
			console.log(error);
			dispatch({ type: ADD_ALL_EXPERT_SUGGESTION_ERROR });
		}
	};
};

export const fetchGeneralData = () => {
	return async dispatch => {
		try {
			dispatch({ type: FETCH_GENERAL_DATA_REQUEST });

			const data = await dietService.fetchGeneralData();

			dispatch({
				type: FETCH_GENERAL_DATA_SUCCESS,
				payload: data,
			});
		} catch (error) {
			console.log(error);
			dispatch({ type: FETCH_GENERAL_DATA_ERROR });
		}
	};
};

export const removeDietPlanData = () => {
	return async dispatch => {
		try {
			dispatch({ type: REMOVE_DIET_PLAN_REQUEST });

			dispatch({
				type: REMOVE_DIET_PLAN_SUCCESS,
			});
		} catch (error) {
			console.log(error);
			dispatch({ type: REMOVE_DIET_PLAN_ERROR });
		}
	};
};
