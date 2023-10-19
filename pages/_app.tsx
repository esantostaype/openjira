import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { SnackbarProvider } from 'notistack';
import { ConfirmProvider } from "material-ui-confirm";
import { UIProvider } from '../context/ui'
import { EntriesProvider } from '../context/entries'
import { darkTheme } from '../themes'

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ConfirmProvider>
			<SnackbarProvider maxSnack={ 3 }>
				<EntriesProvider>
					<UIProvider>
						<ThemeProvider theme={ darkTheme }>
							<CssBaseline />
							<Component {...pageProps} />
						</ThemeProvider>
					</UIProvider>
				</EntriesProvider>
			</SnackbarProvider>
		</ConfirmProvider>
	)
}

export default MyApp