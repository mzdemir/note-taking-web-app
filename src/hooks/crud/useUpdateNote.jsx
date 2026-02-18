import supabase from "../../supabase-client"
import useAuth from "../useAuth"
import {NoteContext} from "../../context/NoteContext"
import {useContext} from "react"
// prettier-ignore
export default function useUpdateNote() {
	const {session} = useAuth()
	const {updateNoteInContext} = useContext(NoteContext)

	async function updateNote(formData) {
		try {
			const noteId = parseInt(formData.get("noteId"))
			const title = formData.get("title")
			const content = formData.get("content")
			const newTagNames = formData.get("tags").split(",").map((t) => t.trim())

			const{error: updateError} = await supabase
				.from("notes")
				.update({
					title: title,
					content: content,
					lastEdited: new Date().toISOString(),
				})
				.eq("id", noteId)
        .eq("user_id", session.user.id)

			if (updateError) throw updateError

			const {data: relations} = await supabase
				.from("note_tags")
				.select("tag_id")
				.eq("note_id", noteId)

			const {error: deleteRelationsError} = await supabase
    		.from("note_tags")
    		.delete()
    		.eq("note_id", noteId)

			if (deleteRelationsError) throw deleteRelationsError

			// Clean up tags not used by any other notes
			const existingTagIds = relations?.map(r => r.tag_id) || []
			for (const tagId of existingTagIds) {
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
			
			// Try to find existing tag
			const tagIds = []
			for (const tagName of newTagNames) {
				let {data: existingTag} = await supabase
					.from("tags")
					.select("id")
					.eq("name", tagName)
					.eq("user_id", session.user.id)
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

			const noteTagsData = tagIds.map(tagId => ({
				note_id: noteId,
				tag_id: tagId
			}))

			const {error: relationError} = await supabase
				.from("note_tags")
				.insert(noteTagsData)

			if (relationError) throw relationError
			updateNoteInContext(noteId, {
				title,
				content,
				tags: newTagNames,
				lastEdited: new Date().toISOString()
			})

			console.log("update successful")

		} catch (error) {
			console.error("Updating Error", error)
		}
	}
  
	return {updateNote}
}
