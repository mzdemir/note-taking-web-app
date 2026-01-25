import {DeleteIcon, ArchivedIcon} from "./Icons"
import GoBack from "./GoBack"

export default function HeaderControl() {
	return (
		<header className="header-control">
			<GoBack where={"Go Back"} />
			<div className="control-btns">
				<button aria-label="Delete note">
					<DeleteIcon />
				</button>

				<button aria-label="Archive note">
					<ArchivedIcon />
				</button>

				<button>Cancel</button>
				<button>Save Note</button>
			</div>
		</header>
	)
}
