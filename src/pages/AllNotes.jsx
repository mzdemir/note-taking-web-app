import NotesList from "../components/shared/NoteList"

export default function AllNotes() {
	return (
		<>
			<div className="main-content">
				<h1 className="page-title text-preset-1">All Notes</h1>

				<NotesList page={"AllNotes"} />
			</div>
		</>
	)
}
