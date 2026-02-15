import "./App.css"
import {RouterProvider} from "react-router"
import {desktopRouter, mobileRouter} from "./router"
import useMediaQuery from "./hooks/useMediaQuery"

export default function App() {
	const isDesktop = useMediaQuery()

	return <RouterProvider router={isDesktop ? desktopRouter : mobileRouter} />
}
