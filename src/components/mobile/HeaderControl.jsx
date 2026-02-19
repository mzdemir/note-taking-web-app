import {DeleteIcon, ArchivedIcon} from "../shared/Icons"
import GoBackLink from "./GoBackLink"
import Button from "../shared/Button"

import useMediaQuery from "../../hooks/useMediaQuery"
import useDeleteNote from "../../hooks/crud/useDeleteNote"
import useArchiveNote from "../../hooks/crud/useArchiveNote"

export default function HeaderControl({noteId}) {
	const isDesktop = useMediaQuery()
	const {deleteNote} = useDeleteNote()
	const {archiveNote} = useArchiveNote()

	return (
		<header className="header-controls text-preset-5">
			<GoBackLink where={"Go Back"} />
			<div className="control-btns">
				<Button aria-label="Delete note" onClick={() => deleteNote(noteId)}>
					<DeleteIcon />
				</Button>

				<Button aria-label="Archive note" onClick={() => archiveNote(noteId)}>
					<ArchivedIcon />
				</Button>

				<button>Cancel</button>
				<Button className={!isDesktop ? "save-btn" : "primary-btn"} type="submit">
					Save Note
				</Button>
			</div>
		</header>
	)
}
