import HeaderControl from "../components/mobile/HeaderControl"
import NoteForm from "../components/shared/NoteForm"

import useMediaQuery from "../hooks/useMediaQuery"
import useInsertNote from "../hooks/crud/useInsertNote"

import {useActionState} from "react"

export default function CreateNewNote() {
	const isDesktop = useMediaQuery()
	const {insertNote} = useInsertNote()

	const [_error, submitAction, isPending] = useActionState(insertNote, null)

	return (
		<div className="note-details">
			{!isDesktop && <HeaderControl />}
			{!isDesktop && <hr />}

			<NoteForm action={submitAction} />
			{isDesktop && (
				<div className="save-btns">
					<button className="primary-btn" type="submit" form="note-form" disabled={isPending} aria-busy={isPending}>
						Save Note
					</button>
					<button className="secondary-btn" disabled={isPending} aria-busy={isPending}>
						Cancel
					</button>
				</div>
			)}
		</div>
	)
}
