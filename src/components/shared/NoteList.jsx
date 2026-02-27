import {PlusIcon} from "./Icons"

import useMediaQuery from "../../hooks/useMediaQuery"

import {Fragment} from "react"
import {NavLink, Outlet, useSearchParams, useNavigate} from "react-router"

export default function NotesList({notes, pageDesc, getLinkPath, emptyState}) {
	const isDesktop = useMediaQuery()
	const [searchParams] = useSearchParams()
	const navigate = useNavigate()

	if (!notes) return <></>

	return (
		<>
			<div className="note-list">
				<button className="new-note-btn text-preset-4" onClick={() => navigate("/new-note")}>
					{!isDesktop ?
						<PlusIcon />
					:	"+ Create New Note"}
				</button>

				{pageDesc ?
					<p className="page-desc text-preset-5">{pageDesc}</p>
				:	null}
				{notes.length > 0 ?
					notes.map((note) => (
						<Fragment key={note.id}>
							<NavLink
								to={{
									pathname: getLinkPath(note.id),
									search: searchParams.toString(),
								}}
								className="note-link text-preset-6">
								<h2 className="text-preset-3">{note.title}</h2>
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
				:	<p className="text-preset-5 empty-state">{emptyState}</p>}
			</div>
			<Outlet />
		</>
	)
}
