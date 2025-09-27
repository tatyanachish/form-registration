import { Input } from './../../../shared/ui/Input/Input' 
import { Select } from '../../../shared/ui/Select/Select'
import { CustomDatePicker } from '../../../shared/ui/DatePicker/CustomDatePicker'
import { CustomTimePicker } from '../../../shared/ui/TimePicker/CustomTimePicker'
import { Textarea } from '../../../shared/ui/Textarea/Textarea'

export const validMessage = {
    required: 'required filed',
    errors: {
        validName: "Please use only letters",
        validPhone: "Please enter the correct phone",
        validService: "Please select the type of service",
        validLocation: "Please use only letters",
        validDate: "Please select a date",
        validTime: "Please select a time",
        textTooShort: `minimum number of characters  `
    }
}
export const textReges = /^[a-zA-Z\s]+$/;
export const phoneReges = /^\+?1[\s\-]?(\([2-9]\d{2}\)|[2-9]\d{2})[\s\-]?[2-9]\d{2}[\s\-]?\d{4}$/;




export const dataForm = [
    {
        id: 1,
        component: Input,
        name: 'username',
        label: 'Your Name',
        placeholder: 'Ex. John Doe',
        required: true,
        validation : {
            required: validMessage.required,
            pattern: {
                value: textReges,
                message: validMessage.errors.validName,
            }
        }
    },
    {
        id: 2,
        component: Input,
        name: 'phone',
        label: 'Phone',
        placeholder: 'Enter Phone Number',
        required: true,
        validation: {
            required: validMessage.required,
            pattern: {
                value: phoneReges,
                message: validMessage.errors.validPhone,
            }
        }
    },
    {
        id: 3,
        component: Select,
        name: 'service',
        label: 'Preferred Services',
        placeholder: 'Select Type',
        required: true,
        validation: {
            required: validMessage.required,
            pattern: {
                message: validMessage.errors.validService
            }

        }
    },
    {
        id: 4,
        component: Input,
        name: 'location',
        label: 'Location',
        placeholder: 'Enter Location',
        required: true,
        validation: {
            required: validMessage.required,
            pattern: {
                value: textReges,
                message: validMessage.errors.validLocation
            }
        }
    },
    {
        id: 5,
        component: CustomDatePicker,
        name: 'datePicker',
        label: 'Preferred Session Date',
        required: true,  
        // validation: {
        //     required: validMessage.required,

        // }
            
    },
    {
        id: 6,
        component: CustomTimePicker,
        name: 'timePicker',
        label: 'Preferred Session Time',
        required: true, 
        // validation: {
        //     required: validMessage.required,
            
        // }
    },
    {
        id: 7,
        component: Textarea,
        name: 'message',
        label: 'Your Message',
        placeholder: 'Enter here...',
    }
]