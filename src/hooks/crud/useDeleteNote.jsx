import supabase from "../../supabase-client"

import {useState} from "react"
import {useAuth} from "../../context/AuthContext"
import {useNavigate} from "react-router"
import {useNote} from "../../context/NoteContext"
import {useToast} from "../../context/ToastContext"

export default function useDeleteNote() {
	const {session} = useAuth()
	const navigate = useNavigate()
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)
	const {deleteNoteFromContext} = useNote()
	const {setShowToast} = useToast()

	// prettier-ignore
	async function deleteNote(noteId) {
		// console.log(noteData)
		try {
			setLoading(true)
			setError(null)

			// Get the tag IDs for this note
			const {data: noteTagLinks} = await supabase
				.from("note_tags")
				.select("tag_id")
				.eq("note_id", noteId)

			const tagIds = noteTagLinks?.map(nt => nt.tag_id) || []

			// Delete the note itself
			const {error: noteError} = await supabase
				.from("notes")
				.delete()
				.eq('id', noteId)
				.eq('user_id', session.user.id)

			if (noteError) throw noteError
			

			// Clean up tags not used by any other notes
			for (const tagId of tagIds) {
				// Check if this tag is still used by other notes
				const {data: stillUsedTags} = await supabase
					.from("note_tags")
					.select("id")
					.eq("tag_id", tagId)
					.limit(1)
			
				// If not used by any notes, delete the tag
				if (!stillUsedTags || stillUsedTags.length === 0){
					await supabase
            .from("tags")
            .delete()
            .eq("id", tagId)
            .eq("user_id", session.user.id)
				}
			}
			console.log("delete succesfull")
			setShowToast({
				isVisible: true,
				message: "Note permanently deleted.",
				link: null,
				navigateTo: null,
			})

			navigate("/notes")
			deleteNoteFromContext(noteId)
			
		} catch (error) {
			console.error("Deleting error: ", error)
			setError(error)
			throw error
		} finally {
			setLoading(false)
		}
	}

	return {deleteNote, loading, error}
}
