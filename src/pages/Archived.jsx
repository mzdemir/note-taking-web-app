import NotesList from "../components/NotesList"

export default function Archived() {
	return (
		<>
			<div className="main-content">
				<h1 className="page-title text-preset-1">Archived Notes</h1>
				<p>All your archived notes are stored here. You can restore or delete them anytime.</p>
				<aside className="navbar-allnotes">
					<NotesList page={"Archived"} />
				</aside>
			</div>
		</>
	)
}
