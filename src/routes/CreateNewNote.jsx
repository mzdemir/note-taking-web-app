import HeaderControl from "../components/mobile/HeaderControl"
import {TagsIcon, ClockIcon} from "../components/shared/Icons"

import useMediaQuery from "../hooks/useMediaQuery"
import {useState} from "react"

export default function CreateNewNote() {
	const isDesktop = useMediaQuery()
	const [note, setNote] = useState({title: "", tags: "", content: ""})

	return (
		<div className="note-details">
			{!isDesktop && <HeaderControl note={note} />}
			{!isDesktop && <hr />}

			<form className="note-details">
				<label aria-label="Enter a title...">
					<input
						className="text-preset-1"
						type="text"
						name="title"
						onChange={(event) => {
							const title = event.target.value
							setNote((prev) => ({...prev, title: title}))
						}}
						placeholder="Enter a title..."
					/>
				</label>

				<div className="note-props">
					<label className="tags" aria-label="Add tags separated by commas (e.g. Work, Planning)">
						<h2>
							<TagsIcon />
							<p>Tags</p>
						</h2>
						<input
							type="text"
							name="tags"
							onChange={(event) => {
								const tags = event.target.value
								setNote((prev) => ({...prev, tags: tags}))
							}}
							placeholder="Add tags separated by commas (e.g. Work, Planning)"
						/>
					</label>
					<div className="tags" aria-label="Last edited not yet saved">
						<h2>
							<ClockIcon />
							<p>Last edited</p>
						</h2>
						<p>Not yet saved</p>
					</div>
				</div>
				<hr />
				<label aria-label="Start typing your note here…">
					<input
						type="text"
						name="content"
						onChange={(event) => {
							const content = event.target.value
							setNote((prev) => ({...prev, content: content}))
						}}
						placeholder="Start typing your note here…"
					/>
				</label>
			</form>
		</div>
	)
}
