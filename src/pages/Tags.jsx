import CreateNewNoteBtn from "../components/shared/CreateNewNoteBtn"
import useMediaQuery from "../hooks/useMediaQuery"

import {TagsIcon} from "../components/shared/Icons"
import {NotesContext} from "../App"
import {useContext, Fragment} from "react"
import {Link} from "react-router"

export default function Tags() {
	const isDesktop = useMediaQuery()
	const notes = useContext(NotesContext)

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
								<Link to={`/tags/${tag.toLowerCase()}`}>
									<TagsIcon /> {tag}
								</Link>
							</li>
							<hr />
						</Fragment>
					))}
			</ul>
		</>
	)
}
