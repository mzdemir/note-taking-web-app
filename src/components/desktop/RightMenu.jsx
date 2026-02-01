import {ArchivedIcon, DeleteIcon} from "../shared/Icons"

export default function RightMenu() {
	return (
		<aside className="right-bar-menu">
			<button className="text-preset-4">
				<ArchivedIcon /> Archive Note
			</button>
			<button className="text-preset-4">
				<DeleteIcon />
				Delete Note
			</button>
		</aside>
	)
}
