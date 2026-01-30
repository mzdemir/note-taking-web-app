import NotesList from "../components/shared/NoteList"

export default function Archived() {
	return (
		<>
			<div className="main-content">
				<h1 className="page-title text-preset-1">Archived Notes</h1>
				<p className="text-preset-5">
					All your archived notes are stored here. You can restore or delete them anytime.
				</p>
				<NotesList />
			</div>
		</>
	)
}
