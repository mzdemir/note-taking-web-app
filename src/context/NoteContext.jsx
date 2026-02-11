import {createContext, useState, useEffect, useContext} from "react"
import supabase from "../supabase-client.js"

const NotesContext = createContext()

export function NoteContextProvider({children}) {
	const [notes, setNotes] = useState([])

	useEffect(() => {
		async function fetchNotes() {
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
			if (error) {
				console.error("Error fetching data:", error)
				return
			}
			setNotes(data)
		}
		fetchNotes()
	}, [])

	// prettier-ignore
	return (
    <NotesContext.Provider value={notes}>
      {children}
    </NotesContext.Provider> 
  )
}

export function useNotes() {
	return useContext(NotesContext)
}
