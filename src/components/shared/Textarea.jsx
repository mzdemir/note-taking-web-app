import {useEffect, useRef} from "react"

export default function Textarea({name, className, value}) {
	const textareaRef = useRef(null)

	function autoResize(event) {
		event.target.style.height = "auto"
		event.target.style.height = event.target.scrollHeight + "px"
	}

	useEffect(() => {
		if (textareaRef.current) {
			textareaRef.current.style.height = "auto"
			textareaRef.current.style.height = textareaRef.current.scrollHeight + "px"
		}
	}, [value])

	return (
		<textarea
			ref={textareaRef}
			rows={1}
			type="text"
			id={name}
			name={name}
			className={className}
			defaultValue={value}
			required
			placeholder="Enter a title..."
			onInput={autoResize}></textarea>
	)
}
