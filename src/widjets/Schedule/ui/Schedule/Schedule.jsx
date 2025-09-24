import { Button } from "../../../../shared/ui/Button/Button"
import { dataForm } from "../../lib/dataForm"
import './Schedule.css'
export const Schedule = () => {
    const handleSubmit = (e) => {
        e.preventDefault()
    }
     return (
        <div className="container-schedule" >
            <form noValidate className="schedule" onSubmit={handleSubmit}> 
                {dataForm.map(({id, component: Component, name, label, placeholder, required, error, className, ...props}) => (
                    <div key={id} className={`form-item ${name === "message" ? "form-textarea" : ""}`} >
                        <Component
                            label={label}
                            placeholder={placeholder}
                            required={required}
                            error={error}
                            className={className}
                        />
                    </div>
                ))}
                <Button className='btn'>
                    Submit
                </Button>
                
            
            </form>
        </div>
    )
}