import CreateNewNoteBtn from "../components/shared/CreateNewNoteBtn"
import TagList from "../components/shared/TagList"
import useMediaQuery from "../hooks/useMediaQuery"

export default function Tags() {
	const isDesktop = useMediaQuery("(min-width: 1024px)")

	return (
		<>
			{!isDesktop && <h1 className="page-title text-preset-1">Tags</h1>}
			<CreateNewNoteBtn />
			<TagList />
		</>
	)
}
