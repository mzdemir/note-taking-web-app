import {NotesContext} from "../../App"
import {TagsIcon} from "./Icons"

import {Link} from "react-router"
import {useContext} from "react"

export default function TagList() {
	const notes = useContext(NotesContext)

	const tags = [...new Set(notes?.map((note) => note.tags).flat())]

	return (
		tags &&
		tags.sort().map((tag) => (
			<ul key={tag} className="tags-list text-preset-4">
				<li>
					<TagsIcon />
					<Link to={`/tags/${tag.toLowerCase()}`}>{tag}</Link>
				</li>
			</ul>
		))
	)
}
