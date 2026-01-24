import NotesList from "../components/NotesList"

export default function AllNotes() {
	return (
		<>
			<div className="main-content">
				<h1 className="page-title text-preset-1">All Notes</h1>
				<aside className="navbar-allnotes">
					<NotesList page={"AllNotes"} />
				</aside>
			</div>
		</>
	)
}
