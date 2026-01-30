import "./App.css"

import DesktopLayout from "./layouts/desktop/DesktopLayout"
import MobileLayout from "./layouts/mobile/MobileLayout"

import NoteDetails from "./pages/NoteDetails"
import AllNotes from "./pages/AllNotes"
import Archived from "./pages/Archived"
import Tags from "./pages/Tags"
import TagPage from "./pages/TagPage"
import Search from "./pages/Search"
import Settings from "./pages/Settings"
import ColorTheme from "./pages/ColorTheme"
import FontTheme from "./pages/FontTheme"
import ChangePassword from "./pages/ChangePassword"

import useMediaQuery from "./hooks/useMediaQuery"
import {Routes, Route} from "react-router"
import {useState, useEffect, createContext} from "react"

const NotesContext = createContext()

export default function App() {
	const isDesktop = useMediaQuery("(min-width: 1024px)")
	const [notes, setNotes] = useState(null)

	useEffect(() => {
		fetch("/api/notes")
			.then((res) => res.json())
			.then((data) => setNotes(data.notes))
	}, [])

	return (
		<NotesContext.Provider value={notes}>
			{isDesktop ?
				<Routes>
					<Route element={<DesktopLayout />}>
						<Route path="/" element={<AllNotes />}>
							<Route path=":id" element={<NoteDetails />} />
						</Route>
						{/* <Route path="archived" element={<Archived />} /> */}
						{/* <Route path="tags" element={<Tags />} /> */}
						{/* <Route path="tags:/id" element={""} /> */}
						{/* <Route path="search" element={<Search />} /> */}

						{/* <Route path="settings"> */}
						{/* <Route index element={<Settings />} /> */}
						{/* <Route path="color-theme" element={<ColorTheme />} /> */}
						{/* <Route path="font-theme" element={<FontTheme />} /> */}
						{/* <Route path="change-password" element={<ChangePassword />} /> */}
						{/* </Route> */}
					</Route>
				</Routes>
			:	<Routes>
					<Route element={<MobileLayout />}>
						<Route path="/" element={<AllNotes />} />
						<Route path="/:id" element={<NoteDetails />} />
						<Route path="archived" element={<Archived />} />
						<Route path="tags" element={<Tags />} />
						<Route path="tags/:id" element={<TagPage />} />
						<Route path="search" element={<Search />} />

						<Route path="settings">
							<Route index element={<Settings />} />
							<Route path="color-theme" element={<ColorTheme />} />
							<Route path="font-theme" element={<FontTheme />} />
							<Route path="change-password" element={<ChangePassword />} />
						</Route>
					</Route>
				</Routes>
			}
		</NotesContext.Provider>
	)
}

export {NotesContext}
