import supabase from "../../supabase-client"

import useAuth from "../useAuth"
import {NoteContext} from "../../context/NoteContext"

import {useContext} from "react"

export default function useArchiveNote() {
	const {session} = useAuth()
	const {updateNoteInContext} = useContext(NoteContext)

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
	}

	return {archiveNote}
}
