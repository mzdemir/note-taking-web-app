export default function PrimaryButton({variant, text}) {
	function handleClick() {}

	// prettier-ignore
	return (
		<button 
      className={variant === "primary" ? "primary-btn" : "secondary-btn"} 
      onClick={handleClick}>
			{text}
		</button>
	)
}
