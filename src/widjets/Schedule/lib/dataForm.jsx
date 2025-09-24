import { Input } from './../../../shared/ui/Input/Input' 
import { Select } from '../../../shared/ui/Select/Select'
import { CustomDatePicker } from '../../../shared/ui/DatePicker/CustomDatePicker'
import { CustomTimePicker } from '../../../shared/ui/TimePicker/CustomTimePicker'
import { Textarea } from '../../../shared/ui/Textarea/Textarea'



export const dataForm = [
    {
        id: 1,
        component: Input,
        name: 'username',
        label: 'Your Name',
        placeholder: 'Ex. John Doe',
        required: true,
       
    },
    {
        id: 2,
        component: Input,
        name: 'phone',
        label: 'Phone',
        placeholder: 'Enter Phone Number',
        required: true,
       
    },
    {
        id: 3,
        component: Select,
        name: 'service',
        label: 'Preferred Services',
        placeholder: 'Select Type',
        required: true,
        
    },
    {
        id: 4,
        component: Input,
        name: 'location',
        label: 'Location',
        placeholder: 'Enter Location',
        required: true,
    },
    {
        id: 5,
        component: CustomDatePicker,
        name: 'datePicker',
        label: 'Preferred Session Date',
        required: true,  
            
    },
    {
        id: 6,
        component: CustomTimePicker,
        name: 'timePicker',
        label: 'Preferred Session Time',
        required: true, 
    },
    {
        id: 7,
        component: Textarea,
        name: 'message',
        label: 'Your Message',
        placeholder: 'Enter here...',
    }
]