import AllNotes from "../pages/AllNotes"
import NoteDetails from "../pages/NoteDetails"
import Archived from "../pages/Archived"
import Tags from "../pages/Tags"
import Search from "../pages/Search"
import Settings from "../pages/Settings"
import ColorTheme from "../pages/ColorTheme"
import FontTheme from "../pages/FontTheme"
import ChangePassword from "../pages/ChangePassword"

import MobileLayout from "./MobileLayout"

import {Routes, Route} from "react-router"

export default function MobileApp() {
	return (
		<Routes>
			<Route element={<MobileLayout />}>
				<Route path="/" element={<AllNotes />} />
				<Route path="/:id" element={<NoteDetails />} />
				<Route path="/archived" element={<Archived />} />
				<Route path="/tags" element={<Tags />} />
				<Route path="/search" element={<Search />} />
				<Route path="/settings" element={<Settings />} />
				<Route path="/settings/color-theme" element={<ColorTheme />} />
				<Route path="/settings/font-theme" element={<FontTheme />} />
				<Route path="/settings/change-password" element={<ChangePassword />} />
			</Route>
		</Routes>
	)
}
