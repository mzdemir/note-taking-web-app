import {useState, useEffect} from "react"
import supabase from "../../supabase-client"

export default function useFetchNotes() {
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

	return {notes}
}
