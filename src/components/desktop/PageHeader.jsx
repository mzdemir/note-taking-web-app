import {SearchIcon, SettingsIcon} from "../shared/Icons"

import {useLocation, useParams, Link, useSearchParams, useNavigate} from "react-router"

export default function PageHeader() {
	const [searchParams, setSearchParams] = useSearchParams()
	const query = searchParams.get("query") || ""
	const navigate = useNavigate()

	const params = useParams()
	const capitalizeTag = params.id && params.id.charAt(0).toUpperCase() + params.id.slice(1)
	const capitalizeQuery = query.charAt(0).toUpperCase() + query.slice(1).toLowerCase()

	const pageTitles = {
		"/": "All Notes",
		"/archived": "Archived Notes",
		"/tags": `Notes Tagged: ${capitalizeTag}`,
		"/settings": "Settings",
		"/search": `Showing results for: ${capitalizeQuery}`,
	}

	const location = useLocation()
	const baseSegment = "/" + (location.pathname.split("/")[1] || "")
	const pageTitle = pageTitles[baseSegment] || "All Notes"
	const isSearchDetailPage = location.pathname.startsWith("/search/") && location.pathname.split("/").length > 2

	function handleQuerySearch(event) {
		const newQuery = event.target.value

		if (newQuery) {
			if (!location.pathname.startsWith("/search")) {
				navigate(`/search?query=${newQuery}`)
			} else {
				setSearchParams({query: newQuery})
			}
		} else {
			setSearchParams({})
		}
	}

	return (
		<>
			<header className="desktop-header">
				<h1 className="text-preset-1">
					{query && !isSearchDetailPage ? `Showing results for: ${capitalizeQuery}` : pageTitle}
				</h1>
				<label className="search-bar" aria-label="Search by title, content, or tags…">
					<SearchIcon />
					<input
						value={query}
						className="text-preset-5"
						onChange={(event) => handleQuerySearch(event)}
						type="text"
						placeholder="Search by title, content, or tags…"
					/>
				</label>
				<div className="setting-icon">
					<Link to="settings">
						<SettingsIcon />
					</Link>
				</div>
			</header>
		</>
	)
}
