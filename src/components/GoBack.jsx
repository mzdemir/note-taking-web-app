import {Link} from "react-router"
import {ArrowLeftIcon} from "./Icons"

export default function GoBack({where}) {
	return (
		<Link to=".." path="relative">
			<ArrowLeftIcon />
			{where}
		</Link>
	)
}
