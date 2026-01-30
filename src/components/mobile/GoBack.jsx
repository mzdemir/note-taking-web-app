import {Link} from "react-router"
import {ArrowLeftIcon} from "../shared/Icons"

export default function GoBack({where}) {
	return (
		<Link to=".." relative="path" className="go-back">
			<ArrowLeftIcon />
			{where}
		</Link>
	)
}
