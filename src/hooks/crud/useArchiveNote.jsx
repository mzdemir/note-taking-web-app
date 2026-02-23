import supabase from "../../supabase-client"

import {useAuth} from "../../context/AuthContext"

export default function useArchiveNote() {
	const {session} = useAuth()

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
	}

	return {archiveNote}
}
