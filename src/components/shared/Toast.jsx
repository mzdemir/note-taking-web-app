import {Link} from "react-router"
import {CheckIcon, CrossIcon, InfoIcon} from "./Icons"
import {useToast} from "../../context/ToastContext"
import {useState, useEffect} from "react"

export default function Toast() {
	const {showToast, setShowToast} = useToast()
	const [isHiding, setIsHiding] = useState(false)

	// auto-dismiss after 3s
	useEffect(() => {
		if (showToast.isVisible) {
			setIsHiding(false)
			const timer = setTimeout(() => handleClose(), 4000)
			return () => clearTimeout(timer)
		}
	}, [showToast.isVisible])

	function handleClose() {
		setIsHiding(true)
		// wait for slideOut animation to finish before unmounting
		setTimeout(() => {
			setShowToast((prev) => ({...prev, isVisible: false}))
			setIsHiding(false)
		}, 300) // matches animation duration
	}

	// prettier-ignore
	return (
		<div className={`toast text-preset-6 ${isHiding ? "hiding" : ""}`}>
			{showToast.variant === "error" ? <InfoIcon /> :	<CheckIcon />}
			<p>{showToast.message}</p>
			{showToast.link && <Link to={showToast.navigateTo}>{showToast.link}</Link>}
			<button onClick={handleClose}>
				<CrossIcon />
			</button>
		</div>
	)
}
