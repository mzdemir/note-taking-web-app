import {SunIcon, MoonIcon, SystemIcon} from "../components/shared/Icons"
import GoBackLink from "../components/mobile/GoBackLink"
import Button from "../components/shared/Button"

import useMediaQuery from "../hooks/useMediaQuery"

export default function ColorTheme() {
	const isDesktop = useMediaQuery()

	function handleOptions() {}

	return (
		<div className="settings-item">
			{!isDesktop && <GoBackLink where="Settings" />}
			<h1 className="setting-title text-preset-1">Color Theme</h1>
			<p className="page-desc text-preset-5">Chose your color theme:</p>

			<div className="options text-preset-4">
				<label>
					<div className="icon-wrapper">
						<SunIcon />
					</div>
					<div className="setting-content">
						<h2>Light Mode</h2>
						<p className="setting-desc text-preset-6">Pick a clean and classic light theme</p>
					</div>
					<input onChange={handleOptions} type="radio" name="setting-option" defaultChecked />
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
					<input onChange={handleOptions} type="radio" name="setting-option" />
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
					<input onChange={handleOptions} type="radio" name="setting-option" />
					<span className="custom-radio"></span>
				</label>
				<Button className="primary-btn text-preset-4">Apply Changes</Button>
			</div>
		</div>
	)
}
