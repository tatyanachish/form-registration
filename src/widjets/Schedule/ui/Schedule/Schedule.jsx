import { dataForm } from "../../lib/dataForm"
import './Schedule.css'
export const Schedule = () => {
    return (
        <div className="schedule">
            {dataForm.map(({id, component: Component, name, label, placeholder, required, error, className, ...props}) => (
                <div key={id}>
                    <Component
                        label={label}
                        placeholder={placeholder}
                        required={required}
                        error={error}
                        className={className}
                    />
                </div>
            ))}
        </div>
    )
}