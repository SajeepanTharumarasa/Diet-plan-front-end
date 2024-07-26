import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';

export default function TextInput(props) {
	return (
		<Box sx={{ flexGrow: 1 }}>
			<StyledInputBase
				width={props.width}
				error={props.error}
				value={props.value}
				placeholder={props.placeholder}
				disabled={props.disabled}
				onKeyDown={evt =>
					props.types === 'phone' &&
					evt.key === 'e' &&
					evt.preventDefault()
				}
				type={props.type}
				onChange={e => props.onChange(e.target.value, props.types, e)}
				sx={{
					'& input::placeholder': {
						fontSize: '14px',
					},
				}}
			/>
		</Box>
	);
}

const StyledInputBase = styled(InputBase)(({ theme, error, width }) => ({
	color: '#777E90',
	fontSize: 16,
	border: error ? '1px solid red' : '1px solid #D9D9D9',
	width: width,
	borderRadius: '5px',
	backgroundColor: '#FFFFFF',
	'& .MuiInputBase-input': {
		padding: theme.spacing(1, 1, 1, 0),
		paddingLeft: `calc(1em + ${theme.spacing(0)})`,
		paddingRight: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create('width'),
		width: '100%',
	},
}));
