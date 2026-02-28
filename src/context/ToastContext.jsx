import {createContext, useState} from "react"

const ToastContext = createContext()

export function ToastProvider({children}) {
	const [showToast, setShowToast] = useState({isVisible: false, variant: "", message: "", link: "", navigateTo: ""})

	return <ToastContext.Provider value={{showToast, setShowToast}}>{children}</ToastContext.Provider>
}

export {ToastContext}
