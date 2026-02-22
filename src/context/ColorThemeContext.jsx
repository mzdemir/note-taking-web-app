import {createContext, useState, useEffect} from "react"

const ColorThemeContext = createContext()

export function ColorThemeProvider({children}) {
	const [colorTheme, setColorTheme] = useState(getInitatialTheme())

	function getInitatialTheme() {
		if (localStorage.getItem("colorTheme")) {
			return localStorage.getItem("colorTheme")
		} else {
			const OSTheme = window.matchMedia("(prefers-color-scheme: light)").matches && "system"
			return OSTheme
		}
	}

	useEffect(() => {
		const systemTheme = window.matchMedia("(prefers-color-scheme:light)").matches ? "light" : "dark"
		if (colorTheme === "light") {
			document.documentElement.setAttribute("data-colorTheme", "light")
			localStorage.setItem("colorTheme", "light")
		}
		if (colorTheme === "dark") {
			document.documentElement.setAttribute("data-colorTheme", "dark")
			localStorage.setItem("colorTheme", "dark")
		}

		if (colorTheme === "system") {
			document.documentElement.setAttribute("data-colorTheme", systemTheme)
			localStorage.setItem("colorTheme", "system")
		}
	}, [colorTheme])

	return <ColorThemeContext.Provider value={{colorTheme, setColorTheme}}>{children} </ColorThemeContext.Provider>
}

export {ColorThemeContext}
