import "./App.css"
import {RouterProvider} from "react-router"
import {desktopRouter, mobileRouter} from "./router"
import useMediaQuery from "./hooks/useMediaQuery"
import {AuthProvider} from "./context/AuthContext"
import {NoteProvider} from "./context/NoteContext"
import {ColorThemeProvider} from "./context/ColorThemeContext"
import {FontThemeProvider} from "./context/FontThemeContext"

export default function App() {
	const isDesktop = useMediaQuery()

	return (
		<AuthProvider>
			<NoteProvider>
				<ColorThemeProvider>
					<FontThemeProvider>
						<RouterProvider router={isDesktop ? desktopRouter : mobileRouter} />
					</FontThemeProvider>
				</ColorThemeProvider>
			</NoteProvider>
		</AuthProvider>
	)
}
