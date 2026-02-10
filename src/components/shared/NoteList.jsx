import CreateNewNoteBtn from "../shared/CreateNewNoteBtn"

import {Fragment} from "react"
import {NavLink, Outlet, useSearchParams} from "react-router"

export default function NotesList({notes, pageDesc, getLinkPath}) {
	const [searchParams] = useSearchParams()

	if (!notes) return <></>

	return (
		<>
			<div className="note-list">
				<CreateNewNoteBtn />
				{pageDesc && pageDesc}
				{notes.length > 0 ?
					notes.map((note) => (
						<Fragment key={note.id}>
							<NavLink
								to={{
									pathname: getLinkPath(note.id),
									search: searchParams.toString(),
								}}
								className="text-preset-6">
								<h2 className="note-title text-preset-3">{note.title}</h2>
								<div className="note-tags">
									{note?.tags.map((tag) => (
										<span key={tag}>{tag}</span>
									))}
								</div>
								<time className="last-edited" dateTime={note.lastEdited}>
									{new Date(note.lastEdited).toLocaleDateString("en-GB", {
										day: "2-digit",
										month: "short",
										year: "numeric",
									})}
								</time>
							</NavLink>
							<hr />
						</Fragment>
					))
				:	<p className="text-preset-5">No notes match your search. Try a different keyword or create a new note.</p>}
			</div>
			<Outlet />
		</>
	)
}
