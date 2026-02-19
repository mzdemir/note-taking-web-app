import NotesList from "../components/shared/NoteList"

import useMediaQuery from "../hooks/useMediaQuery"
import {NoteContext} from "../context/NoteContext"

import {useContext} from "react"

export default function Archived() {
	const isDesktop = useMediaQuery()
	const {notes} = useContext(NoteContext)

	const filteredNotes = notes?.filter((note) => note.isArchived)
	const getLinkPath = (noteId) => `/archived/${noteId}`
	const emptyState = "No notes have been archived yet. Move notes here for safekeeping, or create a new note."

	if (!notes || notes.length < 1) return <></>

	return (
		<>
			{!isDesktop && (
				<>
					<h1 className="page-title text-preset-1">Archived Notes</h1>
					<p className="page-desc text-preset-5">
						All your archived notes are stored here. You can restore or delete them anytime.
					</p>
				</>
			)}
			<NotesList notes={filteredNotes} getLinkPath={getLinkPath} emptyState={emptyState} />
		</>
	)
}
