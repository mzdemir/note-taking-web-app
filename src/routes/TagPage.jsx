import NotesList from "../components/shared/NoteList"
import GoBackLink from "../components/mobile/GoBackLink"
import useMediaQuery from "../hooks/useMediaQuery"

import {NoteContext} from "../context/NoteContext"

import {useContext} from "react"
import {useParams} from "react-router"

export default function TagPage() {
	const isDesktop = useMediaQuery()
	const {notes} = useContext(NoteContext)
	const params = useParams()

	const capitalizeTag = params.id?.charAt(0).toUpperCase() + params.id.slice(1)
	console.log(capitalizeTag)

	const filteredNotes = notes?.filter((note) => {
		return note.tags.map((tag) => tag.toLowerCase()).includes(params.id)
	})

	const pageDesc = `All notes with the "${capitalizeTag}" tag are shown here.`
	const getLinkPath = (noteId) => `/tags/${params.id}/${noteId}`

	if (!filteredNotes) return <></>

	return (
		<>
			{!isDesktop && (
				<>
					<GoBackLink where="All Tags" />
					<h1 className="tagged text-preset-1">
						Notes Tagged: <span>{capitalizeTag}</span>
					</h1>
				</>
			)}
			<NotesList notes={filteredNotes} pageDesc={pageDesc} getLinkPath={getLinkPath} />
		</>
	)
}
