import useMediaQuery from "../hooks/useMediaQuery"
import NotesList from "../components/shared/NoteList"
import {NoteContext} from "../context/NoteContext"

import {useContext} from "react"

export default function AllNotes() {
	const isDesktop = useMediaQuery()
	const {notes} = useContext(NoteContext)

	const getLinkPath = (noteId) => `/notes/${noteId}`

	return (
		<>
			{!isDesktop && <h1 className="page-title text-preset-1">All Notes</h1>}
			<NotesList notes={notes} getLinkPath={getLinkPath} />
		</>
	)
}
