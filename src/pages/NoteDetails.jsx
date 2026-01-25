import {useState, useEffect} from "react"
import {useParams} from "react-router"

import {TagsIcon, ClockIcon} from "../components/Icons"

import HeaderControl from "../components/HeaderControl"

export default function NoteDetails() {
	const params = useParams()
	const [note, setNote] = useState("")
	console.log(note)

	useEffect(() => {
		fetch(`/api/notes/${params.id}`)
			.then((res) => res.json())
			.then((data) => setNote(data.notes))
	}, [params.id])

	// prettier-ignore
	return (
		<>
			<div className="main-content">
				<HeaderControl />
				<h1 className="page-title text-preset-1">{note.title}</h1>
				<div className="tags">
					<h2><TagsIcon />Tags</h2>
					{note && 
					<ul >{note.tags.map(tag => 
						<li key={tag}>{tag}</li>)}
					</ul>}
				</div>

				<div className="last-edited">
					<h2><ClockIcon/>Last Edited</h2>
					<time className="last-edited" dateTime={note.lastEdited}>
						{new Date(note.lastEdited).toLocaleDateString("en-GB", {day: "2-digit", month: "short", year: "numeric"})}
					</time>
				</div>
				
				<p style={{ whiteSpace: "pre-line" }}>
  				{note.content}	
				</p>
			</div>
		</>
	)
}
