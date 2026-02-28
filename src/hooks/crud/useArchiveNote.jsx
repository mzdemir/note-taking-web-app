import supabase from "../../supabase-client"

import useAuthContext from "../useAuthContext"
import useNoteContext from "../useNoteContext"
import useToastContext from "../useToastContext"

export default function useArchiveNote() {
	const {session} = useAuthContext()
	const {updateNoteInContext} = useNoteContext()
	const {setShowToast} = useToastContext()

	async function archiveNote(noteId) {
		try {
			const {data, error: fetchingError} = await supabase
				.from("notes")
				.select("isArchived")
				.eq("id", noteId)
				.eq("user_id", session.user.id)
				.single()

			if (fetchingError) throw fetchingError

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
		} catch (error) {
			console.error("An unexpected error occurred:", error.message)
			setShowToast({
				isVisible: true,
				variant: "error",
				message: "Something went wrong. Please try again.",
				link: null,
				navigateTo: null,
			})
		}
	}

	return {archiveNote}
}
