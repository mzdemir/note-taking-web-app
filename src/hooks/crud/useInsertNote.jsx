import supabase from "../../supabase-client"

import useAuth from "../useAuth"
import {useNavigate} from "react-router"

// prettier-ignore
export default function useInsertNote() {
	const {session} = useAuth()
	const navigate = useNavigate()

	async function insertNote(previousState, formData) {
		try {
			// Insert note
			const {data: newNote, error: noteError} = await supabase
				.from("notes")
				.insert({
					user_id: session.user.id,
					title: formData.get("title"),
					content: formData.get("content"),
				})
				.select()
				.single()

			if (noteError) throw noteError

			// Try to find existing tag
			const tagIds = []
			for (const tagName of formData.get("tags").split(",")) {
				let {data: existingTag} = await supabase
					.from("tags")
					.select("id")
					.eq("name", tagName)
					.maybeSingle()

				if (existingTag) {
					tagIds.push(existingTag.id)
				} else {
					// Create new tag if it doesn't exist
					const {data: newTag, error: tagError} = await supabase
						.from("tags")
						.insert({name: tagName, user_id: session.user.id})
						.select()
						.single()
					
					if (tagError) throw tagError
					tagIds.push(newTag.id)
				}
			}

			// Link tags to note
			const noteTagsData = tagIds.map(tagId => ({
				note_id: newNote.id,
				tag_id: tagId
			}))

			const {error: relationError} = await supabase
				.from("note_tags")
				.insert(noteTagsData)

			if (relationError) throw relationError
			console.log("insert succesfull")
			navigate("/notes")
		
			return newNote
		} catch (error) {
			console.error("Inserting error: ", error)
			throw error
		}
	}

	return {insertNote}
}
