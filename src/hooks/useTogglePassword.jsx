import {useState} from "react"

export default function useTogglePassword() {
	const [showPassword, setShowPassword] = useState({old: false, new: false, confirm: false})

	function handleShowPassword(field) {
		setShowPassword((prev) => ({...prev, [field]: !prev[field]}))
	}

	return {showPassword, handleShowPassword}
}
