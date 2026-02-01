import NotesList from "../components/shared/NoteList"
import GoBack from "../components/mobile/GoBack"
import useMediaQuery from "../hooks/useMediaQuery"

import {Outlet, useParams} from "react-router"
export default function TagPage() {
	const params = useParams()
	const capitalizeTag = params.id.charAt(0).toUpperCase() + params.id.slice(1)

	const isDesktop = useMediaQuery("(min-width: 1024px)")
	return (
		<>
			{!isDesktop && (
				<>
					<GoBack where="All Tags" />
					<h1 className="page-title tagged text-preset-1">
						Notes Tagged: <span>{capitalizeTag}</span>
					</h1>
				</>
			)}
			<NotesList searchedTag={params.id} />
		</>
	)
}
