import {SearchIcon} from "../components/shared/Icons"
import NotesList from "../components/shared/NoteList"

import useMediaQuery from "../hooks/useMediaQuery"
import {NoteContext} from "../context/NoteContext"

import {useContext} from "react"
import {useSearchParams} from "react-router"

export default function Search() {
	const isDesktop = useMediaQuery()
	const {notes} = useContext(NoteContext)
	const [searchParams, setSearchParams] = useSearchParams()

	const query = searchParams.get("query") || ""
	const capitalizeQuery = query.charAt(0).toUpperCase() + query.slice(1)

	const filteredNotes =
		query ?
			notes?.filter(
				(note) =>
					note.title.toLowerCase().includes(query.toLowerCase()) ||
					note.content?.toLowerCase().includes(query.toLowerCase()) ||
					note.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase())),
			)
		:	notes

	const getLinkPath = (noteId) => `/search/${noteId}`
	const emptyState = "No notes match your search. Try a different keyword or create a new note."

	if (!filteredNotes || filteredNotes.length < 1) return <></>

	return (
		<>
			{!isDesktop && (
				<>
					<h1 className="page-title text-preset-1">Search</h1>
					<label className="input-bar" aria-label="Search by title, content, or tags…">
						<SearchIcon />
						<input
							value={query}
							name="search"
							className=" text-preset-5"
							onChange={(event) => setSearchParams({query: event.target.value})}
							type="text"
							placeholder="Search by title, content, or tags…"
						/>
					</label>
					<p className="page-desc text-preset-5">
						All notes matching "<span>{capitalizeQuery}</span>" are displayed below.
					</p>
				</>
			)}
			<NotesList notes={filteredNotes} getLinkPath={getLinkPath} emptyState={emptyState} />
		</>
	)
}
