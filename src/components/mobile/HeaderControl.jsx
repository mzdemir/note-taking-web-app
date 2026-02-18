import {DeleteIcon, ArchivedIcon} from "../shared/Icons"
import GoBack from "./GoBack"
import Button from "../shared/Button"

import useDeleteNote from "../../hooks/crud/useDeleteNote"
import useArchiveNote from "../../hooks/crud/useArchiveNote"

export default function HeaderControl({noteId}) {
	const {deleteNote} = useDeleteNote()
	const {archiveNote} = useArchiveNote()

	return (
		<header className="header-control text-preset-5">
			<GoBack where={"Go Back"} />
			<div className="control-btns text-preset-5">
				<Button aria-label="Delete note" onClick={() => deleteNote(noteId)}>
					<DeleteIcon />
				</Button>

				<Button aria-label="Archive note" onClick={() => archiveNote(noteId)}>
					<ArchivedIcon />
				</Button>

				<button>Cancel</button>
				<Button className={""} type="submit">
					Save Note
				</Button>
			</div>
		</header>
	)
}
