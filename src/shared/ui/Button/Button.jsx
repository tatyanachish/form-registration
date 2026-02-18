import './Button.css'

export const Button = ({
    className = '',
    children,
    onClick,
    ...props    
}) => {
    return(        
            <button 
                className={`btn ${className}`}
                onClick = {onClick}
                {...props}>
                {children}</button>
    )
}