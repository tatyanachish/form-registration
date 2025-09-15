import { useState } from 'react'
import './Textarea.css'

export const Textarea = ({
    label,
    required,
    error,
    className,
    fulWidth,
    onChange,
    ...otherProps
}) => {

    const [text, setText] = useState(otherProps.value || '');
    const handleChange = (e) => {
        setText(e.target.value)
        if (onChange) {
            onChange(e)
        }
    };
    return (
        <div className='container'>
            {label && (
                <label className='label'>
                    {label}{required && <span>*</span>}
                </label>
            )}
            <textarea 
                className='textarea'
                required = {required}
                onChange={handleChange}
                {...otherProps}
            >
            </textarea>
            {error ? error.message : ''}
        </div>
    )
}