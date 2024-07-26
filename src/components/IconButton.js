import React from 'react';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';

export default function IconButton({ text, onClick, Icon, disabled }) {
	return (
		<CustomButton
			variant="contained"
			startIcon={Icon ? <Icon /> : undefined}
			onClick={onClick}
			disabled={disabled}>
			{text}
		</CustomButton>
	);
}

const CustomButton = styled(Button)(({ theme }) => ({
	textTransform: 'none',
	borderRadius: '5px',
	boxShadow: 'none',
	backgroundColor: '#28696D',
	justifyContent: 'center',
	alignItems: 'center',
	paddingLeft: '15px',
	paddingRight: '15px',
	'&:hover': {
		backgroundColor: '#28696D',
		color: '#FFFFFF',
	},
	'&.Mui-disabled': {
		background: '#B4B2B2',
		color: '#FFFFFF',
	},
}));
