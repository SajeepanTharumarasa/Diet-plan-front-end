import React, { useState } from 'react';
import {
	Box,
	Button,
	Dialog,
	DialogContent,
	Grid,
	Modal,
	Typography,
	IconButton as MaterialIconButton,
	DialogActions,
} from '@mui/material';
import { CloseIcon, PlusIcon } from '../assets/icons/Icons';
import CustomInputField from './CustomInputField';
import IconButton from './IconButton';

function ItemCard({
	itemNo,
	values,
	errors,
	onChange,
	foodData,
	onClickOpenReasonModal,
}) {
	const [isAddingNewFood, setIsAddingNewFood] = useState(false);
	const foodList = foodData.map(value => {
		return value.item;
	});

	function onChangeFoodItem(event, value) {
		const foodItem = foodData.find(food => food.item === value);
		if (foodItem) {
			const isNotNewItem =
				!values.newItem && values.item !== foodItem.item
					? { isItemUpdated: true }
					: {};
			onChange('multi', itemNo, {
				item: value,
				qty: foodItem.qty,
				...isNotNewItem,
			});
		} else {
			onChange('item', itemNo, value);
		}
	}

	function onCheckIsNewFood(event, newItem) {
		if (!foodList.includes(event.target.value)) {
			setIsAddingNewFood(true);
			const isNotNewItem = !newItem
				? { isItemUpdated: true }
				: { newItem: true };
			onChange('multi', itemNo, {
				item: event.target.value,
				qty: '',
				...isNotNewItem,
			});
		} else {
			setIsAddingNewFood(false);
		}
	}

	function renderInputFields() {
		if (isAddingNewFood) {
			return (
				<>
					<Grid width={'100%'} paddingX={'10px'} paddingY={'0px'}>
						<CustomInputField
							type={'searchDropdown'}
							name={'Change'}
							placeholder={'Select or search food'}
							dropDownData={foodList}
							value={values.item || ''}
							onChange={onChangeFoodItem}
							error={errors?.item ? true : false}
							errorText={errors?.item}
							onHandleBlur={e =>
								onCheckIsNewFood(e, values.newItem)
							}
						/>
					</Grid>
					<Grid container flexDirection={'row'} padding={'10px'}>
						<Grid item xs={12} sm={6}>
							<CustomInputField
								type={'text'}
								name={'Quantity'}
								value={values.qty || ''}
								placeholder={'Enter quantity here'}
								onChange={value =>
									onChange('qty', itemNo, value)
								}
								error={errors?.qty ? true : false}
								errorText={errors?.qty}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<CustomInputField
								type={'text'}
								name={'Calories'}
								value={values.calorie || ''}
								placeholder={'Enter calories here'}
								onChange={value =>
									onChange('calorie', itemNo, value)
								}
								error={errors?.calorie ? true : false}
								errorText={errors?.calorie}
							/>
						</Grid>
					</Grid>
					<Grid width={'100%'} paddingX={'10px'} paddingY={'0px'}>
						<CustomInputField
							type={'text'}
							name={'Reason'}
							value={values.reason || ''}
							placeholder={'Enter reason here'}
							onChange={value =>
								onChange('reason', itemNo, value)
							}
							error={errors?.reason ? true : false}
							errorText={errors?.reason}
						/>
					</Grid>
				</>
			);
		} else {
			return (
				<>
					<Grid container flexDirection={'row'} padding={'10px'}>
						<Grid item xs={12} sm={7}>
							<CustomInputField
								type={'searchDropdown'}
								name={'Food'}
								placeholder={'Select or search food'}
								dropDownData={foodList}
								value={values.item || ''}
								onChange={onChangeFoodItem}
								error={errors?.item ? true : false}
								errorText={errors?.item}
								onHandleBlur={e =>
									onCheckIsNewFood(e, values.newItem)
								}
							/>
						</Grid>
						<Grid item xs={12} sm={5}>
							<CustomInputField
								type={'text'}
								name={'Quantity'}
								value={values.qty || ''}
								placeholder={'Enter quantity here'}
								onChange={value =>
									onChange('qty', itemNo, value)
								}
								error={errors?.qty ? true : false}
								errorText={errors?.qty}
							/>
						</Grid>
					</Grid>
					{(values.isItemUpdated || values.newItem) && (
						<Grid width={'100%'} paddingX={'10px'} paddingY={'0px'}>
							<CustomInputField
								type={'text'}
								name={'Reason'}
								value={values.reason || ''}
								placeholder={'Enter reason here'}
								onChange={value =>
									onChange('reason', itemNo, value)
								}
								error={errors?.reason ? true : false}
								errorText={errors?.reason}
							/>
						</Grid>
					)}
				</>
			);
		}
	}

	return (
		<Grid
			container
			marginTop={'15px'}
			bgcolor={'#F4F5F7'}
			borderRadius={'5px'}>
			<Grid
				container
				flexDirection={'row'}
				justifyContent={'space-between'}
				alignItems={'center'}
				padding={'15px'}
				borderRadius={'5px'}>
				<Grid container width={'80%'} flexDirection={'row'}>
					<Typography
						bgcolor={'#FF8A45'}
						textAlign={'center'}
						color={'#FFFFFF'}
						paddingX={'5px'}
						borderRadius={'5px'}>
						{`Item 0${itemNo + 1}`}
					</Typography>
					<Typography marginLeft={'15px'} fontWeight={'600'}>
						{!values.newItem
							? `${values.item} | ${values.qty}`
							: 'New Item'}
					</Typography>
				</Grid>
				<MaterialIconButton
					style={{ padding: '0' }}
					onClick={onClickOpenReasonModal}>
					<CloseIcon />
				</MaterialIconButton>
			</Grid>
			{renderInputFields()}
		</Grid>
	);
}

function ItemPopup({
	isModalOpen,
	itemData,
	onClose,
	onAddItem,
	values,
	onChange,
	errors,
	onSaveItems,
	onOpenReasonPopup,
	foodData,
}) {
	return (
		<>
			<Dialog open={isModalOpen} onClose={onClose} scroll="body">
				<DialogContent style={{ padding: '0px 0px 20px 0px' }}>
					<Grid
						container
						sx={{ boxShadow: 3 }}
						padding={'10px'}
						flexDirection={'row'}
						justifyContent={'space-between'}
						alignItems={'center'}>
						<Typography fontWeight={'600'}>
							Add Suggestion
						</Typography>
						<MaterialIconButton
							style={{ padding: '0' }}
							onClick={onClose}>
							<CloseIcon />
						</MaterialIconButton>
					</Grid>
					<Grid container marginTop={'20px'} paddingX={'20px'}>
						<Grid container justifyContent={'space-between'}>
							<Grid
								container
								width={'40%'}
								flexDirection={'row'}
								bgcolor={'#F4F5F7'}
								padding={'9px'}
								borderRadius={'5px'}>
								<Typography
									bgcolor={'#28696D'}
									textAlign={'center'}
									color={'#FFFFFF'}
									paddingX={'5px'}
									borderRadius={'5px'}>
									{itemData.day}
								</Typography>
								<Typography
									marginLeft={'15px'}
									textAlign={'center'}
									width={'60%'}
									fontWeight={'600'}>
									{itemData.mealTime}
								</Typography>
							</Grid>
							<Button
								startIcon={<PlusIcon />}
								onClick={onAddItem}
								sx={{
									border: '2px solid #28696D',
									paddingLeft: '15px',
									paddingRight: '15px',
									color: '#28696D',
									textTransform: 'none',
								}}>
								Add New Item
							</Button>
						</Grid>
					</Grid>
					<Grid paddingX={'20px'}>
						{Object.values(values).length > 0 &&
							values.map((value, index) => {
								return (
									<ItemCard
										key={index}
										itemNo={index}
										values={value}
										onChange={onChange}
										errors={errors[index]}
										foodData={foodData}
										onClickOpenReasonModal={() =>
											onOpenReasonPopup(
												value.item,
												index,
												value.newItem,
											)
										}
									/>
								);
							})}
					</Grid>
					<Grid
						container
						justifyContent={'flex-end'}
						paddingTop={'10px'}
						paddingX={'20px'}>
						<IconButton text={'Save'} onClick={onSaveItems} />
					</Grid>
				</DialogContent>
			</Dialog>
		</>
	);
}

export default ItemPopup;
