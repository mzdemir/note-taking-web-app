import {NotesContext} from "../../App"

import {useContext} from "react"
import {Link, Outlet, useLocation} from "react-router"

export default function NotesList({searchedTag}) {
	const notes = useContext(NotesContext)
	const location = useLocation()

	if (!notes) return <></>

	const isArchivedPage = location.pathname === "/archived"
	let filteredNotes = notes

	if (isArchivedPage) {
		filteredNotes = notes.filter((note) => note.isArchived)
	} else if (searchedTag && searchedTag.length > 0) {
		filteredNotes = notes.filter((note) => {
			return note.tags.map((tag) => tag.toLowerCase()).includes(searchedTag)
		})
	}

	return (
		<>
			<div className="note-list">
				{filteredNotes && filteredNotes.length > 0 ?
					filteredNotes.map((note) => (
						<Link to={`/${note.id}`} key={note.id} className="text-preset-6">
							<h2 className="note-title text-preset-3">{note.title}</h2>
							<div className="note-tags">
								{note.tags.map((tag) => (
									<span key={tag}>{tag}</span>
								))}
							</div>
							<time className="last-edited" dateTime={note.lastEdited}>
								{new Date(note.lastEdited).toLocaleDateString("en-GB", {
									day: "2-digit",
									month: "short",
									year: "numeric",
								})}
							</time>
						</Link>
					))
				:	<p className="text-preset-5">No notes match your search. Try a different keyword or create a new note.</p>}
			</div>
			<Outlet />
		</>
	)
}
