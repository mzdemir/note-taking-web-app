import {Logo, HomeIcon, ArchivedIcon, TagsIcon, SearchIcon, SettingsIcon} from "./Icons"

import {Link} from "react-router"

export default function Navigation() {
	return (
		<aside className="sidebar-nav">
			<div className="logo-wrapper">{<Logo />}</div>
			<nav className="navbar">
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
		</aside>
	)
}
