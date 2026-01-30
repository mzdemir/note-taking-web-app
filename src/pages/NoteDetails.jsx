import {TagsIcon, ClockIcon, StatusIcon} from "../components/shared/Icons"
import HeaderControl from "../components/mobile/HeaderControl"

import {NotesContext} from "../App"
import {useParams} from "react-router"
import {useContext} from "react"

export default function NoteDetails() {
	const params = useParams()
	const notes = useContext(NotesContext)

	const noteDetails = notes && notes?.find((note) => note.id === params.id)

	if (!noteDetails) {
		return <></>
	}

	console.log(noteDetails)
	// prettier-ignore
	return (
		<>
			<div className="main-content">
				<HeaderControl/>
				<h1 className="page-title text-preset-1">{noteDetails.title}</h1>
				<div className="note-props">
					<div className="tags">
						<h2><TagsIcon />Tags</h2>
						{noteDetails && 
						<ul >{noteDetails.tags.map(tag => 
							<li key={tag}>{tag}</li>)}
						</ul>}
					</div>
					
				{noteDetails.isArchived && 
				<div className="note-status">
						<h2><StatusIcon/> Status</h2>
						<p>Archived</p>
				</div>}
				

					<div className="last-edited">
						<h2><ClockIcon/>Last Edited</h2>
						<time className="last-edited" dateTime={noteDetails.lastEdited}>
							{new Date(noteDetails.lastEdited).toLocaleDateString("en-GB", {day: "2-digit", month: "short", year: "numeric"})}
						</time>
					</div>
				</div>
				
				<p style={{ whiteSpace: "pre-line" }}>
					{noteDetails.content}	
				</p>
			</div>
		</>
	)
}
