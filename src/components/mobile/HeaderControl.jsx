import {DeleteIcon, ArchivedIcon} from "../shared/Icons"
import GoBack from "./GoBack"

export default function HeaderControl() {
	return (
		<header className="header-control">
			<GoBack where={"Go Back"} />
			<div className="control-btns text-preset-5">
				<button aria-label="Delete note">
					<DeleteIcon />
				</button>

				<button aria-label="Archive note">
					<ArchivedIcon />
				</button>

				<button>Cancel</button>
				<button className="save-note">Save Note</button>
			</div>
		</header>
	)
}
