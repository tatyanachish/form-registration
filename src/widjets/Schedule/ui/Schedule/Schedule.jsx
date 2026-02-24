import { Controller, FormProvider, useForm } from "react-hook-form"
import { Button } from "../../../../shared/ui/Button/Button"
import { dataForm } from "../../lib/dataForm"
import './Schedule.css'
import { useSaveFormMutation } from "../../../../shared/api/api"
import { useEffect } from "react"
import { ContactCard } from "../ContactCard/ContactCard"
import { useNavigate } from "react-router-dom"
import Swal from 'sweetalert2'


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

            Swal.fire({
                html: `
                    <p style="font-size: 15px; color: #555; margin-top: 10px;">
                        Your application has been successfully submitted!
                    </p>
                `,
                confirmButtonText: "OK",
                confirmButtonColor: "#003D2B",
                background: "#fffdf7",
                backdrop: "rgba(0,0,0,0.3)",
                padding: "1.5rem",
            });
        }
        catch (err) {
            Swal.fire({
                html: `
                    <p style="font-size: 15px; color: #555; margin-top: 10px;">
                        Failed to submit the form. Please try again.
                    </p>
                `,
                confirmButtonText: "OK",
                confirmButtonColor: "#003D2B",
                background: "#fffdf7",
                backdrop: "rgba(0,0,0,0.3)",
                padding: "1.5rem",
            })
        }
    };   

    useEffect(() => {
        Swal.fire({
            icon: 'info',
            title: 'Demo version',
            html: `
                <p style="font-size: 15px; color: #555; margin-top: 10px;">
                    This is a demo version. Enter any data and click <b>Sign In</b> to explore how the application works.
                </p>
            `,
            confirmButtonText: 'Got it',
            confirmButtonColor: "#003D2B",
            width: "300px",
            background: "#fffdf7",
            backdrop: "rgba(0,0,0,0.3)",
            padding: "1.5rem",
            customClass: {
                icon: "my-green-icon"
            }
        });
    }, []);


    
    return (
        <div className="container-schedule" >
            <Button className="btn-signIn" type="submit" onClick={() => navigate('/login')}>
                Sign in
            </Button>
            
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