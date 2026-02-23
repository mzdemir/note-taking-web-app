import NotesList from "../components/shared/NoteList"
import useMediaQuery from "../hooks/useMediaQuery"

import {useNote} from "../context/NoteContext"

export default function AllNotes() {
	const isDesktop = useMediaQuery()
	const {notes} = useNote()

	const getLinkPath = (noteId) => `/notes/${noteId}`

	const emptyState = "You don't have any notes yet. Start a new note to capture your thoughts and ideas."

	return (
		<>
			{!isDesktop && <h1 className="page-title text-preset-1">All Notes</h1>}
			<NotesList notes={notes} getLinkPath={getLinkPath} emptyState={emptyState} />
		</>
	)
}
