import {createContext, useState, useEffect} from "react"

const FontThemeContext = createContext()

export function FontThemeProvider({children}) {
	const [fontTheme, setFontTheme] = useState(getInitatialTheme())

	function getInitatialTheme() {
		if (localStorage.getItem("fontTheme")) {
			return localStorage.getItem("fontTheme")
		} else {
			const defaultFontTheme = "sans-serif"
			return defaultFontTheme
		}
	}

	useEffect(() => {
		if (fontTheme === "sans-serif") {
			document.documentElement.setAttribute("data-fontTheme", "sans-serif")
			localStorage.setItem("fontTheme", "sans-serif")
		}
		if (fontTheme === "serif") {
			document.documentElement.setAttribute("data-fontTheme", "serif")
			localStorage.setItem("fontTheme", "serif")
		}

		if (fontTheme === "monospace") {
			document.documentElement.setAttribute("data-fontTheme", "monospace")
			localStorage.setItem("fontTheme", "monospace")
		}
	}, [fontTheme])

	return <FontThemeContext.Provider value={{fontTheme, setFontTheme}}>{children} </FontThemeContext.Provider>
}

export {FontThemeContext}
