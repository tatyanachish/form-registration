import './Button.css'

export const Button = ({
    className,
    children,
    onClick,
    color
    
}) => {
    return(
        <div>
            <button className='btn'>{children}</button>
        </div>
    )
}