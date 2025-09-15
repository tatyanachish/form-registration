import { useState } from 'react'
import './Select.css'

export const Select = ({
    label,
    error,
    required,
    className,
    fullWidth,
    value,
    onChange,
    options = [],
    ...otherProps
}) => {
    const [isOpen, setIsOpen] = useState(false)
    const handleSelect = (option) => {
        onChange(option);
        setIsOpen(false)
    }
    return(
        <div className='container'>
            {label && (
                <label className='label'>
                    {label} {required}<span>*</span>
                </label>
            )}
            <input 
                placeholder='Select type' 
                readOnly
                value={value} 
                onClick={()=>setIsOpen((prev) => !prev)} 
                className='input'
            />
            {error ? error.message : ''}
        </div>
    )
}