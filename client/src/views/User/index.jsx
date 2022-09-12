import { useCallback, useEffect, useState } from 'react';
// material-ui
import { Typography } from '@mui/material';
import { Button, FormControlLabel, Grid, Radio, RadioGroup, styled } from '@mui/material';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { DataGrid } from '@mui/x-data-grid';
import { IconTrash } from '@tabler/icons';

//project import
import MainCard from 'ui-component/cards/MainCard';
import env from '../../env.json'
import Axios from 'axios';

// ==============================|| SAMPLE PAGE ||============================== //

const TextField = styled(TextValidator)(() => ({
    width: '100%',
    marginBottom: '16px'
}));


const User = () => {

    document.title = `User | ${env.APP_NAME}`;
    const [users, setUserState] = useState([]);
    const getUser = useCallback(() => {
        Axios.get(`${env.API_URL}/user`, {
            headers: {
                'x-access-token': localStorage.getItem('user') || '',
            }
        })
            .then(
                res => {
                    if (res.data.status) {
                        setUserState(res.data.user)
                        // dispatch(setToast({ type: "success", message: res.data.message }))
                    } else {
                        // dispatch(setToast({ type: "error", message: res.data.message }))
                    }
                }).catch(error => {
                    // dispatch(setToast({ type: "error", message: error.message }))
                })

    }, [])

    useEffect(() => {
        getUser();
    }, [getUser])

    function deletehandle(id) {
        Axios.delete(`${env.API_URL}/user/del/${id}`, {
            headers: {
                "x-access-token": localStorage.getItem("user") || "",
            },
        })
            .then((res) => {
                alert(res.data.message);
                if (res.data.status) {
                    dispatch(
                        setToast({
                            type: "success",
                            message: res.data.message,
                        })
                    );
                    getUser();
                } else {
                    dispatch(
                        setToast({
                            type: "error",
                            message: res.data.message,
                        })
                    );
                }
            })
            .catch((error) => {
                dispatch(setToast({ type: "error", message: error.message }));
            });
    }

    const columns = [
        { field: '_id', headerName: 'ID', width: 230 },
        { field: 'fname', headerName: 'First name', width: 230 },
        { field: 'lname', headerName: 'Last name', width: 230 },
        {
            field: 'email',
            headerName: 'Email',
            width: 230,
        },
        {
            field: 'full Name',
            headerName: 'Full name',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 230,
            valueGetter: (params) =>
                `${params.row.fname || ''} ${params.row.lname || ''}`,
        },
    ];

    return (
        <MainCard title="User">
            <Typography variant="h5">User List</Typography>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={users}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                    getRowId={(row) => row._id}
                />
            </div>
        </MainCard>
    );
};

export default User;
