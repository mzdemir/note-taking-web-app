import HeaderControl from "../components/mobile/HeaderControl"
import NoteForm from "../components/shared/NoteForm"
import RightMenu from "../components/desktop/RightMenu"
import Button from "../components/shared/Button"
import Modal from "../components/shared/Modal"

import useMediaQuery from "../hooks/useMediaQuery"
import useUpdateNote from "../hooks/crud/useUpdateNote"
import {useNote} from "../context/NoteContext"

import {useActionState, useState} from "react"
import {useParams} from "react-router"

export default function NoteDetails() {
	const isDesktop = useMediaQuery()
	const {notes} = useNote()
	const params = useParams()
	const {updateNote} = useUpdateNote()
	const [modal, setModal] = useState({open: false, variant: ""})

	const noteId = params.noteId || params.id
	const noteDetails = notes?.find((note) => note.id.toString() === noteId)

	const [_error, submitAction, _isPending] = useActionState(async (previousState, formData) => {
		const title = formData.get("title")
		const content = formData.get("content")
		const tags = formData.get("tags")

		const hasChanged =
			title !== noteDetails.title || content !== noteDetails.content || tags !== noteDetails.tags.join(", ")

		if (!hasChanged) return previousState

		await updateNote(formData)

		return null
	}, null)

	if (!noteDetails) return <></>

	return (
		<>
			<div className="note-details">
				{!isDesktop && <HeaderControl noteId={noteDetails?.id} setModal={setModal} />}
				{!isDesktop && <hr />}
				<NoteForm action={submitAction} noteDetails={noteDetails} />
				<hr />
				{isDesktop && (
					<div className="save-btns">
						<Button className="primary-btn" type="submit">
							Save Note
						</Button>
						<Button className="secondary-btn">Cancel</Button>
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
