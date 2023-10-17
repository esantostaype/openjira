import type { NextPage } from 'next';
import { Card, CardHeader, CardContent, Grid } from '@mui/material';
import { Layout } from '../layouts';
import { EntryList, NewEntry } from '../components';

const HomePage: NextPage = () => {
	return (
		<Layout title="Home - OpenJira">
			<Grid container spacing={ 4 }>
				<Grid item xs={ 12 } sm={ 4 }>
					<Card variant="outlined">
						<CardHeader title="Pending" />
						<NewEntry />
						<CardContent>
							<EntryList status='pending' />
						</CardContent>
					</Card>
				</Grid>
				<Grid item xs={ 12 } sm={ 4 }>
					<Card variant="outlined">
						<CardHeader title="In-Progress"/>
						<CardContent>
							<EntryList status='in-progress' />
						</CardContent>
					</Card>
				</Grid>
				<Grid item xs={ 12 } sm={ 4 }>
					<Card variant="outlined">
						<CardHeader title="Finished"/>
						<CardContent>
							<EntryList status='finished' />
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</Layout>
	)
}

export default HomePage