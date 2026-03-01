import {DeleteIcon, ArchivedIcon} from "../../assets/images/Icons"
import useDeleteNote from "../../hooks/crud/useDeleteNote"
import useArchiveNote from "../../hooks/crud/useArchiveNote"

export default function Modal({noteId, variant, setModal}) {
	const {deleteNote} = useDeleteNote()
	const {archiveNote} = useArchiveNote()

	const ModalIcon =
		variant === "delete" ? <DeleteIcon />
		: variant === "archive" ? <ArchivedIcon />
		: null

	const modalTitle =
		variant === "delete" ? "Delete Note"
		: variant === "archive" ? "Archive Note"
		: null

	// prettier-ignore
	const modalMessage =
		variant === "delete" ? 
      "Are you sure you want to permanently delete this note? This action cannot be undone."
		: variant === "archive" ?
			"Are you sure you want to archive this note? You can find it in the Archived Notes section and restore it anytime."
		:	null

	function handleModal() {
		if (variant === "delete") deleteNote(noteId)
		if (variant === "archive") archiveNote(noteId)

		setModal((prev) => ({...prev, open: false}))
	}

	return (
		<div className="modal" role="alertdialog" aria-labelledby="modal-title" aria-modal="true">
			<div className="top">
				<div className="icon-wrapper">{ModalIcon}</div>
				<div className="content">
					<h2 id="modal-title" className="text-preset-3">
						{modalTitle}
					</h2>
					<p className="text-preset-5">{modalMessage}</p>
				</div>
			</div>
			<div className="bottom text-preset-4">
				<button className="secondary-btn" onClick={() => setModal((prev) => ({...prev, open: false}))}>
					Cancel
				</button>
				<button className={`${variant} primary-btn`} onClick={handleModal}>
					{modalTitle}
				</button>
			</div>
		</div>
	)
}
