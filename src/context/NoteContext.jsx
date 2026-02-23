import {createContext, useState, useEffect, useContext} from "react"
import supabase from "../supabase-client"

const NoteContext = createContext()

export function NoteProvider({children}) {
	const [notes, setNotes] = useState([])

	useEffect(() => {
		fetchNotes()
	}, [notes])

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

	return <NoteContext.Provider value={{notes, updateNoteInContext}}>{children}</NoteContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useNote() {
	return useContext(NoteContext)
}
