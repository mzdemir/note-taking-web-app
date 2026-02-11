import NotesList from "../components/shared/NoteList"
import useMediaQuery from "../hooks/useMediaQuery"
import {useNotes} from "../context/NoteContext"

export default function Archived() {
	const isDesktop = useMediaQuery()
	const notes = useNotes()

	const filteredNotes = notes?.filter((note) => note.isArchived)

	// prettier-ignore
	const pageDesc = (
		<p className="text-preset-5">
			All your archived notes are stored here. You can restore or delete them anytime.
		</p>
	)

	const getLinkPath = (noteId) => `/archived/${noteId}`

	return (
		<>
			{!isDesktop && <h1 className="page-title text-preset-1">Archived Notes</h1>}
			<NotesList notes={filteredNotes} pageDesc={pageDesc} getLinkPath={getLinkPath} />
		</>
	)
}
