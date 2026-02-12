import CreateNewNoteBtn from "../components/shared/CreateNewNoteBtn"
import {TagsIcon} from "../components/shared/Icons"

import useMediaQuery from "../hooks/useMediaQuery"
import {useNotes} from "../context/NoteContext"

import {Fragment} from "react"
import {NavLink} from "react-router"
export default function Tags() {
	const isDesktop = useMediaQuery()
	const notes = useNotes()

	const tags = [...new Set(notes?.map((note) => note.tags).flat())]

	return (
		<>
			{!isDesktop && (
				<>
					<h1 className="page-title text-preset-1">Tags</h1>
					<CreateNewNoteBtn />
				</>
			)}
			<ul className="tags-list text-preset-4">
				{tags &&
					tags.sort().map((tag) => (
						<Fragment key={tag}>
							<li>
								<NavLink to={`/tags/${tag.toLowerCase()}`}>
									<TagsIcon /> {tag}
								</NavLink>
							</li>
							<hr />
						</Fragment>
					))}
			</ul>
		</>
	)
}
