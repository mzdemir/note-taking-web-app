import "./App.css"
import {RouterProvider} from "react-router"
import {desktopRouter, mobileRouter} from "./router"
import useMediaQuery from "./hooks/useMediaQuery"
import {NoteProvider} from "./context/NoteContext"

export default function App() {
	const isDesktop = useMediaQuery()

	return (
		<NoteProvider>
			<RouterProvider router={isDesktop ? desktopRouter : mobileRouter} />
		</NoteProvider>
	)
}
