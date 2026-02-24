import { useForm } from "react-hook-form"
import { useSighinMutation } from "../../api/apiUser";
import { replace, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Input } from "../../../../shared/ui/Input/Input";
import { Eye } from "../../../../shared/assets/Eye";
import { EyeOff } from "../../../../shared/assets/EyeOff"
import { Button } from "../../../../shared/ui/Button/Button";
import{ useAuth } from "../../../../shared/context/AuthContext"
import Swal from 'sweetalert2'
import './Login.css'

export const Login = () => {

    const methods = useForm({
        mode: 'onBlur', //onSubmit, onBlur, onChange, onTouched, all
        defaultValues: {
            email: "",
            password: ""
        }
    });
    const { register, reset, handleSubmit, formState: {errors} } = methods;
    const [signin, { isLoading}] = useSighinMutation();

    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [attempts, setAttempts] = useState(3);

    const navigate = useNavigate();    
    const location = useLocation();

    const { login } = useAuth();
    
    const from = location.state?.from || '/admin/schedule';
    
    const onSubmit = async(data) => {
        try{
            const response = await signin(data).unwrap();
            login(response.token); //сохраняем токен
            navigate(from, { replace: true });
            reset();
        }
        catch (err) {
            if(err?.status === 500) {
                setErrorMessage("Server mistake.Try again later");
                return;
            } 
            if (attempts > 1) {
                const left = attempts - 1;
                setAttempts(left);
                setErrorMessage(`Incorrect password, You have ${left} attempts left`)
            }
            else {
                setErrorMessage('Incorrect password. Redirecting ...')
                setTimeout(() => {navigate('/', {replace: true })}, 1500)
            }
        }
    }

    
    const togglePassword = () => setShowPassword(prev => !prev);
    
    useEffect(() => {
        Swal.fire({
            icon: "info",
            title: "Demo version",
            html: `
                <p style="font-size: 15px; color: #555; margin-top: 10px;">
                    This is a demo version. Use password <b>12345</b> to sign in.
                </p>
            `,
            confirmButtonText: "Got it",
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


        return(
        <div >
            <form className="container-signin" autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                <h1 className="head-sighin">Sigh In</h1>
                
                {errorMessage && <p>{errorMessage}</p>}  
                <div className='input-eye'>  
                    <input type="text" name="fakeuser" autoComplete="username" style={{ display: "none" }} />
                    <input type="password" name="fakepass" autoComplete="new-password" style={{ display: "none" }} />
        
                    <Input  
                        type={showPassword ? "text" : "password"}
                        label="Password"
                        autoComplete="new-password"
                        {...register("password", {
                            required: "Password is required",
                        })}
                    />  
                    {showPassword ? (
                        <EyeOff className="eyes" onClick={togglePassword}/>
                    ): (
                        <Eye className="eyes" onClick={togglePassword}/>
                    )
                }
                </div>                                 
                <Button type='submit' className="btn-show" disabled={isLoading}>
                    {isLoading ? 'Loading...' : 'Submit'}</Button>
            </form>
            
        </div>
    )
}