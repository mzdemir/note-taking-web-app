import Button from "../components/shared/Button"
import {TagsIcon, PlusIcon} from "../components/shared/Icons"

import useMediaQuery from "../hooks/useMediaQuery"
import {NoteContext} from "../context/NoteContext"

import {useContext} from "react"
import {Fragment} from "react"
import {NavLink, useNavigate} from "react-router"

export default function Tags() {
	const isDesktop = useMediaQuery()
	const {notes} = useContext(NoteContext)
	const navigate = useNavigate()

	const tags = [...new Set(notes?.map((note) => note.tags).flat())]

	if (!tags || tags.length < 1) return <></>

	//prettier-ignore
	return (
		<>
			{!isDesktop && (
				<>
					<h1 className="text-preset-1">Tags</h1>
					<Button className="new-note-btn text-preset-4" onClick={() => navigate("/new-note")}>
						{!isDesktop ?
							<PlusIcon />
						:	"+ Create New Note"}
					</Button>
				</>
			)}
			<div className="tags-list text-preset-4">
				{tags && tags.sort().map((tag) => (
					<Fragment key={tag}>
						<NavLink to={`/tags/${tag.toLowerCase()}`} className="tag-link">
							<TagsIcon /> {tag}
						</NavLink>
						<hr />
					</Fragment>
				))}
			</div>
		</>
	)
}
