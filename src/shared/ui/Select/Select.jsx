import { useState } from 'react'
import './Select.css'
import { SelectIcon } from '../../assets/SelectIcon'

export const Select = ({
    label,
    error,
    required,
    className,
    value,
    onChange,
    options = [],
    placeholder,
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
                <label className='label' htmlFor={otherProps.name}>
                    {label}{required}<span>*</span>
                </label>
            )}
            <div className='inputWrapper' onClick={() => setIsOpen((prev) => !prev)}>
                <input 
                    readOnly
                    value={value || ''} 
                    required={required}
                    className='input'
                    placeholder= {placeholder}
                />
                <SelectIcon className={`icon ${isOpen ? "iconOpen" : ""}`} />
            </div>
            {isOpen && (
                    <div className='dropdownMen' onMouseLeave={() => setIsOpen(false)}>
                        {options.length > 0 ? (
                            options.map((option) => (
                                <div
                                    key={option}
                                    onClick={() => handleSelect(option)}
                                    className='option'
                                >
                                    {option}
                                </div>
                            ))) : (<p>Nothing found</p>)
                        }
                    </div>
                )}
            
            {error ? error.message : ''}
        </div>
    )
}