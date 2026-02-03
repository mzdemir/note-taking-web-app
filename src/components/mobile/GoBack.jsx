import {ArrowLeftIcon} from "../shared/Icons"

import {Link, useSearchParams} from "react-router"

export default function GoBack({where}) {
	const [searchParams] = useSearchParams()

	return (
		<Link to={{pathname: "..", search: searchParams.toString()}} relative="path" className="go-back">
			<ArrowLeftIcon />
			{where}
		</Link>
	)
}
