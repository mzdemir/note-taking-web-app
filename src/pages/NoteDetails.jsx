import {TagsIcon, ClockIcon, StatusIcon} from "../components/shared/Icons"
import HeaderControl from "../components/mobile/HeaderControl"
import Button from "../components/shared/Button"
import useMediaQuery from "../hooks/useMediaQuery"

import {NotesContext} from "../App"
import {useParams} from "react-router"
import {useContext} from "react"
import RightMenu from "../components/desktop/RightMenu"

export default function NoteDetails() {
	const isDesktop = useMediaQuery()
	const notes = useContext(NotesContext)
	const params = useParams()

	const noteId = params.noteId || params.id
	const noteDetails = notes?.find((note) => note.id.toString() === noteId)

	if (!noteDetails) {
		return <></>
	}

	// prettier-ignore
	return (
		<>
			<div className="note-details">
				{!isDesktop && <HeaderControl />}
				{!isDesktop && <hr />}
				<h1 className="page-title text-preset-1">{noteDetails.title}</h1>
				<div className="note-props">
					<div className="tags">
						<h2><TagsIcon />Tags</h2>
						{noteDetails && (
							<ul>
								{noteDetails.tags.map((tag) => (
									<li key={tag}>{tag}</li>
								))}
							</ul>
						)}
					</div>

					{noteDetails.isArchived && (
						<div className="note-status">
							<h2><StatusIcon /> Status</h2>
							<p>Archived</p>
						</div>
					)}

					<div className="last-edited">
						<h2><ClockIcon />Last Edited
						</h2>
						<time className="last-edited" dateTime={noteDetails.lastEdited}>
							{new Date(noteDetails.lastEdited).toLocaleDateString("en-GB", {
								day: "2-digit",
								month: "short",
								year: "numeric",
							})}
						</time>
					</div>
				</div>
				<hr />
				<p style={{whiteSpace: "pre-line"}}>{noteDetails.content}</p>
				{isDesktop && (
					<>
						<hr />
						<div className="save-btns text-preset-4">
							<Button variant="primary" text="Save Note" />
							<Button text="Cancel" />
						</div>
					</>
				)}
			</div>
			{isDesktop && <RightMenu />}
		</>
	)
}
