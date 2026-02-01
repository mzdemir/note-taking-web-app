import {NotesContext} from "../../App"
import {TagsIcon} from "./Icons"

import {Link} from "react-router"
import {useContext, Fragment} from "react"

export default function TagList() {
	const notes = useContext(NotesContext)

	const tags = [...new Set(notes?.map((note) => note.tags).flat())]

	return (
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
	)
}
