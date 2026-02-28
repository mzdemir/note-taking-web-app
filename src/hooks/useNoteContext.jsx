import {useContext} from "react"
import {NoteContext} from "../context/NoteContext"

export default function useNoteContext() {
	return useContext(NoteContext)
}
