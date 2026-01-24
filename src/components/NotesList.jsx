import {useState, useEffect} from "react"
import {Link} from "react-router"

export default function NotesList({page, searchedTag}) {
	const [notes, setNotes] = useState([])
	const [tags, SetTags] = useState([])

	useEffect(() => {
		fetch("/api/notes")
			.then((res) => res.json())
			.then((data) => {
				if (page === "AllNotes") setNotes(data.notes)
				if (page === "Archived") setNotes(data.notes.filter((note) => note.isArchived))
				if (page === "Tags") SetTags([...new Set(data.notes.map((note) => note.tags).flat())])
				if (page === "Search")
					setNotes(data.notes.filter((note) => note.tags.map((tag) => tag.toLowerCase()).includes(searchedTag)))
			})
	}, [page, searchedTag])

	// prettier-ignore
	const emptyState =
		page === "AllNotes" ? <p>You don't have any notes yet. Start a new note to capture your thoughts and ideas.</p> : 
    page === "Archived" ? <p>No notes have been archived yet. Move notes here for safekeeping, or create a new note.</p> : 
    page === "Search" ? <p>No notes match your search. Try a different keyword or create a new note.</p> : ""

	// prettier-ignore
	const notesListEl = notes.length === 0
    ? emptyState
    : notes.map((note) => (
				<Link to={`/${note.id}`} key={note.id} className="text-preset-6">
					<h2 className="note-title text-preset-3">{note.title}</h2>
					<div className="note-tags">
						{note.tags.map((tag) => (
							<span key={tag}>{tag}</span>
						))}
					</div>
					<time className="last-edited" dateTime={note.lastEdited}>
						{new Date(note.lastEdited).toLocaleDateString("en-GB", {day: "2-digit", month: "short", year: "numeric"})}
					</time>
				</Link>
			))

	const tagListEl = tags.sort().map((tag) => (
		<ul key={tag}>
			<li>
				<Link to={`/${tag.toLowerCase()}`}>{tag}</Link>
			</li>
		</ul>
	))

	return page === "Tags" ? tagListEl : notesListEl
}
