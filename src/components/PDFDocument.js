import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

export const PlanDocument = ({ documentData }) => (
	<Document>
		<Page size="A4" style={styles.page}>
			<View style={styles.section}>
				<Text style={styles.heading}>Generate Diet Plan</Text>
			</View>
			<View style={styles.section}>
				<Text style={styles.text}>{documentData.details}</Text>
			</View>
			{Object.keys(documentData.plan).map((key, index) => {
				return (
					<View key={index} style={styles.section}>
						<Text style={styles.text}>{key}:</Text>
						<>
							{documentData.plan[key].map((text, val) => {
								return (
									<View
										key={val}
										style={
											index !== 0
												? styles.subView
												: styles.firstSubView
										}>
										{index !== 0 ? (
											<Text style={styles.bulletText}>
												•
											</Text>
										) : (
											<></>
										)}
										<Text style={styles.subText}>
											{text}
										</Text>
									</View>
								);
							})}
						</>
					</View>
				);
			})}
		</Page>
	</Document>
);

const styles = StyleSheet.create({
	page: {
		backgroundColor: '#FFFFFF',
		padding: '10px',
	},
	section: {
		marginHorizontal: 10,
		marginVertical: 5,
	},
	heading: {
		fontSize: 16,
		fontWeight: '700',
		color: '#000000',
	},
	text: {
		fontSize: 12,
		color: '#444444',
	},
	subText: {
		fontSize: 12,
		color: '#444444',
		paddingTop: '5px',
	},
	bulletText: {
		marginHorizontal: 8,
		fontSize: 12,
		color: '#000000',
		paddingTop: '5px',
	},
	subView: {
		flexDirection: 'row',
		paddingRight: '5px',
	},
	firstSubView: {
		flexDirection: 'row',
		paddingTop: '5px',
	},
});
