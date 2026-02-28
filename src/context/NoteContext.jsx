import supabase from "../supabase-client"

import useToastContext from "../hooks/useToastContext"
import {createContext, useState, useEffect, useCallback} from "react"

const NoteContext = createContext()

export function NoteProvider({children}) {
	const [notes, setNotes] = useState([])
	const {setShowToast} = useToastContext()
	const [isLoading, setIsLoading] = useState(true)

	const fetchNotes = useCallback(async () => {
		setIsLoading(true)
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
		} finally {
			setIsLoading(false)
		}
	}, [setShowToast])

	useEffect(() => {
		fetchNotes()
	}, [fetchNotes])

	function addNoteToContext(note) {
		setNotes((prev) => [note, ...prev])
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

	// prettier-ignore
	return (
		<NoteContext.Provider 
			value={{notes, isLoading, addNoteToContext, updateNoteInContext, deleteNoteFromContext}}>
			{children}
		</NoteContext.Provider>
	)
}

export {NoteContext}
