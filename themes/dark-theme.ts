import { createTheme } from '@mui/material'

export const darkTheme = createTheme({
	palette: {
		mode: 'dark',
		background: {
			default: 'rgb(16, 20, 24)',
		}
	},

	components: {
		MuiAppBar: {
			defaultProps: {
				elevation: 0
			},
			styleOverrides: {
				root: {
					backgroundColor: 'rgba(16, 20, 24, 0.8)',					
					backdropFilter: 'blur(8px)',
					borderStyle: 'solid',
					borderColor: 'rgba(194, 224, 255, 0.08)',
					borderWidth: '0px 0px thin'
				}
			}
		},
		MuiDrawer: {
			styleOverrides: {
				root: {
					backgroundColor: 'rgba(16, 20, 24, 0.8)'
				}
			}
		},
		MuiCard: {
			styleOverrides: {
				root: {
					backgroundColor: 'rgba(0, 0, 0, 0.2)'
				}
			}
		},
		MuiCardHeader: {
			styleOverrides: {
				root: {
					borderStyle: 'solid',
					borderColor: 'rgba(194, 224, 255, 0.08)',
					borderWidth: '0px 0px thin',
					fontSize: '1rem'
				},
				
			}
		}
	}
});