import HeaderControl from "../components/mobile/HeaderControl"
import NoteForm from "../components/shared/NoteForm"
import RightMenu from "../components/desktop/RightMenu"
import Modal from "../components/shared/Modal"

import useMediaQuery from "../hooks/useMediaQuery"
import useUpdateNote from "../hooks/crud/useUpdateNote"
import useNoteContext from "../hooks/useNoteContext"

import {useActionState, useState} from "react"
import {useParams} from "react-router"

export default function NoteDetails() {
	const isDesktop = useMediaQuery()
	const {notes, isLoading} = useNoteContext()
	const params = useParams()
	const {updateNote} = useUpdateNote()
	const [modal, setModal] = useState({open: false, variant: ""})
	const [formKey, setFormKey] = useState(0)

	const noteId = params.noteId || params.id
	const noteDetails = notes?.find((note) => note.id.toString() === noteId)

	const [_error, submitAction, isPending] = useActionState(updateNote, null)

	function handleCancel() {
		setFormKey((prev) => prev + 1)
	}

	if (isLoading || !noteDetails) return <p className="empty-state text-preset-5">Loading</p>

	return (
		<>
			<div className="note-details" aria-live="polite">
				{!isDesktop && (
					<HeaderControl
						noteId={noteDetails?.id}
						setModal={setModal}
						isPending={isPending}
						handleCancel={handleCancel}
					/>
				)}
				{!isDesktop && <hr />}
				<NoteForm key={formKey} action={submitAction} noteDetails={noteDetails} />
				<hr />
				{isDesktop && (
					<div className="save-btns">
						<button className="primary-btn" type="submit" form="note-form">
							Save Note
						</button>
						<button className="secondary-btn" onClick={handleCancel} isPending={isPending}>
							Cancel
						</button>
					</div>
				)}
			</div>
			{isDesktop && <RightMenu noteId={noteDetails?.id} setModal={setModal} />}
			{modal.open && (
				<div className="overlay">
					<Modal variant={modal.variant} noteId={noteDetails?.id} setModal={setModal} />
				</div>
			)}
		</>
	)
}
