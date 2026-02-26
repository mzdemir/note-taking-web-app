import {DeleteIcon, ArchivedIcon} from "../shared/Icons"
import GoBackLink from "./GoBackLink"
import Button from "../shared/Button"

import useMediaQuery from "../../hooks/useMediaQuery"

export default function HeaderControl({setModal, isPending}) {
	const isDesktop = useMediaQuery()

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
					disabled={isPending}
					aria-label="Archive note"
					aria-busy={isPending}>
					<ArchivedIcon />
				</button>

				<button>Cancel</button>
				<Button className={!isDesktop ? "save-btn" : "primary-btn"} type="submit">
					Save Note
				</Button>
			</div>
		</header>
	)
}
