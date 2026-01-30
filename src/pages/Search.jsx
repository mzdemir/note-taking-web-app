import {SearchIcon} from "../components/shared/Icons"
import NotesList from "../components/shared/NoteList"

import {useState} from "react"
export default function Search() {
	const [searchedTag, setsearchedTag] = useState("")
	const capitalizeSearchedTag = searchedTag.charAt(0).toUpperCase() + searchedTag.slice(1)

	return (
		<>
			<div className="main-content">
				<h1 className="page-title text-preset-1">Search</h1>
				<label className="search-bar" aria-label="Search by title, content, or tags…">
					<SearchIcon />
					<input
						className="text-preset-5"
						onChange={(event) => setsearchedTag(event.target.value)}
						type="text"
						placeholder="Search by title, content, or tags…"
					/>
				</label>
				{searchedTag && (
					<p className="text-preset-5">
						All notes matching "<span>{capitalizeSearchedTag}</span>" are displayed below.
					</p>
				)}
				<NotesList searchedTag={searchedTag.toLocaleLowerCase().trim()} />
			</div>
		</>
	)
}
