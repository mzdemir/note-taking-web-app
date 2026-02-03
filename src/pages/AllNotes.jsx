import useMediaQuery from "../hooks/useMediaQuery"
import NotesList from "../components/shared/NoteList"

import {NotesContext} from "../App"
import {useContext} from "react"

export default function AllNotes() {
	const isDesktop = useMediaQuery()
	const notes = useContext(NotesContext)

	const getLinkPath = (noteId) => `/${noteId}`
	return (
		<>
			{!isDesktop && <h1 className="page-title text-preset-1">All Notes</h1>}
			<NotesList notes={notes} getLinkPath={getLinkPath} />
		</>
	)
}
