import {SunIcon, MoonIcon, SystemIcon} from "../components/Icons"

export default function SettingsMenuItem({page}) {
	// prettier-ignore
	const pageTitle =
		page === "color-theme" ? "Color Theme" : 
		page === "font-theme" ? "Font Theme" : ""

	// prettier-ignore
	const options = 
		page === "color-theme" ? ["Light Mode", "Dark Mode", "System" ]: 
		page === "font-theme" ? ["Sans-serif", "Serif", "Monospace" ]:  ""

	// prettier-ignore
	const optionsText = 
		page === "color-theme" ? 
			["Pick a clean and classic light theme", "Select a sleek and modern dark theme", "Adapts to your device's theme" ] : 
		page === "font-theme" ? 
			["Clean and modern, easy to read.", "Classic and elegant for a timeless feel.", "Code-like, great for a technical vibe." ] : ""

	function handleOptions() {
		if (page === "color-theme") {
			return console.log("Color")
		}

		if (page === "font-theme") {
			return console.log("Font")
		}
	}

	return (
		<>
			<h1>{pageTitle}</h1>
			<p>Chose your {pageTitle.toLowerCase()}</p>
			<div>
				<label>
					<SunIcon />
					<h2>{options[0]}</h2>
					<p>{optionsText[0]}</p>
					<input onChange={handleOptions} type="radio" name="setting-option" />
				</label>
				<label>
					<MoonIcon />
					<h2>{options[1]}</h2>
					<p>{optionsText[1]}</p>
					<input onChange={handleOptions} type="radio" name="setting-option" />
				</label>
				<label>
					<SystemIcon />
					<h2>{options[2]}</h2>
					<p>{optionsText[2]}</p>
					<input onChange={handleOptions} type="radio" name="setting-option" />
				</label>
			</div>
		</>
	)
}
