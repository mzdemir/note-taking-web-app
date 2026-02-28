import {SunIcon, MoonIcon, SystemIcon} from "../components/shared/Icons"
import GoBackLink from "../components/mobile/GoBackLink"

import useMediaQuery from "../hooks/useMediaQuery"
import {useContext} from "react"
import {ColorThemeContext} from "../context/ColorThemeContext"
import useToastContext from "../hooks/useToastContext"

export default function ColorTheme() {
	const isDesktop = useMediaQuery()
	const {colorTheme, setColorTheme} = useContext(ColorThemeContext)
	const {setShowToast} = useToastContext()

	function handleChange(formData) {
		const getColorTheme = formData.get("setting-option")
		setColorTheme(getColorTheme)
		setShowToast({
			isVisible: true,
			message: "Settings updated successfully!",
			link: null,
			navigateTo: null,
		})
	}

	return (
		<div className="settings-item">
			{!isDesktop && <GoBackLink where="Settings" />}
			<h1 className="setting-title text-preset-1">Color Theme</h1>
			<p className="page-desc text-preset-5">Chose your color theme:</p>

			<form action={handleChange} className="options text-preset-4">
				<label>
					<div className="icon-wrapper">
						<SunIcon />
					</div>
					<div className="setting-content">
						<h2>Light Mode</h2>
						<p className="setting-desc text-preset-6">Pick a clean and classic light theme</p>
					</div>
					<input type="radio" name="setting-option" value="light" defaultChecked={colorTheme === "light" && true} />
					<span className="custom-radio"></span>
				</label>
				<label>
					<div className="icon-wrapper">
						<MoonIcon />
					</div>
					<div className="setting-content">
						<h2>Dark Mode</h2>
						<p className="setting-desc text-preset-6">Select a sleek and modern dark theme</p>
					</div>
					<input type="radio" name="setting-option" value="dark" defaultChecked={colorTheme === "dark" && true} />
					<span className="custom-radio"></span>
				</label>
				<label>
					<div className="icon-wrapper">
						<SystemIcon />
					</div>
					<div className="setting-content">
						<h2>System</h2>
						<p className="setting-desc text-preset-6">Adapts to your device's theme</p>
					</div>
					<input type="radio" name="setting-option" value="system" defaultChecked={colorTheme === "system" && true} />
					<span className="custom-radio"></span>
				</label>
				<button className="primary-btn text-preset-4">Apply Changes</button>
			</form>
		</div>
	)
}
