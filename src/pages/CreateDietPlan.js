import React, { useEffect, useState } from 'react';
import {
	Box,
	Button,
	Dialog,
	Grid,
	List,
	ListItem,
	ListItemText,
	IconButton as MaterialIconButton,
	TextField,
	Typography,
} from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';
import IconButton from '../components/IconButton';
import { DietTable, createData } from '../components/DietTable';
import { CloseIcon, GenerateIcon } from '../assets/icons/Icons';
import ItemPopup from '../components/ItemPopup';
import FormHandler from '../utils/FromHandler';
import { validateFoodInfo } from '../utils/Validations';
import CustomInputField from '../components/CustomInputField';
import { useDispatch, useSelector } from 'react-redux';
import {
	AddAllExportSuggestion,
	fetchDietPlan,
	removeDietPlanData,
	selectDietPlan,
	selectExportSuggestion,
	selectFoodList,
	selectSummary,
	selectUserInfo,
	updateExportSuggestionInformation,
} from '../redux/diet';
import * as dietService from '../services/ApiServices';
import { toast } from 'react-toastify';

const summaryState = [
	{ label: 'Gender', tag: 'gender' },
	{ label: 'Age', tag: 'age' },
	{ label: 'BMI', tag: 'bmi' },
	{ label: 'Diet Goal', tag: 'dietGoal' },
	{ label: 'Food Preference', tag: 'foodPreference' },
	{
		label: 'Daily Calorie Need',
		tag: 'daily_need_calori',
	},
	{
		label: 'Food Cuisine',
		tag: 'cuisine',
	},
	{ label: 'Dietary Restriction', tag: 'dieses' },
	{ label: 'Allergic Foods', tag: 'allergicFood' },
];

function ReasonDialogPopup({
	openReasonDialog,
	handleCloseSecondDialog,
	errors,
	onChange,
	onAddReason,
}) {
	return (
		<Dialog
			open={openReasonDialog}
			onClose={handleCloseSecondDialog}
			sx={{ paddingRight: '15px' }}
			fullWidth>
			<Grid
				container
				sx={{ boxShadow: 3 }}
				padding={'10px'}
				flexDirection={'row'}
				justifyContent={'space-between'}
				alignItems={'center'}>
				<Typography fontWeight={'600'}>
					Add reason for removing the item
				</Typography>
				<MaterialIconButton
					style={{ padding: '0' }}
					onClick={handleCloseSecondDialog}>
					<CloseIcon />
				</MaterialIconButton>
			</Grid>
			<Grid width={'100%'} paddingX={'10px'} paddingY={'0px'}>
				<CustomInputField
					type={'text'}
					name={'Reason'}
					placeholder={'Enter reason for cancelling here'}
					onChange={onChange}
					error={errors?.cancelReason}
					errorText={errors?.cancelReason}
				/>
				<Grid container justifyContent={'flex-end'} padding={'10px'}>
					<IconButton text={'Add Reason'} onClick={onAddReason} />
				</Grid>
			</Grid>
		</Dialog>
	);
}

function GridSection({ title, children }) {
	return (
		<Box
			sx={{ border: '1px solid #28696D', borderRadius: '5px' }}
			width={'100%'}
			marginBottom={'20px'}>
			<Grid container justifyContent={'center'} padding={'20px'}>
				<Typography align="center" color="#28696D" fontWeight={'700'}>
					{title}
				</Typography>
			</Grid>
			{children}
		</Box>
	);
}

const initialTableBtnState = {
	leftBtn: 'Add Suggestion',
	rightBtn: 'Refresh',
	rightBtnIcon: GenerateIcon,
};

function CreateDietPlan(props) {
	const dispatch = useDispatch();
	const summary = useSelector(selectSummary);
	const exportSuggestion = useSelector(selectExportSuggestion);
	const dietPlan = useSelector(selectDietPlan);
	const foodList = useSelector(selectFoodList);
	const userInfo = useSelector(selectUserInfo);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [popupData, setPopupData] = useState({});
	const [popupItemsData, setPopupItemsData] = useState([]);
	const [isPlanGenerated, setIsPlanGenerated] = useState(false);
	const [enableTableEdit, setEnableTableEdit] = useState(false);
	const [cancelReason, setCancelReason] = useState({
		ext_item: '',
		reason: '',
		itemIndex: '',
	});
	const [openCancelReasonDialog, setOpenCancelReasonDialog] = useState(false);
	const [tableOptionBtnState, setTableOptionBtnState] =
		useState(initialTableBtnState);
	const [deletedFoodItems, setDeletedFoodItems] = useState([]);
	const [finalFeedback, setFinalFeedback] = useState('');

	const { values, errors, initForm, handleSubmit, handleChangeForObject } =
		FormHandler(onSaveUpdatedFoodItem, validateFoodInfo);

	function onClickTableItem(day, items, itemKey) {
		setPopupData({
			day: `Day 0${day + 1}`,
			mealTime: itemKey,
			dayIndex: day,
			itemKey,
		});
		setPopupItemsData(items);
		const newItems = items.map(value => {
			return {
				...value,
				newItem: false,
				oldItem: value.item,
				isItemUpdated: false,
			};
		});
		initForm(newItems);
		setIsModalOpen(true);
	}

	function initializeNewFoodItem() {
		initForm([...values, { item: '', qty: '', reason: '', newItem: true }]);
	}

	function onClosePopup() {
		setIsModalOpen(false);
	}

	function onSaveUpdatedFoodItem() {
		const newItems = [];
		const updatedItems = [];
		const notUpdatedItems = [];
		values.filter(value => {
			if (value.newItem) {
				newItems.push({
					add_item: value.item,
					serv_qty: value.qty,
					calorie: value.calorie,
					reason: value.reason,
				});
			} else {
				if (value.isItemUpdated) {
					updatedItems.push({
						ext_item: value.oldItem,
						replaced_item: value.item,
						serv_qty: value.qty,
						calorie: value.calorie,
						reason: value.reason,
					});
				} else {
					notUpdatedItems.push({
						...value,
					});
				}
			}
		});

		const data = {
			day: popupData.dayIndex + 1,
			meal_time: popupData.mealTime,
			food_combo_exist: popupItemsData,
			updates: {
				change_items: updatedItems,
				add_new_items: newItems,
				deleted_items: deletedFoodItems,
			},
		};

		dispatch(
			updateExportSuggestionInformation(
				data,
				popupData.dayIndex,
				popupData.itemKey,
				notUpdatedItems,
			),
		);
		onClosePopup();
	}

	function addAllTableChangedData() {
		const data = {
			base_conditions: {
				food_type: summary.foodPreference.includes('Non-Vegetarian')
					? 'Non Veg'
					: 'Veg',
				food_cousine: [...summary.cuisine],
				disease: [...summary.dieses],
				alergic_info: `${summary.allergicFood}`,
			},
			ext_diet_plan: dietPlan,
			suggestions: exportSuggestion,
		};

		dispatch(AddAllExportSuggestion(data));
	}

	function generateDietPlan() {
		setIsPlanGenerated(true);
		const data = {
			daily_cal_need: `${summary.daily_need_calori}`,
			food_type: summary.foodPreference.includes('Non-Vegetarian')
				? 'Non Veg'
				: 'Veg',
			food_cousine: [...summary.cuisine],
			disease: [...summary.dieses],
			alergic_info: `${summary.allergicFood}`,
		};

		dispatch(fetchDietPlan(data));
	}

	function onClickSaveAllTableChanges() {
		if (tableOptionBtnState.rightBtn === 'Save') {
			addAllTableChangedData();
			onClickEnableTableEdit();
		} else {
			dispatch(removeDietPlanData());
			generateDietPlan();
		}
	}

	function onClickEnableTableEdit() {
		if (tableOptionBtnState.leftBtn === 'Cancel') {
			setEnableTableEdit(false);
			setTableOptionBtnState(initialTableBtnState);
		} else {
			setEnableTableEdit(true);
			setTableOptionBtnState({
				leftBtn: 'Cancel',
				rightBtn: 'Save',
				rightBtnIcon: undefined,
			});
		}
	}

	const handleCancelReasonDialog = (foodItem, itemIndex, isItemNew) => {
		if (isItemNew) {
			const clone = values.filter((item, index) => {
				if (index !== itemIndex) {
					return item;
				}
			});
			initForm(clone);
			return;
		}

		setCancelReason({ ...cancelReason, ext_item: foodItem, itemIndex });
		setOpenCancelReasonDialog(!openCancelReasonDialog);
	};

	function onAddRemoveItems() {
		const clone = values.filter((item, index) => {
			if (index !== cancelReason.itemIndex) {
				return item;
			}
		});
		initForm(clone);

		setDeletedFoodItems([
			...deletedFoodItems,
			{
				ext_item: cancelReason.ext_item,
				reason: cancelReason.reason,
			},
		]);

		setOpenCancelReasonDialog(!openCancelReasonDialog);
	}

	async function saveAllUserInformation() {
		const data = {
			user_info: userInfo,
			diet_plan_condition: dietPlan,
			expert_suggestion: exportSuggestion,
			expert_feed_back: finalFeedback,
		};

		await dietService.addAllInformation(data);
	}

	function errorCallback(message) {
		toast.error(message);
	}

	function renderGeneratedPlanSection(params) {
		if (isPlanGenerated) {
			return (
				<>
					<GridSection title={'Diet Plan'}>
						<Grid
							container
							width={'100%'}
							justifyContent={'center'}
							padding={'20px'}>
							<DietTable
								onClickItem={onClickTableItem}
								rows={dietPlan}
								isTableEditable={enableTableEdit}
							/>
						</Grid>
					</GridSection>
					<Grid
						container
						justifyContent={'flex-end'}
						marginY={'10px'}>
						<Button
							onClick={onClickEnableTableEdit}
							sx={{
								border: '2px solid #28696D',
								paddingLeft: '15px',
								paddingRight: '15px',
								color: '#28696D',
								textTransform: 'none',
								marginRight: '10px',
							}}>
							{tableOptionBtnState.leftBtn}
						</Button>
						<IconButton
							Icon={tableOptionBtnState.rightBtnIcon}
							text={tableOptionBtnState.rightBtn}
							onClick={onClickSaveAllTableChanges}
						/>
					</Grid>
					<GridSection title={'Add Feedback'}>
						<Grid
							container
							justifyContent="center"
							paddingY={'10px'}>
							<Grid
								border={'1px solid #D9D9D9'}
								bgcolor={'#FFFFFF'}
								borderRadius={'5px 0px 0px 5px'}
								padding={'10px'}
								width={'97%'}
								height={'200px'}>
								<TextField
									placeholder="If you have any feedback on the above generated plan, please mention here"
									multiline
									sx={{
										'& fieldset': { border: 'none' },
										width: '100%',
										height: '190px',
									}}
									onChange={e => {
										setFinalFeedback(e.target.value);
									}}
									value={finalFeedback}
									rows={12}
								/>
							</Grid>
						</Grid>
					</GridSection>
					<Grid
						container
						justifyContent={'flex-end'}
						paddingY={'5px'}>
						<IconButton
							text={'Save'}
							onClick={saveAllUserInformation}
						/>
					</Grid>
				</>
			);
		} else {
			return (
				<Grid container justifyContent={'flex-end'} marginY={'10px'}>
					<Button
						sx={{
							border: '2px solid #28696D',
							paddingLeft: '15px',
							paddingRight: '15px',
							color: '#28696D',
							textTransform: 'none',
							marginRight: '10px',
						}}
						onClick={props.backToPreviousStep}>
						Back
					</Button>
					<IconButton
						Icon={GenerateIcon}
						text={'Generate Plan'}
						onClick={generateDietPlan}
					/>
				</Grid>
			);
		}
	}

	return (
		<Grid container width={'90%'} alignItems={'center'}>
			<Typography paddingY={'10px'} fontWeight={'600'}>
				7 Days Diet Plan
			</Typography>
			<GridSection title={'Summary of Your Health & Daily Needs'}>
				<Grid
					container
					justifyContent="center"
					paddingX={'50px'}
					paddingY={'20px'}>
					{summaryState.map(({ label, tag }, index) => (
						<Grid
							item
							xs={5}
							sm={3}
							md={summaryState.length - 1 === index ? 8 : 2}
							key={index}
							border={'1px solid #B4B2B2'}
							padding={'10px'}
							bgcolor={'#FFFFFF'}>
							<Typography variant="body2" color="textSecondary">
								{label}
							</Typography>
							{Array.isArray(summary[tag]) ? (
								<List sx={{ paddingTop: '0px' }}>
									{summary[tag].map((item, index) => {
										return (
											<ListItem
												key={index}
												sx={{
													paddingTop: '0px',
													paddingLeft: '0px',
												}}>
												<Grid
													style={{
														borderRadius: '50%',
														width: '8px',
														height: '8px',
														backgroundColor:
															'#28696D',
														marginRight: '5px',
													}}
												/>
												<ListItemText>
													<Typography
														fontWeight={'700'}
														fontSize={'18px'}>
														{item}
													</Typography>
												</ListItemText>
											</ListItem>
										);
									})}
								</List>
							) : (
								<Typography
									fontWeight={'700'}
									fontSize={'18px'}>
									{summary[tag]}
								</Typography>
							)}
						</Grid>
					))}
				</Grid>
			</GridSection>
			{renderGeneratedPlanSection()}
			<ItemPopup
				isModalOpen={isModalOpen}
				onClose={onClosePopup}
				itemData={popupData}
				values={values}
				onChange={handleChangeForObject}
				errors={errors}
				onAddItem={initializeNewFoodItem}
				onSaveItems={handleSubmit}
				onOpenReasonPopup={handleCancelReasonDialog}
				foodData={foodList}
			/>
			<ReasonDialogPopup
				openReasonDialog={openCancelReasonDialog}
				handleCloseSecondDialog={handleCancelReasonDialog}
				onChange={value =>
					setCancelReason({ ...cancelReason, reason: value })
				}
				value={cancelReason}
				onAddReason={onAddRemoveItems}
			/>
		</Grid>
	);
}

export default CreateDietPlan;
