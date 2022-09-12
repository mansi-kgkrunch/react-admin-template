import { useCallback, useEffect } from 'react';
import Axios from 'axios';
import env from '../env.json';
import { Navigate, useNavigate, useLocation } from 'react-router-dom';

const Auth = ({ children }) => {
    let navigate = useNavigate();
    const { pathname } = useLocation();
    const auth = localStorage.getItem('user');

    const ChkAdmin = useCallback(() => {
        Axios.get(`${env.API_URL}/user/check-admin`, {
            headers: {
                'x-access-token': localStorage.getItem('user') || ''
            }
        })
            .then((res) => {
                if (res.data.user) {
                    localStorage.setItem('userAuth', JSON.stringify(res.data.userData))
                }
            })
            .catch((err) => console.error(err));
    }, [navigate]);

    useEffect(() => {
        ChkAdmin();
    }, [ChkAdmin]);

    return (<>{auth ? children : <Navigate replace to="/login" state={{ from: pathname }} />}</>);
};
export default Auth;