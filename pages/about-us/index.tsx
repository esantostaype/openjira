import type { NextPage } from 'next';
import { Grid, Typography } from '@mui/material';
import { Layout } from '../../layouts';

const aboutPage: NextPage = () => {
	return (
		<Layout title="Home - OpenJira">
			<Grid container spacing={ 4 }>
				<Grid item xs={ 12 }>
					<Typography variant='h1'>About Us</Typography>
				</Grid>
			</Grid>
		</Layout>
	)
}

export default aboutPage