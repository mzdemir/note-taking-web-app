import {SansSerifIcon, SerifIcon, MonospaceIcon} from "../components/shared/Icons"
import GoBack from "../components/mobile/GoBack"
import useMediaQuery from "../hooks/useMediaQuery"

export default function FontTheme() {
	const isDesktop = useMediaQuery()

	function handleOptions() {}

	return (
		<>
			{!isDesktop && <GoBack where="Settings" />}
			<div className="settings-item-details note-details">
				<div>
					<h1 className="page-title text-preset-1">Font Theme</h1>
					<p>Chose your font theme</p>
				</div>
				<div className="options">
					<label>
						<div className="icon-wrapper">
							<SansSerifIcon />
						</div>
						<div>
							<h2 className="text-preset-4">Sans-serif</h2>
							<p className="text-preset-6">Clean and modern, easy to read.</p>
						</div>
						<input onChange={handleOptions} type="radio" name="setting-option" defaultChecked />
						<span className="custom-radio"></span>
					</label>
					<label>
						<div className="icon-wrapper">
							<SerifIcon />
						</div>
						<div>
							<h2 className="text-preset-4">Serif</h2>
							<p className="text-preset-6">Classic and elegant for a timeless feel.</p>
						</div>
						<input onChange={handleOptions} type="radio" name="setting-option" />
						<span className="custom-radio"></span>
					</label>
					<label>
						<div className="icon-wrapper">
							<MonospaceIcon />
						</div>
						<div>
							<h2 className="text-preset-4">Monospace</h2>
							<p className="text-preset-6">Code-like, great for a technical vibe.</p>
						</div>
						<input onChange={handleOptions} type="radio" name="setting-option" />
						<span className="custom-radio"></span>
					</label>
				</div>
			</div>
		</>
	)
}
