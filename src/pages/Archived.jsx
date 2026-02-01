import NotesList from "../components/shared/NoteList"
import useMediaQuery from "../hooks/useMediaQuery"

export default function Archived() {
	const isDesktop = useMediaQuery("(min-width: 1024px)")

	return (
		<>
			{!isDesktop && <h1 className="page-title text-preset-1">Archived Notes</h1>}
			<NotesList />
		</>
	)
}
