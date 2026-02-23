import { Controller, FormProvider, useForm } from "react-hook-form"
import { Button } from "../../../../shared/ui/Button/Button"
import { dataForm } from "../../lib/dataForm"
import './Schedule.css'
import { useSaveFormMutation } from "../../../../shared/api/api"
import { useEffect } from "react"
import { ContactCard } from "../ContactCard/ContactCard"
import { useNavigate } from "react-router-dom"


export const Schedule = () => {

   //the mock data
    const availableTimes = [
        new Date(new Date().setHours(10, 0, 0, 0)),
        new Date(new Date().setHours(10, 30, 0, 0)),
        new Date(new Date().setHours(11, 0, 0, 0)),
        new Date(new Date().setHours(11, 30, 0, 0)),
        new Date(new Date().setHours(13, 0, 0, 0)),
        new Date(new Date().setHours(17, 0, 0, 0))
    ]
    const methods = useForm({
        mode: 'onSubmit',
        defaultValues: {
        username: '', 
        phone: '',
        service: '',
        location: '',
        datePicker: new Date(),
        timePicker: availableTimes[0],
        message: '',
    }});

    const serviceOptions = ['service 1', 'service 2', 'service 3'];


    const today = new Date();
    const maxDate = new Date();
    maxDate.setDate(today.getDate() + 14)

    const { register, handleSubmit, watch, reset, setValue, control, formState: { errors } } = methods;
    const [saveForm, {isSuccess, isError, error}] = useSaveFormMutation();
    const navigate = useNavigate();
    const onSubmit = async (data) => {  
        try{
            const payload = {
                username: data.username,
                phone: data.phone,
                service: data.service,
                location: data.location,
                prefferedDate: data.datePicker.toISOString(),
                prefferedTime: data.timePicker.toISOString(),
                message: data.message
            };
            const response = await saveForm(payload).unwrap();
            reset();
            alert("Your application has been successfully submitted!");
        }
        catch (err) {
            alert("Failed to submit the form. Please try again.");
        }
    };
   
  useEffect(() => {
    if (isSuccess) {
        alert("The session was successfully updated.");
    }

    if (isError) {
        alert("Failed to update the session. Please try again.");
    }
}, [isSuccess, isError, error])

    
    return (
        <div className="container-schedule" >
            <Button className="btn-signIn" type="submit" onClick={() => navigate('/login')}>
                Sign in
            </Button>
            <div className="demo">
                <p>🔍 Demo version</p> 
                <p>Enter any data and click the button<strong className="highlight-signin" onClick={() => navigate('/login')}> Sign In</strong> to explore how the application works.</p>
            </div>
            <div className='headliner'>
                <h1 >Session Schedule</h1>
            </div>   
            <div className="containerHolder">  
            <FormProvider {...methods}>
                <form noValidate className="schedule" onSubmit={handleSubmit(onSubmit)}> 
                    {dataForm.map(({id, component: Component, name, label, placeholder, required, error, className, validation, ...props}) => (
                        <div key={id} className={`form-item ${name === "message" ? "form-textarea" : ""}`} >
                            {name === 'datePicker' || name === 'timePicker' ? (
                                <Controller
                                    name={name}
                                    control={control}
                                    rules={validation}
                                    render={({ field }) => (
                                        <div>
                                            <Component
                                                {...field}
                                                selected={field.value}
                                                onChange={field.onChange}
                                                label={label}
                                                minDate={today}
                                                maxDate={maxDate}
                                                errors={errors[name]?.message}
                                                availableTimes={name === 'timePicker' ? availableTimes : null}
                                            />
                                        </div>
                                    )}
                                />
                            ) : name === 'message' ? (
                                <div>
                                    <Component
                                        {...props}
                                        {...register(name,validation)}
                                        value={watch(name || '')}
                                        onChange={(e) => setValue(name,e.target.value)}
                                        label={label}
                                        placeholder={placeholder}
                                    />
                                </div>
                    ) : (
                        <div>
                            <Component 
                                {...props}
                                {...register(name,validation)}
                                value={watch(name) || ''}
                                onChange={(eOrValue) => {
                                    if (typeof eOrValue === "string") {
                                            setValue(name, eOrValue);
                                    } else {setValue(name, eOrValue.target.value);
                                    }
                                }}
                                label={label}
                                placeholder={placeholder}
                                options={name === 'service' ? serviceOptions : null}
                            />                          
                            {errors[name] && (
                                <p style ={{color:'red'}}>{errors[name]?.message}</p>
                            )}
                        </div>
                        )}
                        </div>
                    ))}
                    <Button className='btn' type="submit">
                        Submit
                    </Button> 
                </form>
            </FormProvider>     
            <ContactCard/>   
            </div>      
        </div>
    )
}