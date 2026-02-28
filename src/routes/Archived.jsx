import NotesList from "../components/shared/NoteList"

import useMediaQuery from "../hooks/useMediaQuery"
import useNoteContext from "../hooks/useNoteContext"

export default function Archived() {
	const isDesktop = useMediaQuery()
	const {notes, isLoading} = useNoteContext()

	if (isLoading) return <p className="empty-state text-preset-5">Loading</p>

	const filteredNotes = notes?.filter((note) => note.isArchived)
	const getLinkPath = (noteId) => `/archived/${noteId}`
	const pageDesc = "All your archived notes are stored here. You can restore or delete them anytime."
	const emptyState = "No notes have been archived yet. Move notes here for safekeeping, or create a new note."

	return (
		<>
			{!isDesktop && <h1 className="page-title text-preset-1">Archived Notes</h1>}
			<NotesList notes={filteredNotes} pageDesc={pageDesc} getLinkPath={getLinkPath} emptyState={emptyState} />
		</>
	)
}
