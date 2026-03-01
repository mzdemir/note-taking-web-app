import {ArchivedIcon, DeleteIcon} from "../../assets/images/Icons"

export default function RightMenu({setModal}) {
	return (
		<aside className="right-bar-menu text-preset-4">
			<button onClick={() => setModal({open: true, variant: "archive"})}>
				<ArchivedIcon /> Archive Note
			</button>
			<button onClick={() => setModal({open: true, variant: "delete"})}>
				<DeleteIcon />
				Delete Note
			</button>
		</aside>
	)
}
