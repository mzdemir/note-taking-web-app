import "./App.css"
import {RouterProvider} from "react-router"
import {NoteContextProvider} from "./context/NoteContext"
import {desktopRouter, mobileRouter} from "./router"
import useMediaQuery from "./hooks/useMediaQuery"

export default function App() {
	const isDesktop = useMediaQuery()

	return (
		<NoteContextProvider>
			<RouterProvider router={isDesktop ? desktopRouter : mobileRouter} />
		</NoteContextProvider>
	)
}
