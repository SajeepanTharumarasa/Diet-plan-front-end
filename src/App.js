import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import { ToastAlert } from './components/ToastAlert';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from './assets/theme/Theme';
import { Provider } from 'react-redux';
import store from './redux/store';

function App() {
	return (
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<>
					<BrowserRouter>
						<Routes>
							<Route path="/" element={<Home />} />
						</Routes>
					</BrowserRouter>
					<ToastAlert />
				</>
			</ThemeProvider>
		</Provider>
	);
}

export default App;
