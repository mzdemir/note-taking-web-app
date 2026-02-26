import "./App.css"
import {RouterProvider} from "react-router"
import {desktopRouter, mobileRouter} from "./router"
import useMediaQuery from "./hooks/useMediaQuery"
import {AuthProvider} from "./context/AuthContext"
import {ColorThemeProvider} from "./context/ColorThemeContext"
import {FontThemeProvider} from "./context/FontThemeContext"
import {ToastProvider} from "./context/ToastContext"

export default function App() {
	const isDesktop = useMediaQuery()

	return (
		<ColorThemeProvider>
			<FontThemeProvider>
				<ToastProvider>
					<AuthProvider>
						<RouterProvider router={isDesktop ? desktopRouter : mobileRouter} />
					</AuthProvider>
				</ToastProvider>
			</FontThemeProvider>
		</ColorThemeProvider>
	)
}
