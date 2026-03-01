import {DeleteIcon, ArchivedIcon} from "../../assets/images/Icons"
import GoBackLink from "./GoBackLink"

export default function HeaderControl({setModal, isPending, handleCancel}) {
	return (
		<header className="header-controls text-preset-5">
			<GoBackLink where={"Go Back"} />
			<div className="control-btns">
				<button
					onClick={() => setModal({open: true, variant: "delete"})}
					disabled={isPending}
					aria-label="Delete note"
					aria-busy={isPending}>
					<DeleteIcon />
				</button>

				<button
					onClick={() => setModal({open: true, variant: "archive"})}
					aria-label="Archive note"
					disabled={isPending}
					aria-busy={isPending}>
					<ArchivedIcon />
				</button>

				<button disabled={isPending} aria-busy={isPending} onClick={handleCancel}>
					Cancel
				</button>
				<button className="save-btn" type="submit" form="note-form" disabled={isPending} aria-busy={isPending}>
					Save Note
				</button>
			</div>
		</header>
	)
}
