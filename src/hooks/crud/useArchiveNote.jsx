import supabase from "../../supabase-client"

import {useAuth} from "../../context/AuthContext"
import {useNote} from "../../context/NoteContext"
import {useToast} from "../../context/ToastContext"

export default function useArchiveNote() {
	const {session} = useAuth()
	const {updateNoteInContext} = useNote()
	const {setShowToast} = useToast()

	async function archiveNote(noteId) {
		const {data} = await supabase
			.from("notes")
			.select("isArchived")
			.eq("id", noteId)
			.eq("user_id", session.user.id)
			.single()

		const {error: archiveError} = await supabase
			.from("notes")
			.update({isArchived: !data.isArchived})
			.eq("id", noteId)
			.eq("user_id", session.user.id)

		if (archiveError) throw archiveError
		updateNoteInContext(noteId, {isArchived: !data.isArchived})
		setShowToast({
			isVisible: true,
			message: data.isArchived ? "Note restored to active notes." : "Note archived.",
			link: data.isArchived ? "All Notes" : "Archived Notes",
			navigateTo: data.isArchived ? "/notes" : "/archived",
		})
	}

	return {archiveNote}
}
