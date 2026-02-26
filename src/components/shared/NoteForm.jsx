import {TagsIcon, StatusIcon, ClockIcon} from "./Icons"
import Textarea from "./Textarea"

export default function NoteForm({action, noteDetails}) {
	// prettier-ignore
	return (
		<form action={action} id="note-form" className="note-details text-preset-5" noValidate>
			<input type="hidden" name="noteId" value={noteDetails?.id} />
			<label aria-label="Enter a title...">
				<Textarea name="title" className="text-preset-1" value={noteDetails?.title} placeholder="Enter a title..."/>
			</label>

			<div className="note-props ">
				<div className="prop">
					<label htmlFor="tags" aria-label="Add tags separated by commas (e.g. Work, Planning)">
						<TagsIcon name/> Tags
					</label>
						<Textarea name="tags" value={noteDetails?.tags} placeholder="Add tags separated by commas (e.g. Work, Planning)"/>
				</div>

				{noteDetails?.isArchived &&
					<div className="prop">
						<h2><StatusIcon/>Status</h2>
						<p>Archived</p>
					</div>}

				<div className="prop" aria-label="Last edited not yet saved">
					<h2><ClockIcon />Last edited</h2>
					{noteDetails ?
						<time dateTime={noteDetails.lastEdited}>
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
				<Textarea name="content" value={noteDetails?.content} placeholder="Start typing your note here…"/>
			</label>
		</form>
	)
}
