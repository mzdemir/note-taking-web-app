import {TagsIcon, PlusIcon} from "../assets/images/Icons"

import useMediaQuery from "../hooks/useMediaQuery"
import useNoteContext from "../hooks/useNoteContext"

import {Fragment} from "react"
import {NavLink, useNavigate} from "react-router"

export default function Tags() {
	const isDesktop = useMediaQuery()
	const {notes, isLoading} = useNoteContext()
	const navigate = useNavigate()

	const tags = [...new Set(notes?.map((note) => note.tags).flat())]
	const emptyState = "You don’t have any notes yet. Start a new note to capture your thoughts and ideas."

	if (isLoading) return <p className="empty-state text-preset-5">Loading</p>
	return (
		<>
			{!isDesktop && (
				<>
					<h1 className="text-preset-1">Tags</h1>
					<button className="new-note-btn text-preset-4" onClick={() => navigate("/new-note")}>
						{!isDesktop ?
							<PlusIcon />
						:	"+ Create New Note"}
					</button>
				</>
			)}
			<div className="tags-list text-preset-4">
				{tags && tags.length > 0 ?
					tags.sort().map((tag) => (
						<Fragment key={tag}>
							<NavLink to={`/tags/${tag.toLowerCase()}`} className="tag-link">
								<TagsIcon /> {tag}
							</NavLink>
							<hr />
						</Fragment>
					))
				:	<p className="text-preset-5 empty-state">{emptyState}</p>}
			</div>
		</>
	)
}
