import {SearchIcon} from "../components/shared/Icons"
import NotesList from "../components/shared/NoteList"

import useMediaQuery from "../hooks/useMediaQuery"
import useFetchNotes from "../hooks/crud/useFetchNotes"

import {useSearchParams} from "react-router"

export default function Search() {
	const isDesktop = useMediaQuery()
	const {notes} = useFetchNotes()
	const [searchParams, setSearchParams] = useSearchParams()

	const query = searchParams.get("query") || ""
	const capitalizeQuery = query.charAt(0).toUpperCase() + query.slice(1)

	// prettier-ignore
	const filteredNotes = !query ? notes 
		: (notes.filter((note) =>
				note.title.toLowerCase().includes(query.toLowerCase()) ||
				note.content?.toLowerCase().includes(query.toLowerCase()) ||
				note.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase())),
			)
		)

	const pageDesc = (
		<p className="text-preset-5">
			All notes matching "<span>{capitalizeQuery}</span>" are displayed below.
		</p>
	)

	const getLinkPath = (noteId) => `/search/${noteId}`

	return (
		<>
			{!isDesktop && (
				<>
					<h1 className="page-title text-preset-1">Search</h1>
					<label className="search-bar" aria-label="Search by title, content, or tags…">
						<SearchIcon />
						<input
							value={query}
							className="text-preset-5"
							onChange={(event) => setSearchParams({query: event.target.value})}
							type="text"
							placeholder="Search by title, content, or tags…"
						/>
					</label>
				</>
			)}
			<NotesList notes={filteredNotes} pageDesc={pageDesc} getLinkPath={getLinkPath} />
		</>
	)
}
