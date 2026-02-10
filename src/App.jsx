import "./App.css"
import supabase from "./supabase-client.js"

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
	const isDesktop = useMediaQuery()
	const [notes, setNotes] = useState(null)

	async function fetchNotes() {
		const {data, error} = await supabase
			.from("notes")
			.select(
				`
    		*,
   			...note_tags(
      		...tags(
        		tags:name
      		)
    		)
    		`,
			)
			.order("lastEdited", {ascending: false})
		if (error) {
			console.error("Error fetching data:", error)
			return
		}
		setNotes(data)
	}

	useEffect(() => {
		fetchNotes()
	}, [])

	return (
		<NotesContext.Provider value={notes}>
			{isDesktop ?
				<Routes>
					<Route element={<DesktopLayout />}>
						<Route path="/" element={<AllNotes />}>
							<Route path=":id" element={<NoteDetails />} />
						</Route>
						<Route path="archived" element={<Archived />}>
							<Route path=":id" element={<NoteDetails />} />
						</Route>
						<Route path="tags/:id" element={<TagPage />}>
							<Route path=":noteId" element={<NoteDetails />} />
						</Route>

						<Route path="/search" element={<Search />}>
							<Route path=":noteId" element={<NoteDetails />} />
						</Route>

						<Route path="settings" element={<Settings />}>
							<Route path="color-theme" element={<ColorTheme />} />
							<Route path="font-theme" element={<FontTheme />} />
							<Route path="change-password" element={<ChangePassword />} />
						</Route>
					</Route>
				</Routes>
			:	<Routes>
					<Route element={<MobileLayout />}>
						<Route path="/" element={<AllNotes />} />
						<Route path="/:id" element={<NoteDetails />} />

						<Route path="/archived" element={<Archived />} />
						<Route path="/archived/:id" element={<NoteDetails />} />

						<Route path="/tags" element={<Tags />} />
						<Route path="/tags/:id" element={<TagPage />} />
						<Route path="/tags/:id/:noteId" element={<NoteDetails />} />

						<Route path="/search" element={<Search />} />
						<Route path="/search/:noteId" element={<NoteDetails />} />

						<Route path="/settings">
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
