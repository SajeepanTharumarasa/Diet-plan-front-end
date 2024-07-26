import React from 'react';
import { Autocomplete, Grid, TextField, Typography } from '@mui/material';
import DropDown from './DropDown';
import TextInput from './TextInput';
import { errorTextStyle } from '../assets/theme/Theme';

function CustomInputField({
	type,
	name,
	onChange,
	errorText,
	value,
	placeholder,
	dropDownData,
	onDeleteMultiple,
	onHandleBlur,
	disabled = false,
	error = false,
	isDropdownMultiple = false,
}) {
	function _renderInputType() {
		if (type === 'text') {
			return (
				<TextInput
					width={'100%'}
					error={error}
					value={value}
					placeholder={placeholder}
					onChange={onChange}
					disabled={disabled}
				/>
			);
		} else if (type === 'dropdown') {
			return (
				<DropDown
					width={'100%'}
					error={error}
					value={value}
					data={dropDownData}
					placeholder={placeholder}
					onChange={onChange}
					multiple={isDropdownMultiple}
					onDeleteMultiple={onDeleteMultiple}
				/>
			);
		} else if (type === 'searchDropdown') {
			return (
				<Autocomplete
					freeSolo
					autoSelect
					disablePortal
					onBlur={onHandleBlur}
					size="small"
					sx={{ width: '100%', backgroundColor: '#FFFFFF' }}
					value={value}
					options={dropDownData}
					onChange={onChange}
					isOptionEqualToValue={(option, value) =>
						option.value === value.value
					}
					renderInput={params => (
						<TextField placeholder={placeholder} {...params} />
					)}
					renderOption={(props, option, { index }) => (
						<li {...props} key={`${option}-${index}`}>
							{option}
						</li>
					)}
				/>
			);
		}
	}

	return (
		<Grid
			item
			flexDirection={'row'}
			paddingY={'20px'}
			paddingRight={'10px'}>
			<Typography paddingBottom={'10px'} color={'#7C7C7C'}>
				{name}
			</Typography>
			{_renderInputType()}
			{errorText && (
				<Typography style={errorTextStyle}>{errorText}</Typography>
			)}
		</Grid>
	);
}

export default CustomInputField;
