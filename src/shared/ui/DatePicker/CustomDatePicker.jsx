import { forwardRef } from 'react';
import './CustomDatePicker.css';
import 'react-datepicker/dist/react-datepicker.css';
import { CalendarIcon } from '../../assets/CalendarIcon';
import DatePicker from 'react-datepicker';


const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <div className='inputWrapper' onClick={onClick} ref={ref}>
        <input 
            type='text'
            className='datePicker'
            value={value}
            readOnly
        />
        <CalendarIcon className='iconDatePicker'/>
    </div>
))
export const CustomDatePicker = ({
    selected,
    onChange,
    dateError,
    maxDate,
    label,
    required,
    ...otherProps
}) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0)
    return(
        <div className='container'>
           {label && (
                <label className='label' htmlFor={otherProps.name}>
                    {label}{required}<span>*</span>
                </label>
            )}
            <div className='inputHolder'>
                <DatePicker 
                    selected={selected}
                    onChange={onChange}
                    minDate={today}
                    maxDate={maxDate}
                    dateFormat='MM/dd/yyyy'
                    customInput={<CustomInput/>}
        />
        </div>
        {dateError && (
            {dateError}
        )}

        </div>
    )
}