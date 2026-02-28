import NotesList from "../components/shared/NoteList"
import useMediaQuery from "../hooks/useMediaQuery"
import useNoteContext from "../hooks/useNoteContext"

export default function AllNotes() {
	const isDesktop = useMediaQuery()
	const {notes, isLoading} = useNoteContext()

	if (isLoading) return <p className="empty-state text-preset-5">Loading</p>

	const getLinkPath = (noteId) => `/notes/${noteId}`

	const emptyState = "You don't have any notes yet. Start a new note to capture your thoughts and ideas."

	return (
		<>
			{!isDesktop && <h1 className="page-title text-preset-1">All Notes</h1>}
			<NotesList notes={notes} getLinkPath={getLinkPath} emptyState={emptyState} />
		</>
	)
}
