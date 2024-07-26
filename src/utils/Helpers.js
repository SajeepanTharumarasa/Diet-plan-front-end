import { useMediaQuery, useTheme } from '@mui/material';

export function IsScreenChangedToMobile() {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

	if (isMobile) {
		return true;
	} else {
		return false;
	}
}

export function updateObjectInArray(array, valueIndex, newItem) {
	return array.map((item, index) => {
		if (index !== valueIndex) {
			return item;
		}

		return newItem;
	});
}

export function convertToFloat(number) {
	const floatValue = parseFloat(number);

	if (!isNaN(floatValue)) {
		if (Number.isInteger(floatValue)) {
			return floatValue.toFixed(1);
		} else {
			return floatValue.toString();
		}
	} else {
		return NaN;
	}
}

export function isNumber(value) {
	if (!isNaN(value) && !isNaN(parseFloat(value))) {
		return true;
	} else {
		return false;
	}
}
