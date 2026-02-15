import {DeleteIcon, ArchivedIcon} from "../shared/Icons"
import GoBack from "./GoBack"
import Button from "../shared/Button"

import useInsertNote from "../../hooks/crud/useInsertNote"
import useDeleteNote from "../../hooks/crud/useDeleteNote"
import useUpdateNote from "../../hooks/crud/useUpdateNote"

export default function HeaderControl({note, noteId}) {
	const {createNote} = useInsertNote()
	const {deleteNote} = useDeleteNote()
	const {updateNote} = useUpdateNote()

	return (
		<header className="header-control">
			<GoBack where={"Go Back"} />
			<div className="control-btns text-preset-5">
				<Button aria-label="Delete note" onClick={() => deleteNote(noteId)}>
					<DeleteIcon />
				</Button>

				<Button aria-label="Archive note" onClick={() => updateNote(noteId)}>
					<ArchivedIcon />
				</Button>

				<button>Cancel</button>
				<Button className={""} onClick={() => createNote(note)}>
					Save Note
				</Button>
			</div>
		</header>
	)
}
