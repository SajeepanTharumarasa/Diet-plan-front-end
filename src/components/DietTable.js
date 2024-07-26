import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {
	Grid,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	Skeleton,
	styled,
	Typography,
} from '@mui/material';

function ItemCard({ items, color, onClickItem, isTableEditable }) {
	return (
		<StyledItemButton
			disabled={!isTableEditable}
			color={color}
			sx={{
				padding: '0px 0px 0px 5px',
				'&.Mui-disabled': {
					opacity: 1,
				},
			}}
			onClick={() => {
				onClickItem(items);
			}}>
			<List>
				{items?.map((value, index) => {
					return (
						<ListItem
							key={index}
							sx={{
								padding: '1px',
							}}>
							<Grid
								style={{
									borderRadius: '50%',
									width: '8px',
									height: '8px',
									backgroundColor: color,
									marginRight: '5px',
									flexShrink: 0,
								}}
							/>
							<ListItemText>
								<Typography fontSize={'12px'}>
									{`${value.item} | ${value.qty}`}
								</Typography>
							</ListItemText>
						</ListItem>
					);
				})}
			</List>
		</StyledItemButton>
	);
}

export function createData(
	breakfast,
	lunch,
	dinner,
	morningSnack,
	eveningSnack,
	preWorkout,
	postWorkout,
) {
	return {
		breakfast,
		lunch,
		dinner,
		morningSnack,
		eveningSnack,
		preWorkout,
		postWorkout,
	};
}

const tableTitle = [
	'Breakfast',
	'Lunch',
	'Dinner',
	'Morning Snack',
	'Evening Snack',
	'Pre-Workout',
	'Post-Workout',
];

export function DietTable({ onClickItem, rows, isTableEditable }) {
	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 650 }} aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell></TableCell>
						{tableTitle.map((item, index) => {
							return (
								<TableCell key={index} align="center">
									{item}
								</TableCell>
							);
						})}
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row, index) =>
						Object.keys(row).length === 0 ? (
							<TableRow key={index}>
								<TableCell>Day 0{index + 1}</TableCell>
								{tableTitle.map((_, val) => {
									return (
										<TableCell key={val}>
											<Skeleton variant="text" />
										</TableCell>
									);
								})}
							</TableRow>
						) : (
							<StyledTableRow
								key={`Day 0${index + 1}`}
								sx={{
									'&:last-child td, &:last-child th': {
										border: 0,
									},
								}}>
								<TableCell component="th" scope="row">
									{`Day 0${index + 1}`}
								</TableCell>
								<TableCell align="center">
									<ItemCard
										items={row.breakfast}
										color={'#28696D'}
										onClickItem={items =>
											onClickItem(
												index,
												items,
												'breakfast',
											)
										}
										isTableEditable={isTableEditable}
									/>
								</TableCell>
								<TableCell align="center">
									<ItemCard
										items={row.lunch}
										color={'#946F5C'}
										onClickItem={items =>
											onClickItem(index, items, 'lunch')
										}
										isTableEditable={isTableEditable}
									/>
								</TableCell>
								<TableCell align="center">
									<ItemCard
										items={row.dinner}
										color={'#FF8A45'}
										onClickItem={items =>
											onClickItem(index, items, 'dinner')
										}
										isTableEditable={isTableEditable}
									/>
								</TableCell>
								<TableCell align="center">
									<ItemCard
										items={row.morningSnack}
										color={'#FFD645'}
										onClickItem={items =>
											onClickItem(
												index,
												items,
												'morningSnack',
											)
										}
										isTableEditable={isTableEditable}
									/>
								</TableCell>
								<TableCell align="center">
									<ItemCard
										items={row.eveningSnack}
										color={'#567076'}
										onClickItem={items =>
											onClickItem(
												index,
												items,
												'eveningSnack',
											)
										}
										isTableEditable={isTableEditable}
									/>
								</TableCell>
								<TableCell align="center">
									<ItemCard
										items={row.preWorkout}
										color={'#5BC599'}
										onClickItem={items =>
											onClickItem(
												index,
												items,
												'preWorkout',
											)
										}
										isTableEditable={isTableEditable}
									/>
								</TableCell>
								<TableCell align="center">
									<ItemCard
										items={row.postWorkout}
										color={'#78CAF8'}
										onClickItem={items =>
											onClickItem(
												index,
												items,
												'postWorkout',
											)
										}
										isTableEditable={isTableEditable}
									/>
								</TableCell>
							</StyledTableRow>
						),
					)}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

const StyledTableRow = styled(TableRow)(({ theme }) => ({
	'&:nth-of-type(odd)': {
		backgroundColor: theme.palette.action.hover,
	},
	// hide last border
	'&:last-child td, &:last-child th': {
		border: 0,
	},
}));

const StyledItemButton = styled(ListItemButton)(props => ({
	'&:nth-of-type(odd)': {
		background: `linear-gradient(0deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), ${props.color}`,
		borderLeft: `5px solid ${props.color}`,
		borderRadius: '2px',
	},
	// hide last border
	'&:last-child td, &:last-child th': {
		border: 0,
	},
	'&:nth-of-type(even)': {
		borderLeft: `5px solid ${props.color}`,
		borderRadius: '2px',
	},
}));
