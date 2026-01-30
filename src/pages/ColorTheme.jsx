import {SunIcon, MoonIcon, SystemIcon} from "../components/shared/Icons"
import GoBack from "../components/mobile/GoBack"

export default function ColorTheme() {
	function handleOptions() {}

	return (
		<div className="main-content">
			<GoBack where="Settings" />
			<h1 className="page-title text-preset-1">Color Theme</h1>
			<p className="text-preset-5">Chose your color theme:</p>
			<div className="options">
				<label>
					<div className="icon-wrapper">
						<SunIcon />
					</div>
					<div>
						<h2 className="text-preset-4">Light Mode</h2>
						<p className="text-preset-6">Pick a clean and classic light theme</p>
					</div>
					<input onChange={handleOptions} type="radio" name="setting-option" defaultChecked />
					<span className="custom-radio"></span>
				</label>
				<label>
					<div className="icon-wrapper">
						<MoonIcon />
					</div>
					<div>
						<h2 className="text-preset-4">Dark Mode</h2>
						<p className="text-preset-6">Select a sleek and modern dark theme</p>
					</div>
					<input onChange={handleOptions} type="radio" name="setting-option" />
					<span className="custom-radio"></span>
				</label>
				<label>
					<div className="icon-wrapper">
						<SystemIcon />
					</div>
					<div>
						<h2 className="text-preset-4">System</h2>
						<p className="text-preset-6">Adapts to your device's theme</p>
					</div>
					<input onChange={handleOptions} type="radio" name="setting-option" />
					<span className="custom-radio"></span>
				</label>
			</div>
		</div>
	)
}
