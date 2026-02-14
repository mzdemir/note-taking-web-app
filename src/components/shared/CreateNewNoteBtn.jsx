import {PlusIcon} from "./Icons"

import useMediaQuery from "../../hooks/useMediaQuery"

import {useNavigate} from "react-router"

export default function CreateNewNoteBtn() {
	const isDesktop = useMediaQuery("(min-width: 1024px)")
	const navigate = useNavigate()

	function createNote() {
		navigate("/new-note")
	}

	// prettier-ignore
	return (
		<button className="new-note-btn text-preset-4" onClick={createNote}>
			{!isDesktop ? <PlusIcon /> :	"+ Create New Note"}
		</button>
	)
}
