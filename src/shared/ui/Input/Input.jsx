import './Input.css';

export const Input = ({
    label, 
    type = 'text',
    required,
    error,
    className,
    ...otherProps
}) => {
    return (
        <div className='container'>
            {label && (
                <label className='label' htmlFor={otherProps.name}>
                    {label}{required}<span>*</span>
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