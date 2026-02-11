import {createBrowserRouter} from "react-router"

import AllNotes from "./pages/AllNotes"
import NoteDetails from "./pages/NoteDetails"
import Archived from "./pages/Archived"
import Tags from "./pages/Tags"
import TagPage from "./pages/TagPage"
import Search from "./pages/Search"
import Settings from "./pages/Settings"
import ColorTheme from "./pages/ColorTheme"
import FontTheme from "./pages/FontTheme"
import ChangePassword from "./pages/ChangePassword"
import CreateNewNote from "./pages/CreateNewNote"

import DesktopLayout from "./layouts/desktop/DesktopLayout"
import MobileLayout from "./layouts/mobile/MobileLayout"

export const mobileRouter = createBrowserRouter([
	{
		element: <MobileLayout />,
		children: [
			{path: "/", element: <AllNotes />},
			{path: "/:id", element: <NoteDetails />},
			{path: "/archived", element: <Archived />},
			{path: "/archived/:id", element: <NoteDetails />},
			{path: "/tags", element: <Tags />},
			{path: "/tags/:id", element: <TagPage />},
			{path: "/tags/:id/:noteId", element: <NoteDetails />},
			{path: "/search", element: <Search />},
			{path: "/search/:noteId", element: <NoteDetails />},
			{
				path: "/settings",
				children: [
					{index: true, element: <Settings />},
					{path: "color-theme", element: <ColorTheme />},
					{path: "font-theme", element: <FontTheme />},
					{path: "change-password", element: <ChangePassword />},
				],
			},
		],
	},
])

export const desktopRouter = createBrowserRouter([
	{
		element: <DesktopLayout />,
		children: [
			{
				path: "/",
				element: <AllNotes />,
				children: [{path: ":id", element: <NoteDetails />}],
			},
			{
				path: "archived",
				element: <Archived />,
				children: [{path: ":id", element: <NoteDetails />}],
			},
			{
				path: "tags/:id",
				element: <TagPage />,
				children: [{path: ":noteId", element: <NoteDetails />}],
			},
			{
				path: "search",
				element: <Search />,
				children: [{path: ":noteId", element: <NoteDetails />}],
			},
			{
				path: "settings",
				element: <Settings />,
				children: [
					{path: "color-theme", element: <ColorTheme />},
					{path: "font-theme", element: <FontTheme />},
					{path: "change-password", element: <ChangePassword />},
				],
			},
			{
				path: "new-note",
				element: <CreateNewNote />,
			},
		],
	},
])
