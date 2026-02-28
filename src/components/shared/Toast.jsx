import {Link} from "react-router"
import {CheckIcon, CrossIcon, InfoIcon} from "./Icons"
import useToastContext from "../../hooks/useToastContext"
import {useState, useEffect, useCallback} from "react"

export default function Toast() {
	const {showToast, setShowToast} = useToastContext()
	const [isHiding, setIsHiding] = useState(false)

	const handleClose = useCallback(() => {
		setIsHiding(true)
		// wait for slideOut animation to finish before unmounting
		setTimeout(() => {
			setShowToast((prev) => ({...prev, isVisible: false}))
			setIsHiding(false)
		}, 300) // matches animation duration
	}, [setShowToast])

	// auto-dismiss after 3s
	useEffect(() => {
		if (showToast.isVisible) {
			setTimeout(() => setIsHiding(false), 0)
			const timer = setTimeout(() => handleClose(), 4000)
			return () => clearTimeout(timer)
		}
	}, [showToast.isVisible, handleClose])

	// prettier-ignore
	return (
		<div className={`toast text-preset-6 ${isHiding ? "hiding" : ""}`} role="status" aria-live="polite" aria-atomic="true">
			{showToast.variant === "error" ? <InfoIcon /> :	<CheckIcon />}
			<p>{showToast.message}</p>
			{showToast.link && <Link to={showToast.navigateTo}>{showToast.link}</Link>}
			<button onClick={handleClose} aria-label="Close notification">
				<CrossIcon />
			</button>
		</div>
	)
}
