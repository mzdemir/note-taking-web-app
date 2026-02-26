import supabase from "../../supabase-client"

import {useToast} from "../../context/ToastContext"
import {useAuth} from "../../context/AuthContext"
import {useNavigate} from "react-router"

// prettier-ignore
export default function useInsertNote() {
	const {session} = useAuth()
	const navigate = useNavigate()
	const {setShowToast} = useToast()

	async function insertNote(previousState, formData) {
		const title = formData.get("title")
		const content= formData.get("content")
		const tags = formData.get("tags").split(",").map((t) => t.trim())

		if (!title || !content || !tags) {
			setShowToast({
				isVisible: true,
				variant: "error",
				message: "Note fields can't be empty",
				link: null,
				navigateTo: null,
			})
			return
		}

		try {
			// Insert note
			const {data: newNote, error: noteError} = await supabase
				.from("notes")
				.insert({
					user_id: session.user.id,
					title: title,
					content: content,
				})
				.select()
				.single()

			if (noteError) throw noteError

			// Try to find existing tag
			const tagIds = []
			for (const tagName of tags) {
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
			setShowToast({
				isVisible: true,
				message: "Note saved successfully!",
				link: null,
				navigateTo: null,
			})
			navigate(`/notes/${newNote.id}`)
		
			return newNote
		} catch (error) {
			console.error("Inserting error: ", error)
			setShowToast({
				isVisible: true,
				variant: "error",
				message: "Something went wrong. Please try again.",
				link: null,
				navigateTo: null,
			})
		}
	}

	return {insertNote}
}
