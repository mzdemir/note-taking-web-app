import {DeleteIcon, ArchivedIcon} from "../shared/Icons"
import GoBack from "./GoBack"

import supabase from "../../supabase-client"
import {useAuth} from "../../context/AuthContext"

export default function HeaderControl({note}) {
	const {session} = useAuth()

	console.log({
		user_id: session.user.id,
		...note,
	})

	async function InsertNote() {
		try {
			const {error: noteError} = await supabase.from("notes").insert({
				user_id: session.user.id,
				title: note.title,
				content: note.content,
			})

			const {error: tagsError} = await supabase.from("tags").insert({
				user_id: session.user.id,
				name: note.tags,
			})

			if (noteError) throw noteError
			if (tagsError) throw tagsError
		} catch (error) {
			console.log("Inserting error: ", error)
		}
	}

	function deleteNote() {
		console.log(session.user)
	}

	return (
		<header className="header-control">
			<GoBack where={"Go Back"} />
			<div className="control-btns text-preset-5">
				<button aria-label="Delete note" onClick={deleteNote}>
					<DeleteIcon />
				</button>

				<button aria-label="Archive note">
					<ArchivedIcon />
				</button>

				<button>Cancel</button>
				<button className="save-note" onClick={InsertNote}>
					Save Note
				</button>
			</div>
		</header>
	)
}
