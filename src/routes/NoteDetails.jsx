import HeaderControl from "../components/mobile/HeaderControl"
import NoteForm from "../components/shared/NoteForm"
import RightMenu from "../components/desktop/RightMenu"

import useMediaQuery from "../hooks/useMediaQuery"
import useUpdateNote from "../hooks/crud/useUpdateNote"
import {NoteContext} from "../context/NoteContext"

import {useActionState, useContext} from "react"
import {useParams} from "react-router"

export default function NoteDetails() {
	const params = useParams()
	const isDesktop = useMediaQuery()
	const {updateNote} = useUpdateNote()
	const {notes} = useContext(NoteContext)

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

	if (!noteDetails) {
		return <></>
	}

	return (
		<div className="note-details">
			{!isDesktop && <HeaderControl noteId={noteDetails?.id} />}
			{!isDesktop && <hr />}
			<NoteForm action={submitAction} noteDetails={noteDetails} />
		</div>
	)
}
