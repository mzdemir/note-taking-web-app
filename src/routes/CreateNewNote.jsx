import GoBackLink from "../components/mobile/GoBackLink"
import NoteForm from "../components/shared/NoteForm"

import useMediaQuery from "../hooks/useMediaQuery"
import useInsertNote from "../hooks/crud/useInsertNote"

import {useActionState, useState} from "react"

export default function CreateNewNote() {
	const isDesktop = useMediaQuery()
	const {insertNote} = useInsertNote()
	const [formKey, setFormKey] = useState(0)

	const [_error, submitAction, isPending] = useActionState(insertNote, null)

	function handleCancel() {
		setFormKey((prev) => prev + 1)
	}

	return (
		<div className="note-details">
			{!isDesktop && (
				<header className="header-controls text-preset-5">
					<GoBackLink where={"Go Back"} />
					<div className="control-btns">
						<button onClick={handleCancel} disabled={isPending} aria-busy={isPending}>
							Cancel
						</button>
						<button className="save-btn" type="submit" form="note-form" disabled={isPending} aria-busy={isPending}>
							Save Note
						</button>
					</div>
				</header>
			)}
			{!isDesktop && <hr />}

			<NoteForm key={formKey} action={submitAction} />
			{isDesktop && (
				<div className="save-btns">
					<button className="primary-btn" type="submit" form="note-form" disabled={isPending} aria-busy={isPending}>
						Save Note
					</button>
					<button className="secondary-btn" onClick={handleCancel} disabled={isPending} aria-busy={isPending}>
						Cancel
					</button>
				</div>
			)}
		</div>
	)
}
