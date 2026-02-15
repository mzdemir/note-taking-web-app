export default function PrimaryButton({className, onClick, children}) {
	// prettier-ignore
	return (
		<button 
      className={className} 
      onClick={onClick}>
			{children}
		</button>
	)
}
