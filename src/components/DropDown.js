import {
	Box,
	Chip,
	FormControl,
	MenuItem,
	Select,
	styled,
} from '@mui/material';
import React from 'react';

function DropDown(props) {
	return (
		<StyledFormControl width={props.width} error={props.error}>
			<Select
				value={props.value}
				onChange={props.onChange}
				inputProps={{ 'aria-label': 'Without label' }}
				displayEmpty
				renderValue={selected => {
					if (selected === '' || selected.length === 0) {
						return props.placeholder;
					}

					if (props.multiple) {
						return (
							<Box
								sx={{
									display: 'flex',
									flexWrap: 'wrap',
									gap: 0.5,
								}}>
								{selected.map(value => (
									<Chip
										key={value}
										label={value}
										style={{
											backgroundColor: '#28696D',
											color: '#FFFFFF',
											borderRadius: '5px',
										}}
										onDelete={() =>
											props.onDeleteMultiple(value)
										}
										onMouseDown={event => {
											event.stopPropagation();
										}}
									/>
								))}
							</Box>
						);
					} else {
						return selected;
					}
				}}
				defaultValue={''}
				sx={{
					fontSize: '14px',
				}}
				variant="standard"
				disableUnderline
				multiple={props.multiple}>
				{props.data?.map((item, index) => {
					return (
						<MenuItem key={index} value={item}>
							{item}
						</MenuItem>
					);
				})}
			</Select>
		</StyledFormControl>
	);
}

const StyledFormControl = styled(FormControl)(({ theme, error, width }) => ({
	color: '#777E90',
	fontSize: 16,
	border: error ? '1px solid red' : '1px solid #D9D9D9',
	width: width,
	borderRadius: '5px',
	backgroundColor: '#FFFFFF',
	'& .MuiInputBase-input': {
		padding: theme.spacing(1.2, 1, 1.2, 0),
		paddingLeft: `calc(1em + ${theme.spacing(0)})`,
		paddingRight: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create('width'),
		width: '100%',
	},
}));

export default DropDown;
