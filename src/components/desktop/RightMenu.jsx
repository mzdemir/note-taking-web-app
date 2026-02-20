import {ArchivedIcon, DeleteIcon} from "../shared/Icons"
import Button from "../shared/Button"

import useDeleteNote from "../../hooks/crud/useDeleteNote"
import useArchiveNote from "../../hooks/crud/useArchiveNote"

export default function RightMenu({noteId}) {
	const {deleteNote} = useDeleteNote()
	const {archiveNote} = useArchiveNote()

	return (
		<aside className="right-bar-menu text-preset-4">
			<Button onClick={() => archiveNote(noteId)}>
				<ArchivedIcon /> Archive Note
			</Button>
			<Button onClick={() => deleteNote(noteId)}>
				<DeleteIcon />
				Delete Note
			</Button>
		</aside>
	)
}
