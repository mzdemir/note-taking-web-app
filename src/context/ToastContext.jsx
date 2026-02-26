import {createContext, useContext, useState} from "react"

const ToastContext = createContext()

export function ToastProvider({children}) {
	const [showToast, setShowToast] = useState({isVisible: false, variant: "", message: "", link: "", navigaveTo: ""})

	return <ToastContext.Provider value={{showToast, setShowToast}}>{children}</ToastContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useToast() {
	return useContext(ToastContext)
}
