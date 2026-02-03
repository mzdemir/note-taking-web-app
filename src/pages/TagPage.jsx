import NotesList from "../components/shared/NoteList"
import GoBack from "../components/mobile/GoBack"
import useMediaQuery from "../hooks/useMediaQuery"

import {NotesContext} from "../App"
import {useContext} from "react"
import {useParams} from "react-router"

export default function TagPage() {
	const isDesktop = useMediaQuery()
	const notes = useContext(NotesContext)
	const params = useParams()

	const capitalizeTag = params.id?.charAt(0).toUpperCase() + params.id.slice(1)

	const filteredNotes = notes?.filter((note) => {
		return note.tags.map((tag) => tag.toLowerCase()).includes(params.id)
	})

	// prettier-ignore
	const pageDesc = <p>All notes with the "<span>{capitalizeTag}</span>" tag are shown here.</p>

	function getLinkPath(noteId) {
		return `/tags/${params.id}/${noteId}`
	}

	return (
		<>
			{!isDesktop && (
				<>
					<GoBack where="All Tags" />
					<h1 className="page-title tagged text-preset-1">
						Notes Tagged: <span>{capitalizeTag}</span>
					</h1>
				</>
			)}
			<NotesList notes={filteredNotes} pageDesc={pageDesc} getLinkPath={getLinkPath} />
		</>
	)
}
