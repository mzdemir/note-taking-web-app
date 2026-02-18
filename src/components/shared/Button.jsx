export default function PrimaryButton({className, onClick, children, type}) {
	// prettier-ignore
	return (
		<button
			type={type ? type : "button"}
			form="note-form"
      className={className} 
      onClick={onClick}>
			{children}
		</button>
	)
}
