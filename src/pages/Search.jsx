import {SearchIcon} from "../components/Icons"
import NotesList from "../components/NotesList"

import {useState} from "react"
export default function Search() {
	const [searchedTag, setsearchedTag] = useState("")

	return (
		<>
			<div className="main-content">
				<h1 className="page-title text-preset-1">Search</h1>
				<label aria-label="Search by title, content, or tags…">
					<SearchIcon />
					<input
						onChange={(event) => setsearchedTag(event.target.value)}
						type="text"
						placeholder="Search by title, content, or tags…"
					/>
				</label>
				{searchedTag && <p>All notes matching "{searchedTag}" are displayed below.</p>}
				<aside className="navbar-allnotes">
					<NotesList page={"Search"} searchedTag={searchedTag.toLocaleLowerCase().trim()} />
				</aside>
			</div>
		</>
	)
}
