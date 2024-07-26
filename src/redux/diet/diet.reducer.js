/* eslint-disable no-case-declarations */
import { updateObjectInArray } from '../../utils/Helpers';
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

const initialState = {
	dietPlan: [{}, {}, {}, {}, {}, {}, {}],
	summary: {},
	userInformation: {},
	exportSuggestion: [],
	foodList: [],
	foodCousins: [],
	healthConditions: [],
	dietTableDataIndex: -1,
	isUpdatingExportSuggestion: false,
	isFetchingDietPlan: false,
	isFetchingSummary: false,
	isAddingUserInfo: false,
	isFetchingGeneralData: false,
	isAddingAllTableChanges: false,
	isRemovingDietPlan: false,
};

const dietReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_DIET_PLAN_REQUEST:
			return {
				...state,
				isFetchingDietPlan: true,
			};
		case FETCH_DIET_PLAN_SUCCESS:
			return {
				...state,
				dietPlan: updateObjectInArray(
					state.dietPlan,
					state.dietTableDataIndex + 1,
					action.payload,
				),
				dietTableDataIndex: state.dietTableDataIndex + 1,
				isFetchingDietPlan: false,
			};
		case FETCH_DIET_PLAN_ERROR:
			return {
				...state,
				isFetchingDietPlan: false,
			};
		case FETCH_DIET_SUMMARY_REQUEST:
			return {
				...state,
				isFetchingSummary: true,
			};
		case FETCH_DIET_SUMMARY_SUCCESS:
			return {
				...state,
				summary: action.payload,
				isFetchingSummary: false,
			};
		case FETCH_DIET_SUMMARY_ERROR:
			return {
				...state,
				isFetchingSummary: false,
			};
		case ADD_USER_INFO_REQUEST:
			return {
				...state,
				isAddingUserInfo: true,
			};
		case ADD_USER_INFO_SUCCESS:
			return {
				...state,
				userInformation: action.payload,
				isAddingUserInfo: false,
			};
		case ADD_USER_INFO_ERROR:
			return {
				...state,
				isAddingUserInfo: false,
			};
		case UPDATE_EXPERT_SUGGESTION_REQUEST:
			return {
				...state,
				isUpdatingExportSuggestion: true,
			};
		case UPDATE_EXPERT_SUGGESTION_SUCCESS:
			const dayData = state.dietPlan[action.payload.dayIndex];
			const extItem = action.payload.updates.change_items.map(extVal => {
				return {
					item: extVal.replaced_item,
					qty: extVal.serv_qty,
				};
			});
			const newItem = action.payload.updates.add_new_items.map(extVal => {
				return {
					item: extVal.add_item,
					qty: extVal.serv_qty,
				};
			});

			const clone = {
				...dayData,
				[action.payload.itemKey]: [
					...action.payload.notUpdatedItems,
					...extItem,
					...newItem,
				],
			};

			return {
				...state,
				exportSuggestion: [
					...state.exportSuggestion,
					action.payload.data,
				],
				dietPlan: updateObjectInArray(
					state.dietPlan,
					action.payload.dayIndex,
					clone,
				),
				isUpdatingExportSuggestion: false,
			};
		case UPDATE_EXPERT_SUGGESTION_ERROR:
			return {
				...state,
				isUpdatingExportSuggestion: false,
			};
		case FETCH_GENERAL_DATA_REQUEST:
			return {
				...state,
				isFetchingGeneralData: true,
			};
		case FETCH_GENERAL_DATA_SUCCESS:
			return {
				...state,
				foodList: action.payload.food_list,
				healthConditions: action.payload.disease_list,
				foodCousins: action.payload.food_cuisine_list,
				isFetchingGeneralData: false,
			};
		case FETCH_GENERAL_DATA_ERROR:
			return {
				...state,
				isFetchingGeneralData: false,
			};
		case ADD_ALL_EXPERT_SUGGESTION_REQUEST:
			return {
				...state,
				isAddingAllTableChanges: true,
			};
		case ADD_ALL_EXPERT_SUGGESTION_SUCCESS:
			return {
				...state,
				dietPlan: action.payload,
				dietTableDataIndex: action.payload.length - 1,
				isAddingAllTableChanges: false,
			};
		case ADD_ALL_EXPERT_SUGGESTION_ERROR:
			return {
				...state,
				isAddingAllTableChanges: false,
			};
		case REMOVE_DIET_PLAN_REQUEST:
			return {
				...state,
				isRemovingDietPlan: true,
			};
		case REMOVE_DIET_PLAN_SUCCESS:
			return {
				...state,
				dietPlan: [{}, {}, {}, {}, {}, {}, {}],
				dietTableDataIndex: -1,
				isRemovingDietPlan: false,
			};
		case REMOVE_DIET_PLAN_ERROR:
			return {
				...state,
				isRemovingDietPlan: false,
			};
		default:
			return state;
	}
};

export default dietReducer;
