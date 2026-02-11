import useMediaQuery from "../hooks/useMediaQuery"
import NotesList from "../components/shared/NoteList"
import {useNotes} from "../context/NoteContext"

export default function AllNotes() {
	const isDesktop = useMediaQuery()
	const notes = useNotes()

	const getLinkPath = (noteId) => `/${noteId}`
	return (
		<>
			{!isDesktop && <h1 className="page-title text-preset-1">All Notes</h1>}
			<NotesList notes={notes} getLinkPath={getLinkPath} />
		</>
	)
}
