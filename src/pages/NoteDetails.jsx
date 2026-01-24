import {useState, useEffect} from "react"
import {useParams} from "react-router"

export default function NoteDetails() {
	const params = useParams()
	const [allNotes, setAllNotes] = useState([])

	useEffect(() => {
		fetch(`/api/notes/${params.id}`)
			.then((res) => res.json())
			.then((data) => setAllNotes(data.notes))
	}, [params.id])

	return <h1>Note Details</h1>
}
