import { useEffect, useState } from 'react'
import { useConfirmFormMutation, useDeleteFormMutation, useGetFormQuery} from '../../shared/api/api'
import { Button } from '../../shared/ui/Button/Button'
import './AdminSchedule.css'
import { useAuth } from '../../shared/context/AuthContext.jsx'
import Swal from 'sweetalert2'

export const AdminSchedule = () => {
    const { isAuthenticated } = useAuth();

    const [applications, setAppllications] = useState([])
    const {data, isLoading, refetch, isFetching, isError, error} = useGetFormQuery();
    const [confirmForm] = useConfirmFormMutation();
    const [deleteForm] = useDeleteFormMutation();
    

    useEffect(() => {
        if(data) {
            setAppllications(data)
        }
    }, [data]);
    useEffect(() => {
            Swal.fire({
                icon: "info",
                title: "Demo version",
                html: `
                    <p style="font-size: 15px; color: #555; margin-top: 10px;">
                        All submitted applications are automatically deleted once per day.
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

    const handleDelete = async(id) => {
        const confirm = window.confirm(" You are going to delete this application. Are you sure?")
        if(confirm) {
            try{
                await deleteForm(id).unwrap();
                setAppllications((prev) => prev.filter((item) => item._id !== id));
            }
            catch (error) {
                    alert("Failed to delete application. Please try again.");
}
        }
    }
    
    if (isLoading || !data) {
        return (
            <div className='loading-wrapper'>
                <div className='loading-spinner'></div>
                <div className='loading-text'>
                ☕ Warming up the server...<br />
                Please wait a moment.
                </div>
            </div>
        );
    }

     
    return (
        <div className='container-admin'>
            <div className="head">
                <h1>Session Schedule</h1>
            </div>

            <div className='receiving'>
                <h2>Received applications</h2>
            </div>
            <Button className='btn-refresh' onClick={refetch} disabled={isFetching}>
                Update applications
            </Button>
            <div className='list'>
            {applications.length === 0 ? (<h3>There are no applications yet.</h3> 
            ) : (
                applications.map((item) => (                    
                    <div key = {item._id} className='application'>
                        <p>Name: <strong>{item.username}</strong></p>
                        <p>Phone: <strong>{item.phone}</strong></p>
                        <p>Service: <strong>{item.service}</strong></p>
                        <p>Location: <strong>{item.location}</strong></p>
                        <p>Date: <strong> {new Date(item.prefferedDate).toLocaleDateString()}</strong></p>
                        <p>Time:<strong> {new Date(item.prefferedTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</strong></p>
                        <p>Message:</p>
                            <div className="message-box">{item.message}</div>
                        <p>Status: <strong>{item.status}</strong></p>
                        <div className='btn-admin'>                            
                            <Button className='button confirm-button'
                            disabled = {item.status === 'confirmed'}
                            onClick = {() => confirmForm(item._id)}>
                                {item.status === 'confirmed' ? "Confirmed" : "Confirm"}
                            </Button>
                            <Button className='button' onClick = {() => handleDelete(item._id)}>Delete</Button>               
                        </div>
                    </div>                    
                ))
            )
            }
            </div>
        </div>
    

        )}