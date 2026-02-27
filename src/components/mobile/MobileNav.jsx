import {Logo, HomeIcon, ArchivedIcon, TagsIcon, SearchIcon, SettingsIcon} from "../shared/Icons"

import {NavLink} from "react-router"

export default function MobileNav() {
	return (
		<header className="mobile-header">
			<div className="logo-wrapper">{<Logo />}</div>
			<nav className="bottom-navbar">
				<NavLink to="/notes" className="nav-links">
					{<HomeIcon />}
					<span className="text-preset-6">Home</span>
				</NavLink>
				<NavLink to="/search" className="nav-links">
					{<SearchIcon />}
					<span className="text-preset-6">Search</span>
				</NavLink>
				<NavLink to="/archived" className="nav-links">
					{<ArchivedIcon />}
					<span className="text-preset-6">Archived</span>
				</NavLink>
				<NavLink to="/tags" className="nav-links">
					{<TagsIcon />}
					<span className="text-preset-6">Tags</span>
				</NavLink>
				<NavLink to="/settings" className="nav-links">
					{<SettingsIcon />}
					<span className="text-preset-6">Settings</span>
				</NavLink>
			</nav>
		</header>
	)
}
