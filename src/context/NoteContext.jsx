import supabase from "../supabase-client"

import {useToast} from ".//ToastContext"
import {createContext, useState, useEffect, useContext} from "react"
import {useLocation} from "react-router"

const NoteContext = createContext()

export function NoteProvider({children}) {
	const [notes, setNotes] = useState([])
	const location = useLocation()
	const {setShowToast} = useToast()

	useEffect(() => {
		fetchNotes()
	}, [location.pathname])

	async function fetchNotes() {
		try {
			const {data, error} = await supabase
				.from("notes")
				.select(
					`*,
	 			  ...note_tags(
	    		  ...tags(
	      		  tags:name
	    		  )
	  		  )`,
				)
				.order("lastEdited", {ascending: false})
			if (error) throw error
			setNotes(data)
		} catch (error) {
			console.error("Error fetching data:", error)
			setShowToast({
				isVisible: true,
				variant: "error",
				message: "Something went wrong. Please try again.",
				link: null,
				navigateTo: null,
			})
		}
	}

	// prettier-ignore
	function updateNoteInContext(noteId, updates) {
		setNotes(prev => prev.map(note => 
			note.id === noteId 
				? {...note, ...updates}  
				: note                   
		))
	}

	function deleteNoteFromContext(noteId) {
		setNotes((prev) => prev.filter((note) => note.id !== noteId))
	}

	return (
		<NoteContext.Provider value={{notes, updateNoteInContext, deleteNoteFromContext}}>{children}</NoteContext.Provider>
	)
}

// eslint-disable-next-line react-refresh/only-export-components
export function useNote() {
	return useContext(NoteContext)
}
