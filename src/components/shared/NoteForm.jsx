import {TagsIcon, StatusIcon, ClockIcon} from "./Icons"
import {useEffect, useRef} from "react"

export default function NoteForm({action, noteDetails}) {
	const tagsRef = useRef(null)

	useEffect(() => {
		if (tagsRef.current) {
			tagsRef.current.style.height = "1lh"
			tagsRef.current.style.height = tagsRef.current.scrollHeight + "px"
		}
	}, [noteDetails?.tags])

	return (
		<form action={action} id="note-form" className="note-details">
			<input type="hidden" name="noteId" value={noteDetails?.id} />
			<label aria-label="Enter a title...">
				<input
					type="text"
					name="title"
					className="text-preset-1"
					defaultValue={noteDetails?.title}
					required
					placeholder="Enter a title..."
				/>
			</label>

			<div className="note-props text-preset-5">
				<div className="prop">
					<label htmlFor="tags" aria-label="Add tags separated by commas (e.g. Work, Planning)">
						<TagsIcon /> Tags
					</label>
					<textarea
						ref={tagsRef}
						name="tags"
						rows={1}
						id="tags"
						defaultValue={noteDetails?.tags}
						required
						placeholder="Add tags separated by commas (e.g. Work, Planning)"
						onInput={(event) => {
							event.target.style.height = "1lh"
							event.target.style.height = event.target.scrollHeight + "px"
						}}></textarea>
				</div>

				{noteDetails?.isArchived &&
					// prettier-ignore
					<div className="prop">
						<h2><StatusIcon/>Status</h2>
						<p>Archived</p>
					</div>}

				{/* prettier-ignore */}
				<div className="prop" aria-label="Last edited not yet saved">
					<h2><ClockIcon />Last edited</h2>
					{noteDetails ?
						<time className="last-edited" dateTime={noteDetails.lastEdited}>
							{new Date(noteDetails.lastEdited).toLocaleDateString("en-GB", {
								day: "2-digit",
								month: "short",
								year: "numeric",
							})}
						</time>
					:	<p>Not yet saved</p>}
				</div>
			</div>

			<hr />

			<label className="note-content" aria-label="Start typing your note here…">
				<textarea
					name="content"
					defaultValue={noteDetails?.content}
					required
					placeholder="Start typing your note here…"></textarea>
			</label>
		</form>
	)
}
