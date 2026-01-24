import NotesList from "../components/NotesList"

export default function Tags() {
	return (
		<div className="main-content">
			<h1 className="page-title text-preset-1">Tags</h1>
			<aside className="navbar-allnotes">
				<NotesList page={"Tags"} />
			</aside>
		</div>
	)
}
