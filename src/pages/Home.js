import React, { useEffect, useState } from 'react';
import { Grid, Typography } from '@mui/material';
import AddUserDiet from './AddUserDiet';
import CreateDietPlan from './CreateDietPlan';
import { StepCompleteIcon } from '../assets/icons/Icons';
import { validateUserDietInfo } from '../utils/Validations';
import FormHandler from '../utils/FromHandler';
import { useDispatch } from 'react-redux';
import { addUserInformation, fetchGeneralData } from '../redux/diet';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { convertToFloat } from '../utils/Helpers';

const STEPS = [
	{
		text: 'Input Details',
		activate: true,
		complete: false,
	},
	{
		text: 'Generate Plan',
		activate: false,
		complete: false,
	},
];

const Circle = props => {
	const paddedNumber = props.number.toString().padStart(2, '0');
	return (
		<Grid
			style={{
				borderRadius: '50%',
				width: '60px',
				height: '60px',
				backgroundColor: 'white',
				border: props.active
					? '2px solid #28696D'
					: '0.25px solid #8F8F8F',
				textAlign: 'center',
				boxShadow: '0px 4px 8px #0000001F',
				paddingTop: '17px',
			}}>
			<Typography
				style={{
					fontSize: '16px',
					color: props.active ? '#28696D' : '#707070',
				}}>
				{paddedNumber}
			</Typography>
		</Grid>
	);
};

function Home() {
	const dispatch = useDispatch();
	const [step, setStep] = useState(0);
	const [steps, setSteps] = useState(STEPS);

	const { values, errors, handleChange, handleSubmit } = FormHandler(
		moveToNextStage,
		validateUserDietInfo,
	);
	useEffect(() => {
		dispatch(fetchGeneralData());
	}, []);

	function updateSteps(newStep) {
		const updatedSteps = steps.map((s, index) => ({
			...s,
			activate: index === newStep,
			complete: index < newStep,
		}));
		setSteps(updatedSteps);
	}

	function increaseStep() {
		if (step < steps.length - 1) {
			const newStep = step + 1;
			setStep(newStep);
			updateSteps(newStep);
		}
	}

	function decreaseStep() {
		if (step > 0) {
			const newStep = step - 1;
			setStep(newStep);
			updateSteps(newStep);
		} else {
			window.location.href = '/';
		}
	}

	function addUserInfos() {
		const userInfo = {
			user_gender: values.gender,
			user_age: values.age,
			bmi: convertToFloat(values.bmi),
			glucose: convertToFloat(values.glucose),
			user_height: convertToFloat(values.height),
			user_weight: convertToFloat(values.weight),
			tc: convertToFloat(values.totalCholesterol),
			tg: convertToFloat(values.triglycerides),
			hdl: convertToFloat(values.highDensityLipoprotein),
			ldl: convertToFloat(values.lowDensityLipoprotein),
			tc_hdl: convertToFloat(values.tcHDLRatio),
			hba1c: convertToFloat(values.diastolicBloodPressure),
			disease: values.healthCondition,
		};

		const summaryData = {
			gender: values.gender,
			age: values.age,
			bmi: values.bmi,
			dietGoal: values.dietGoal,
			foodPreference: values.foodPreference,
			daily_need_calori: '',
			cuisine: values.cuisine,
			dieses: '',
			allergicFood: values.allergicFood,
		};

		dispatch(addUserInformation(userInfo, summaryData, errorCallback));
	}

	function moveToNextStage() {
		addUserInfos(); // TODO: enable this after api integration
		increaseStep();
	}

	function errorCallback(message) {
		toast.error(message);
	}

	function _renderStepComponent(params) {
		if (step === 0) {
			return (
				<AddUserDiet
					values={values}
					errors={errors}
					handleChange={handleChange}
					handleSubmit={handleSubmit} // TODO: change this to handleSubmit
				/>
			);
		} else {
			return <CreateDietPlan backToPreviousStep={decreaseStep} />;
		}
	}
	return (
		<Grid container>
			<Grid
				container
				marginTop="50px"
				paddingBottom={'20px'}
				alignItems="center"
				justifyContent={'center'}>
				{steps.map((step, index) => (
					<React.Fragment key={index}>
						<Grid item xs={2} md={1}>
							<Grid
								container
								direction="column"
								alignItems="center">
								<Grid item>
									{step.complete ? (
										<Grid>
											<StepCompleteIcon />
										</Grid>
									) : (
										<Circle
											number={index + 1}
											active={step.activate}
										/>
									)}
								</Grid>
								<Grid item>
									<Typography
										style={{
											fontSize: '12px',
											paddingTop: step.complete
												? '0px'
												: '5px',
											fontFamily: 'Poppins, sans-serif',
											color: step.activate
												? '#28696D'
												: '#707070',
										}}>
										{step.text}
									</Typography>
								</Grid>
							</Grid>
						</Grid>
						{index !== steps.length - 1 && (
							<Grid item xs={2} md={1}>
								<hr
									style={{
										marginBottom: '32px',
										opacity: steps[index + 1].activate
											? '1'
											: '0.12',
									}}
									color={
										steps[index + 1].activate
											? '#28696D'
											: 'rgba(112, 112, 112, .12)'
									}
								/>
							</Grid>
						)}
					</React.Fragment>
				))}
			</Grid>
			<Grid container alignItems={'center'} justifyContent={'center'}>
				{_renderStepComponent()}
			</Grid>
		</Grid>
	);
}

export default Home;
