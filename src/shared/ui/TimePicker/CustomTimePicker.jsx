import { forwardRef } from "react"
import { TimeIcon } from "../../assets/TimeIcon"
import './CustomTimePicker.css'

const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <div className='inputWrapper' onClick={onClick} ref={ref}>
        <input 
            type='text'
            className='timePicker'
            value={value}
            readOnly
        />
        <TimeIcon className='iconTimePicker'/>
    </div>
))

export const  CustomTimePicker = ({ 
    selected, 
    onChange, 
    availableTimes=[],
    dateError,
    label,
    required}) =>{
    return(
        <div className='container'>
            {label && (
                <label className='label'>
                    {label}{required && <span>*</span>}
                </label>
            )}
            <div>
                <CustomInput />
            </div>
            {dateError && (
                {dateError}
            )}
        </div>
    )
}