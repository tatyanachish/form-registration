import './Input.css';

export const Input = ({
    label, 
    type = 'text',
    required,
    error,
    className,
    fullWidth,
    ...otherProps
}) => {
    return (
        <div className='container'>
            {label && (
                <label className='label'>
                    {label}{required && <span>*</span>} 
                </label>
            )}
            <input 
                className='input'
                type={type}
                required={required}
                {...otherProps}
            />
            {error ? error.message : ''}
        </div>
    )
}