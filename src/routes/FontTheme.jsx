import {SansSerifIcon, SerifIcon, MonospaceIcon} from "../assets/images/Icons"
import GoBackLink from "../components/mobile/GoBackLink"

import useMediaQuery from "../hooks/useMediaQuery"
import {FontThemeContext} from "../context/FontThemeContext"
import useToastContext from "../hooks/useToastContext"
import {useContext} from "react"

export default function FontTheme() {
	const isDesktop = useMediaQuery()
	const {fontTheme, setFontTheme} = useContext(FontThemeContext)
	const {setShowToast} = useToastContext()

	function handleChange(formData) {
		const getFontTheme = formData.get("setting-option")
		setFontTheme(getFontTheme)
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
			<h1 className="setting-title text-preset-1">Font Theme</h1>
			<p className="page-desc text-preset-5">Chose your font theme</p>

			<form action={handleChange} className="options text-preset-4">
				<label>
					<div className="icon-wrapper">
						<SansSerifIcon />
					</div>
					<div className="setting-content">
						<h2>Sans-serif</h2>
						<p className="setting-desc text-preset-6">Clean and modern, easy to read.</p>
					</div>
					<input
						type="radio"
						name="setting-option"
						value="sans-serif"
						defaultChecked={fontTheme === "sans-serif" && true}
					/>
					<span className="custom-radio"></span>
				</label>
				<label>
					<div className="icon-wrapper">
						<SerifIcon />
					</div>
					<div className="setting-content">
						<h2>Serif</h2>
						<p className="setting-desc text-preset-6">Classic and elegant for a timeless feel.</p>
					</div>
					<input type="radio" name="setting-option" value="serif" defaultChecked={fontTheme === "serif" && true} />
					<span className="custom-radio"></span>
				</label>
				<label>
					<div className="icon-wrapper">
						<MonospaceIcon />
					</div>
					<div className="setting-content">
						<h2>Monospace</h2>
						<p className="setting-desc text-preset-6">Code-like, great for a technical vibe.</p>
					</div>
					<input
						type="radio"
						name="setting-option"
						value="monospace"
						defaultChecked={fontTheme === "monospace" && true}
					/>
					<span className="custom-radio"></span>
				</label>
				<button className="primary-btn text-preset-4">Apply Changes</button>
			</form>
		</div>
	)
}
