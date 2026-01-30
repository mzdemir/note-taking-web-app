import {Logo, HomeIcon, ArchivedIcon, TagsIcon, SearchIcon, SettingsIcon} from "../shared/Icons"

import {Link} from "react-router"

export default function MobileNav() {
	return (
		<header className="mobile-nav">
			<div className="logo-wrapper">{<Logo />}</div>
			<nav className="bottom-navbar">
				<Link to="/">
					{<HomeIcon />}
					<span>Home</span>
				</Link>
				<Link to="/search">
					{<SearchIcon />}
					<span>Search</span>
				</Link>
				<Link to="/archived">
					{<ArchivedIcon />}
					<span>Archived</span>
				</Link>
				<Link to="/tags">
					{<TagsIcon />}
					<span>Tags</span>
				</Link>
				<Link to="/settings">
					{<SettingsIcon />}
					<span>Settings</span>
				</Link>
			</nav>
		</header>
	)
}
