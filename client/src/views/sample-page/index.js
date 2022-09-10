import { useEffect, useState } from 'react';
// material-ui
import { Typography } from '@mui/material';
import { Button, FormControlLabel, Grid, Radio, RadioGroup, styled } from '@mui/material';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';

//project import
import MainCard from 'ui-component/cards/MainCard';

// ==============================|| SAMPLE PAGE ||============================== //

const TextField = styled(TextValidator)(() => ({
    width: '100%',
    marginBottom: '16px'
}));

const SamplePage = () => {
    const [state, setState] = useState({});

    useEffect(() => {
        ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
            if (value !== state.password) return false;

            return true;
        });
        return () => ValidatorForm.removeValidationRule('isPasswordMatch');
    }, [state.password]);

    const handleSubmit = (event) => {
        console.log('submitted');
        console.log(state);
    };

    const handleChange = (event) => {
        event.persist();
        setState({ ...state, [event.target.name]: event.target.value });
    };

    const { username, firstName, mobile, password, confirmPassword, gender, email } = state;

    return (
        <MainCard title="Sample Card">
            <Typography variant="h5">User Form</Typography>
            <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
                <Grid container spacing={6}>
                    <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                        <TextField
                            type="text"
                            name="username"
                            id="standard-basic"
                            value={username || ''}
                            onChange={handleChange}
                            errorMessages={['this field is required']}
                            label="Username (Min length 4, Max length 9)"
                            validators={['required', 'minStringLength: 4', 'maxStringLength: 9']}
                        />

                        <TextField
                            type="text"
                            name="firstName"
                            label="First Name"
                            onChange={handleChange}
                            value={firstName || ''}
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />

                        <TextField
                            type="email"
                            name="email"
                            label="Email"
                            value={email || ''}
                            onChange={handleChange}
                            validators={['required', 'isEmail']}
                            errorMessages={['this field is required', 'email is not valid']}
                        />
                        <TextField
                            type="text"
                            name="mobile"
                            value={mobile || ''}
                            label="Mobile Nubmer"
                            onChange={handleChange}
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                        <TextField
                            name="password"
                            type="password"
                            label="Password"
                            value={password || ''}
                            onChange={handleChange}
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />
                        <TextField
                            type="password"
                            name="confirmPassword"
                            label="Confirm Password"
                            onChange={handleChange}
                            value={confirmPassword || ''}
                            validators={['required', 'isPasswordMatch']}
                            errorMessages={['this field is required', "password didn't match"]}
                        />
                        <RadioGroup row name="gender" sx={{ mb: 2 }} value={gender || ''} onChange={handleChange}>
                            <FormControlLabel value="Male" label="Male" labelPlacement="end" control={<Radio color="secondary" />} />

                            <FormControlLabel value="Female" label="Female" labelPlacement="end" control={<Radio color="secondary" />} />

                            <FormControlLabel value="Others" label="Others" labelPlacement="end" control={<Radio color="secondary" />} />
                        </RadioGroup>
                    </Grid>
                </Grid>

                <Button color="primary" variant="contained" type="submit">
                    <Typography sx={{ pl: 1, textTransform: 'capitalize' }}>Submit</Typography>
                </Button>
            </ValidatorForm>
        </MainCard>
    );
};

export default SamplePage;
