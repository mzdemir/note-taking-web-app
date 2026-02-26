import supabase from "../../supabase-client"
import {useAuth} from "../../context/AuthContext"
import {useNote} from "../../context/NoteContext"
import {useToast} from "../../context/ToastContext"

export default function useUpdateNote() {
	const {session} = useAuth()
	const {updateNoteInContext} = useNote()
	const {setShowToast} = useToast()

	async function updateNote(previousState, formData) {
		try {
			const noteId = parseInt(formData.get("noteId"))
			const newTitle = formData.get("title")
			const newContent = formData.get("content")
			const newTagNames = formData
				.get("tags")
				.split(",")
				.map((t) => t.trim())

			if (!newTitle || !newContent || !newTagNames) {
				setShowToast({
					isVisible: true,
					variant: "error",
					message: "Note fields can't be empty",
					link: null,
					navigateTo: null,
				})
				return
			}

			// Fetch current note data to compare
			const {data: currentNote} = await supabase
				.from("notes")
				.select(`title, content, note_tags(tag_id, tags(name))`)
				.eq("id", noteId)
				.eq("user_id", session.user.id)
				.single()

			const currentTagNames = currentNote.note_tags?.map((nt) => nt.tags.name) || []

			// Check if title or content changed
			const titleChanged = newTitle !== currentNote.title
			const contentChanged = newContent !== currentNote.content

			// Update note only if title or content changed
			if (titleChanged || contentChanged) {
				const {error: updateError} = await supabase
					.from("notes")
					.update({
						title: newTitle,
						content: newContent,
						lastEdited: new Date().toISOString(),
					})
					.eq("id", noteId)
					.eq("user_id", session.user.id)

				if (updateError) throw updateError
			}

			// Compare tags - find what changed
			const tagsToAdd = newTagNames.filter((tag) => !currentTagNames.includes(tag))
			const tagsToRemove = currentTagNames.filter((tag) => !newTagNames.includes(tag))

			// Only proceed with tag changes if there are differences
			if (tagsToAdd.length > 0 || tagsToRemove.length > 0) {
				// Handle tags to remove
				if (tagsToRemove.length > 0) {
					// Get tag IDs for tags to remove
					const {data: tagsToRemoveData} = await supabase
						.from("tags")
						.select("id, name")
						.in("name", tagsToRemove)
						.eq("user_id", session.user.id)

					const tagIdsToRemove = tagsToRemoveData?.map((t) => t.id) || []

					// Delete relationships for removed tags
					const {error: deleteRelError} = await supabase
						.from("note_tags")
						.delete()
						.eq("note_id", noteId)
						.in("tag_id", tagIdsToRemove)

					if (deleteRelError) throw deleteRelError

					// Clean up orphaned tags
					for (const tagId of tagIdsToRemove) {
						const {data: stillUsed} = await supabase.from("note_tags").select("id").eq("tag_id", tagId).limit(1)

						if (!stillUsed || stillUsed.length === 0) {
							await supabase.from("tags").delete().eq("id", tagId).eq("user_id", session.user.id)
						}
					}
				}

				// Handle tags to add
				if (tagsToAdd.length > 0) {
					const tagIdsToAdd = []

					for (const tagName of tagsToAdd) {
						let {data: existingTag} = await supabase
							.from("tags")
							.select("id")
							.eq("name", tagName)
							.eq("user_id", session.user.id)
							.maybeSingle()

						if (existingTag) {
							tagIdsToAdd.push(existingTag.id)
						} else {
							const {data: newTag, error: tagError} = await supabase
								.from("tags")
								.insert({name: tagName, user_id: session.user.id})
								.select()
								.single()

							if (tagError) throw tagError
							tagIdsToAdd.push(newTag.id)
						}
					}

					// Create new relationships
					const noteTagsData = tagIdsToAdd.map((tagId) => ({
						note_id: noteId,
						tag_id: tagId,
					}))

					const {error: insertRelError} = await supabase.from("note_tags").insert(noteTagsData)

					if (insertRelError) throw insertRelError
				}
			}

			// Update context
			updateNoteInContext(noteId, {
				title: newTitle,
				content: newContent,
				tags: newTagNames,
				lastEdited: new Date().toISOString(),
			})

			setShowToast({
				isVisible: true,
				message: "Note updated successfully!",
				link: null,
				navigateTo: null,
			})
		} catch (error) {
			console.error("Updating Error", error)
			setShowToast({
				isVisible: true,
				variant: "error",
				message: "Something went wrong. Please try again.",
				link: null,
				navigateTo: null,
			})
		}
	}

	return {updateNote}
}
