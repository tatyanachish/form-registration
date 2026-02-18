import { useForm } from "react-hook-form"
import { useSighinMutation } from "../../api/apiUser";
import { replace, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Input } from "../../../../shared/ui/Input/Input";
import { Eye } from "../../../../shared/assets/Eye";
import { EyeOff } from "../../../../shared/assets/EyeOff"
import { Button } from "../../../../shared/ui/Button/Button";
import{ useAuth } from "../../../../shared/context/AuthContext"
import './Login.css'

export const Login = () => {

    const methods = useForm({
        mode: 'onBlur', //onSubmit, onBlur, onChange, onTouched, all
        defaultValues: {
            email: "",
            password: ""
        }
    });
    const { register, reset, handleSubmit, formState: {error} } = methods;
    const [signin, { isLoading}] = useSighinMutation();

    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false)
    const [attempts, setAttepmts] = useState(3)

    const navigate = useNavigate();    
    // const { login } = useAuth();
    const { login } = useAuth();
    
// console.log("isAuthenticated:", isAuthenticated);
//  useEffect(() => {
//         if (isAuthenticated) {
//             navigate('/', { replace: true });
//         }
//     }, [isAuthenticated, navigate]);


    // useEffect (() => {
    //     if(isAuthenticated) {
    //         navigate('/', {replace: true})
    //     }
    // }, [isAuthenticated, navigate])


    const onSubmit = async(data) => {
        try{
            const response = await signin(data).unwrap();
            login(response.token); //сохраняем токен
            navigate('/admin/schedule');
            reset();
        }
        catch (err) {
            if(err?.status === 500) {
                setErrorMessage("Serever mistake.Try again later");
                return;
            } 
            if (attempts > 1) {
                const left = attempts - 1;
                setAttepmts(left);
                setErrorMessage(`Incorrect password, You have ${left} attempts left`)
            }
            else {
                setErrorMessage('Incorrect password. Redirecting ...')
                setTimeout(() =>navigate('/'), 1500)
            }
        }
    }


    const togglePassword = () => setShowPassword(prev => !prev);

        return(
        <div >
            <form className="container-signin" autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                <h1 className="head-sighin">Sigh In</h1>
                {errorMessage && <p>{errorMessage}</p>}  
                <div className='input-eye'>  
                    <input type="text" name="fakeuser" autoComplete="username" style={{ display: "none" }} />
                    <input type="password" name="fakepass" autoComplete="new-password" style={{ display: "none" }} />
        
                    <Input  type={showPassword ? 'text' : 'password'} 
                            label="Password" 
                            autoComplete="new-password"
                            { ...register("password")} 
                            required                     
                    />  
                    {showPassword ? (
                        <EyeOff className="eyes" onClick={togglePassword}/>
                    ): (
                        <Eye className="eyes" onClick={togglePassword}/>
                    )
                }
                </div>                                 
                <Button type='submit' className="btn-show">Submit</Button>
            </form>
            
        </div>
    )
}