import "./App.css"
import {RouterProvider} from "react-router"
import {NoteContextProvider} from "./context/NoteContext"
import {desktopRouter, mobileRouter} from "./router"
import useMediaQuery from "./hooks/useMediaQuery"
import {AuthContextProvider} from "./context/AuthContext.jsx"

import supabase from "./supabase-client"
import {useEffect} from "react"

export default function App() {
	const isDesktop = useMediaQuery()

	useEffect(() => {
		async function insert() {}
		insert()
	}, [])

	return (
		<AuthContextProvider>
			<NoteContextProvider>
				<RouterProvider router={isDesktop ? desktopRouter : mobileRouter} />
			</NoteContextProvider>
		</AuthContextProvider>
	)
}
