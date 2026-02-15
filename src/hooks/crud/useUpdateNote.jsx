import supabase from "../../supabase-client"
import useAuth from "../useAuth"

// prettier-ignore
export default function useUpdateNote() {
	const {session} = useAuth()

	async function updateNote(noteId) {
		try {
      const {data} = await supabase
        .from("notes")
        .select("isArchived")
        .eq("user_id", session.user.id) 
        .single()

			const {error} = await supabase
        .from("notes")
        .update({isArchived: !data.isArchived})
        .eq("id", noteId)
        .eq("user_id", session.user.id)

			if (error) throw error
		} catch (error) {
			console.error("Updating Error", error)
		}
	}
  
	return {updateNote}
}
