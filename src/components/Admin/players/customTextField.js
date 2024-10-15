import React from 'react';
import { FormControl, TextField } from '@mui/material';

const CustomTextField = ({ id, name, placeholder, formik }) => {
    return (
        <div className="mb-5">
            <FormControl>
                <TextField
                    id={id}
                    name={name}
                    variant="outlined"
                    placeholder={placeholder}
                    {...formik.getFieldProps(name)}
                    error={formik.touched[name] && Boolean(formik.errors[name])}
                    helperText={formik.touched[name] && formik.errors[name]}
                />
            </FormControl>
        </div>
    );
};

export default CustomTextField;
