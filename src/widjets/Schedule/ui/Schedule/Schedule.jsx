import { Controller, FormProvider, useForm } from "react-hook-form"
import { Button } from "../../../../shared/ui/Button/Button"
import { dataForm } from "../../lib/dataForm"
import './Schedule.css'
export const Schedule = () => {

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
        userName: '', 
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
    const onSubmit = (data) => {
        console.log('Form submitted:', data);
        reset()
};

    
    return (
        <div className="container-schedule" >
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
            
        </div>
    )
}