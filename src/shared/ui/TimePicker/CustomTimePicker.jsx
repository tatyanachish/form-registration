import { forwardRef } from "react"
import { TimeIcon } from "../../assets/TimeIcon"
import './CustomTimePicker.css'
import DatePicker from "react-datepicker"

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
    required,
    ...otherProps
}) =>{
    return(
        <div className='container'>
            {label && (
                <label className='label' htmlFor={otherProps.name}>
                    {label}{required}<span>*</span>
                </label>
            )}
            <div className="inputHolder">
                <DatePicker 
                    selected={selected}
                    onChange={onChange}
                    showTimeSelect
                    showTimeSelectOnly
                    dateFormat="HH:mm"
                    timeCaption="Select time"
                    includeTimes={availableTimes}
                    customInput={<CustomInput/>}
                    />                
            </div>
            {dateError && (
                {dateError}
            )}
        </div>
    )
}