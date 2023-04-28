import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import useAuth from '../../hooks/useAuth'; 

export default function DriverHome(){
    const navigate = useNavigate();
    const isLoggedIn = useAuth(); // Use the useAuth hook

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!isLoggedIn && token === null) {
          navigate('/');
        }
    }, [isLoggedIn, navigate]);

    const logout = () => {
        localStorage.removeItem("token");
        alert("You have been logged out!");
        navigate("/", { replace: true });
    };
    return(
        <div>
            <button onClick={logout}>
                Logout
            </button>
        </div>
    );
}