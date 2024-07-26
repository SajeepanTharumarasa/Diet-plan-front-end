import React from 'react';
import { Checkbox, FormControlLabel, Grid, Typography } from '@mui/material';
import { IsScreenChangedToMobile } from '../utils/Helpers';
import IconButton from '../components/IconButton';
import CustomInputField from '../components/CustomInputField';
import { useSelector } from 'react-redux';
import { selectFoodCousins, selectHealthConditions } from '../redux/diet';

function AddUserDiet({ values, errors, handleChange, handleSubmit }) {
	const isMobileScreen = IsScreenChangedToMobile();
	const foodCousins = useSelector(selectFoodCousins);
	const healthConditions = useSelector(selectHealthConditions);

	function onDeleteMultiple(value) {
		const clone = values.healthCondition.filter(item => item !== value);
		handleChange('healthCondition', clone);
	}

	function onDeleteFoodMultiple(value) {
		const clone = values.cuisine.filter(item => item !== value);
		handleChange('cuisine', clone);
	}

	function onHandleCheckBox(value) {
		if (!values.foodPreference) {
			handleChange('foodPreference', [value]);
		} else {
			let clone;

			if (values.foodPreference?.includes(value)) {
				clone = values.foodPreference?.filter(item => item !== value);
			} else {
				clone = [...values.foodPreference, value];
			}

			handleChange('foodPreference', clone);
		}
	}

	function checkFoodPref(value) {
		return values.foodPreference?.includes(value) ? true : false;
	}

	return (
		<Grid
			width={isMobileScreen ? '90%' : '50%'}
			bgcolor={'#FFFFFF'}
			padding={'10px'}
			marginBottom={'10px'}>
			<Grid container>
				<Typography
					fontSize={'18px'}
					color={'#28696D'}
					fontWeight={'700'}>
					General Information
				</Typography>
				<Grid container columnSpacing={2} flexDirection={'row'}>
					<Grid item xs={12} sm={6}>
						<CustomInputField
							type={'dropdown'}
							name={'Gender'}
							placeholder={'Select Gender'}
							dropDownData={['Male', 'Female', 'Other']}
							value={values.gender || ''}
							onChange={e =>
								handleChange('gender', e.target.value)
							}
							error={errors.gender}
							errorText={errors.gender}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<CustomInputField
							type={'text'}
							name={'Age'}
							value={values.age || ''}
							placeholder={'Enter age here'}
							onChange={value => handleChange('age', value)}
							error={errors.age}
							errorText={errors.age}
						/>
					</Grid>
				</Grid>
				<Grid container columnSpacing={2} flexDirection={'row'}>
					<Grid item xs={12} sm={6}>
						<CustomInputField
							type={'text'}
							name={'Weight'}
							placeholder={'Enter weight here'}
							value={values.weight || ''}
							onChange={value => handleChange('weight', value)}
							error={errors.weight}
							errorText={errors.weight}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<CustomInputField
							type={'text'}
							name={'Height'}
							value={values.height || ''}
							placeholder={'Enter height here'}
							onChange={value => handleChange('height', value)}
							error={errors.height}
							errorText={errors.height}
						/>
					</Grid>
				</Grid>
				<Grid container columnSpacing={2} flexDirection={'row'}>
					<Grid item xs={12} sm={6}>
						<CustomInputField
							type={'dropdown'}
							name={'Diet Goal'}
							placeholder={'Select Diet Goal'}
							dropDownData={[
								'Maintain',
								'Weight Gain',
								'Weight Loss',
							]}
							value={values.dietGoal || ''}
							onChange={e =>
								handleChange('dietGoal', e.target.value)
							}
							error={errors.dietGoal}
							errorText={errors.dietGoal}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<Grid
							item
							flexDirection={'row'}
							paddingY={'20px'}
							paddingRight={'10px'}>
							<Typography
								paddingBottom={'10px'}
								color={'#7C7C7C'}>
								Food Preference
							</Typography>
							<Grid>
								<FormControlLabel
									control={
										<Checkbox
											onChange={() =>
												onHandleCheckBox('Vegetarian')
											}
											checked={checkFoodPref(
												'Vegetarian',
											)}
											value={
												checkFoodPref('Vegetarian')
													? 'Vegetarian'
													: ''
											}
										/>
									}
									style={{ color: '#777E90' }}
									label="Vegetarian"
								/>
								<FormControlLabel
									control={
										<Checkbox
											onChange={() =>
												onHandleCheckBox(
													'Non-Vegetarian',
												)
											}
											checked={checkFoodPref(
												'Non-Vegetarian',
											)}
											value={
												checkFoodPref('Non-Vegetarian')
													? 'Non-Vegetarian'
													: ''
											}
										/>
									}
									style={{ color: '#777E90' }}
									label="Non-Vegetarian"
								/>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
				<Grid container columnSpacing={2} flexDirection={'row'}>
					<Grid item xs={12} sm={6}>
						<CustomInputField
							type={'dropdown'}
							name={'Food Cuisine'}
							placeholder={'Select Cuisine'}
							dropDownData={foodCousins}
							value={values.cuisine || []}
							onChange={e =>
								handleChange('cuisine', e.target.value)
							}
							error={errors.cuisine}
							errorText={errors.cuisine}
							isDropdownMultiple={true}
							onDeleteMultiple={onDeleteFoodMultiple}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<CustomInputField
							type={'dropdown'}
							name={'Health Condition'}
							placeholder={'Enter you health condition here'}
							dropDownData={healthConditions}
							value={values.healthCondition || []}
							onChange={e =>
								handleChange('healthCondition', e.target.value)
							}
							error={errors.healthCondition}
							errorText={errors.healthCondition}
							isDropdownMultiple={true}
							onDeleteMultiple={onDeleteMultiple}
						/>
					</Grid>
				</Grid>
				<Grid container columnSpacing={2} flexDirection={'row'}>
					<Grid item xs={12} sm={12}>
						<CustomInputField
							type={'text'}
							name={'Allergic Food'}
							placeholder={'Enter your allergic food here'}
							value={values.allergicFood || ''}
							onChange={value =>
								handleChange('allergicFood', value)
							}
							error={errors.allergicFood}
							errorText={errors.allergicFood}
						/>
					</Grid>
				</Grid>
			</Grid>
			<Grid container marginTop={'20px'}>
				<Typography
					fontSize={'18px'}
					color={'#28696D'}
					fontWeight={'700'}>
					Medical Information
				</Typography>
				<Grid container columnSpacing={2} flexDirection={'row'}>
					<Grid item xs={12} sm={6}>
						<CustomInputField
							type={'text'}
							name={'BMI'}
							placeholder={'Enter BMI here'}
							value={values.bmi || ''}
							onChange={value => handleChange('bmi', value)}
							error={errors.bmi}
							errorText={errors.bmi}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<CustomInputField
							type={'text'}
							name={'Body Fat'}
							value={values.bodyFat || ''}
							placeholder={'Enter body fat here'}
							onChange={value => handleChange('bodyFat', value)}
							error={errors.bodyFat}
							errorText={errors.bodyFat}
						/>
					</Grid>
				</Grid>
				<Grid container columnSpacing={2} flexDirection={'row'}>
					<Grid item xs={12} sm={6}>
						<CustomInputField
							type={'text'}
							name={'Glucose'}
							placeholder={'Enter glucose here'}
							value={values.glucose || ''}
							onChange={value => handleChange('glucose', value)}
							error={errors.glucose}
							errorText={errors.glucose}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<CustomInputField
							type={'text'}
							name={'Total Cholesterol[Tc]'}
							value={values.totalCholesterol || ''}
							placeholder={'Enter total cholesterol here'}
							onChange={value =>
								handleChange('totalCholesterol', value)
							}
							error={errors.totalCholesterol}
							errorText={errors.totalCholesterol}
						/>
					</Grid>
				</Grid>
				<Grid container columnSpacing={2} flexDirection={'row'}>
					<Grid item xs={12} sm={6}>
						<CustomInputField
							type={'text'}
							name={'Systolic Blood Pressure'}
							placeholder={'Enter systolic blood pressure here'}
							value={values.systolicBloodPressure || ''}
							onChange={value =>
								handleChange('systolicBloodPressure', value)
							}
							error={errors.systolicBloodPressure}
							errorText={errors.systolicBloodPressure}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<CustomInputField
							type={'text'}
							name={'Diastolic Blood Pressure'}
							value={values.diastolicBloodPressure || ''}
							placeholder={'Enter diastolic blood pressure here'}
							onChange={value =>
								handleChange('diastolicBloodPressure', value)
							}
							error={errors.diastolicBloodPressure}
							errorText={errors.diastolicBloodPressure}
						/>
					</Grid>
				</Grid>
				<Grid container columnSpacing={2} flexDirection={'row'}>
					<Grid item xs={12} sm={6}>
						<CustomInputField
							type={'text'}
							name={'High-Density Lipoprotein[HDL]'}
							placeholder={'Enter high-density lipoprotein here'}
							value={values.highDensityLipoprotein || ''}
							onChange={value =>
								handleChange('highDensityLipoprotein', value)
							}
							error={errors.highDensityLipoprotein}
							errorText={errors.highDensityLipoprotein}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<CustomInputField
							type={'text'}
							name={'Low-Density Lipoprotein[LDL]'}
							placeholder={'Enter low-density lipoprotein here'}
							value={values.lowDensityLipoprotein || ''}
							onChange={value =>
								handleChange('lowDensityLipoprotein', value)
							}
							error={errors.lowDensityLipoprotein}
							errorText={errors.lowDensityLipoprotein}
						/>
					</Grid>
				</Grid>
				<Grid container columnSpacing={2} flexDirection={'row'}>
					<Grid item xs={12} sm={6}>
						<CustomInputField
							type={'text'}
							name={'Tc/HDL Ratio'}
							placeholder={'Enter Tc/HDL Ratio here'}
							value={values.tcHDLRatio || ''}
							onChange={value =>
								handleChange('tcHDLRatio', value)
							}
							error={errors.tcHDLRatio}
							errorText={errors.tcHDLRatio}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<CustomInputField
							type={'text'}
							name={'Triglycerides'}
							value={values.triglycerides || ''}
							placeholder={'Enter triglycerides here'}
							onChange={value =>
								handleChange('triglycerides', value)
							}
							error={errors.triglycerides}
							errorText={errors.triglycerides}
						/>
					</Grid>
				</Grid>
				<Grid
					container
					justifyContent={'flex-end'}
					paddingRight={'12px'}>
					<IconButton text={'Next'} onClick={handleSubmit} />
				</Grid>
			</Grid>
		</Grid>
	);
}

export default AddUserDiet;
