import {DeleteIcon, ArchivedIcon} from "../shared/Icons"
import GoBackLink from "./GoBackLink"
import Button from "../shared/Button"

import useMediaQuery from "../../hooks/useMediaQuery"

export default function HeaderControl({setModal}) {
	const isDesktop = useMediaQuery()

	return (
		<header className="header-controls text-preset-5">
			<GoBackLink where={"Go Back"} />
			<div className="control-btns">
				<Button aria-label="Delete note" onClick={() => setModal({open: true, variant: "delete"})}>
					<DeleteIcon />
				</Button>

				<Button aria-label="Archive note" onClick={() => setModal({open: true, variant: "archive"})}>
					<ArchivedIcon />
				</Button>

				<button>Cancel</button>
				<Button className={!isDesktop ? "save-btn" : "primary-btn"} type="submit">
					Save Note
				</Button>
			</div>
		</header>
	)
}
