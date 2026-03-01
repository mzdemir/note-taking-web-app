import {ArrowLeftIcon} from "../../assets/images/Icons"

import {Link, useSearchParams} from "react-router"

export default function GoBackLink({where}) {
	const [searchParams] = useSearchParams()

	return (
		<Link to={{pathname: "..", search: searchParams.toString()}} relative="path" className="go-back-link text-preset-4">
			<ArrowLeftIcon />
			{where}
		</Link>
	)
}
