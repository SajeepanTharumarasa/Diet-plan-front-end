import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
	typography: {
		fontFamily: ['Poppins'].join(','),
	},
	palette: {
		background: {
			default: '#f1f9f8',
		},
	},
});

export const errorTextStyle = {
	fontSize: '10px',
	color: 'red',
	paddingBottom: '5px',
	paddingLeft: '10px',
	marginTop: '2px',
};
