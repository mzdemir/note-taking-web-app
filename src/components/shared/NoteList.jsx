import {NotesContext} from "../../App"
import CreateNewNoteBtn from "../shared/CreateNewNoteBtn"

import {useContext, Fragment} from "react"
import {Link, Outlet, useLocation, useParams} from "react-router"

export default function NotesList({searchedTag}) {
	const notes = useContext(NotesContext)
	const location = useLocation()
	const params = useParams()

	const capitalizeTag = params.id && params.id.charAt(0).toUpperCase() + params.id.slice(1)

	if (!notes) return <></>

	const isArchivedPage = location.pathname.startsWith("/archived")
	const isTagPage = location.pathname.startsWith("/tags")

	let filteredNotes = notes
	if (isArchivedPage) {
		filteredNotes = notes.filter((note) => note.isArchived)
	} else if (searchedTag && searchedTag.length > 0) {
		filteredNotes = notes.filter((note) => {
			return note.tags.map((tag) => tag.toLowerCase()).includes(searchedTag)
		})
	}

	function handleRouting(noteId) {
		if (isArchivedPage) return `/archived/${noteId}`
		if (isTagPage) return `/tags/${params.id}/${noteId}`
		return `/${noteId}`
	}

	return (
		<>
			<div className="note-list">
				<CreateNewNoteBtn />
				{isArchivedPage && (
					<p className="text-preset-5">
						All your archived notes are stored here. You can restore or delete them anytime.
					</p>
				)}

				{isTagPage && (
					<p>
						All notes with the "<span>{capitalizeTag}</span>" tag are shown here.
					</p>
				)}
				{filteredNotes && filteredNotes.length > 0 ?
					filteredNotes.map((note) => (
						<Fragment key={note.id}>
							<Link to={handleRouting(note.id)} className="text-preset-6">
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
							<hr />
						</Fragment>
					))
				:	<p className="text-preset-5">No notes match your search. Try a different keyword or create a new note.</p>}
			</div>
			<Outlet />
		</>
	)
}
