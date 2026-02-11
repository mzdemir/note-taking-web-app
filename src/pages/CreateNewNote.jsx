import HeaderControl from "../components/mobile/HeaderControl"
import {TagsIcon, ClockIcon} from "../components/shared/Icons"

import useMediaQuery from "../hooks/useMediaQuery"

export default function CreateNewNote() {
	const isDesktop = useMediaQuery()

	return (
		<div className="note-details">
			{!isDesktop && <HeaderControl />}
			{!isDesktop && <hr />}
			<form action="">
				<label aria-label="Enter a title...">
					<input type="text" name="title" placeholder="Enter a title..." />
				</label>
				<div>
					<label className="tags" aria-label="Add tags separated by commas (e.g. Work, Planning)">
						<h2>
							<TagsIcon />
							<p>Tags</p>
						</h2>
						<input type="text" name="tags" placeholder="Add tags separated by commas (e.g. Work, Planning)" />
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
					<input type="text" name="content" placeholder="Start typing your note here…" />
				</label>
			</form>
		</div>
	)
}
