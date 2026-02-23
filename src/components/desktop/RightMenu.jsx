import {ArchivedIcon, DeleteIcon} from "../shared/Icons"
import Button from "../shared/Button"

export default function RightMenu({setModal}) {
	return (
		<aside className="right-bar-menu text-preset-4">
			<Button onClick={() => setModal({open: true, variant: "archive"})}>
				<ArchivedIcon /> Archive Note
			</Button>
			<Button onClick={() => setModal({open: true, variant: "delete"})}>
				<DeleteIcon />
				Delete Note
			</Button>
		</aside>
	)
}
