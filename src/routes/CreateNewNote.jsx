import HeaderControl from "../components/mobile/HeaderControl"
import NoteForm from "../components/shared/NoteForm"
import Button from "../components/shared/Button"

import useMediaQuery from "../hooks/useMediaQuery"
import useInsertNote from "../hooks/crud/useInsertNote"

import {useActionState} from "react"

export default function CreateNewNote() {
	const isDesktop = useMediaQuery()

	const {insertNote} = useInsertNote()

	const [_error, submitAction, _isPending] = useActionState(insertNote, null)

	return (
		<div className="note-details">
			{!isDesktop && <HeaderControl />}
			{!isDesktop && <hr />}

			<NoteForm action={submitAction} />
			{isDesktop && (
				<div className="save-btns">
					<Button className="primary-btn" type="submit">
						Save Note
					</Button>
					<Button className="secondary-btn">Cancel</Button>
				</div>
			)}
		</div>
	)
}
