import NotesList from "../components/shared/NoteList"
import GoBack from "../components/mobile/GoBack"

import {useParams} from "react-router"
export default function TagPage() {
	const params = useParams()
	const capitalizeTag = params.id.charAt(0).toUpperCase() + params.id.slice(1)

	return (
		<>
			<div className="main-content">
				<GoBack where="All Tags" />
				<h1 className="page-title tagged text-preset-1">
					Notes Tagged: <span>{capitalizeTag}</span>
				</h1>
				<p>
					All notes with the "<span>{capitalizeTag}</span>" tag are shown here.
				</p>
				<NotesList searchedTag={params.id} />
			</div>
		</>
	)
}
