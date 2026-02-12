import {createBrowserRouter} from "react-router"

import AllNotes from "./routes/AllNotes"
import NoteDetails from "./routes/NoteDetails"
import Archived from "./routes/Archived"
import Tags from "./routes/Tags"
import TagPage from "./routes/TagPage"
import Search from "./routes/Search"
import Settings from "./routes/Settings"
import ColorTheme from "./routes/ColorTheme"
import FontTheme from "./routes/FontTheme"
import ChangePassword from "./routes/ChangePassword"
import CreateNewNote from "./routes/CreateNewNote"
import Login from "./components/auth/Login"

import RootRedirect from "./routes/RootDirect"
import ProtectedRoute from "./components/auth/ProtectedRoute"

import DesktopLayout from "./layouts/desktop/DesktopLayout"
import MobileLayout from "./layouts/mobile/MobileLayout"

export const mobileRouter = createBrowserRouter([
	{path: "/", element: <RootRedirect />},
	{path: "/login", element: <Login />},
	{
		element: (
			<ProtectedRoute>
				<MobileLayout />
			</ProtectedRoute>
		),
		children: [
			{path: "/notes", element: <AllNotes />},
			{path: "notes/:id", element: <NoteDetails />},
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
			{path: "new-note", element: <CreateNewNote />},
		],
	},
])

export const desktopRouter = createBrowserRouter([
	{path: "/", element: <RootRedirect />},
	{path: "/login", element: <Login />},
	{
		element: (
			<ProtectedRoute>
				<DesktopLayout />
			</ProtectedRoute>
		),
		children: [
			{
				path: "/notes",
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
			{path: "new-note", element: <CreateNewNote />},
		],
	},
])
