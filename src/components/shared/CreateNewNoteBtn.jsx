import {PlusIcon} from "./Icons"

import useMediaQuery from "../../hooks/useMediaQuery"

export default function CreateNewNoteBtn() {
	const isDesktop = useMediaQuery("(min-width: 1024px)")

	function createNote() {}

	// prettier-ignore
	return (
		<button className="new-note-btn text-preset-4" onClick={createNote}>
			{!isDesktop ? <PlusIcon /> :	"+ Create New Note"}
		</button>
	)
}
