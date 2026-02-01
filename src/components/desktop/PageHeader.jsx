import {SearchIcon, SettingsIcon} from "../shared/Icons"

import {useLocation, useParams} from "react-router"
import {useState} from "react"

export default function PageHeader() {
	const [searchedTag, setsearchedTag] = useState("")
	const location = useLocation()
	const params = useParams()
	const capitalizeTag = params.id && params.id.charAt(0).toUpperCase() + params.id.slice(1)

	const pageTitles = {
		"/": "All Notes",
		"/archived": "Archived Notes",
		"/tags": `Notes Tagged: ${capitalizeTag}`,
		"/search": "Search",
		"/settings": "Settings",
	}

	const baseSegment = "/" + (location.pathname.split("/")[1] || "")
	const pageTitle = pageTitles[baseSegment] || "All Notes"

	return (
		<header className="desktop-header">
			<h1 className="text-preset-1">{pageTitle}</h1>

			<label className="search-bar" aria-label="Search by title, content, or tags…">
				<SearchIcon />
				<input
					className="text-preset-5"
					onChange={(event) => setsearchedTag(event.target.value)}
					type="text"
					placeholder="Search by title, content, or tags…"
				/>
			</label>
			<div className="setting-icon">
				<SettingsIcon />
			</div>
		</header>
	)
}
