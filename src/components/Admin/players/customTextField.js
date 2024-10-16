import React from 'react';
import { FormControl, TextField } from '@mui/material';
import { textErrorHelper, selectErrorHelper, selectIsError } from "../../Utils/tools";


const CustomTextField = ({ id, name, type = 'text', placeholder, formik }) => {
    return (
        <div className="mb-5">
            <FormControl>
                <TextField
                    id={id}
                    type={type}
                    name={name}
                    variant="outlined"
                    placeholder={placeholder}
                    {...formik.getFieldProps(name)}
                    {...textErrorHelper(formik, name)}
                //     {textErrorHelper(formik, name)} would pass the entire object as a single prop (which TextField wouldn't understand), like:
                // <TextField errorHelper={{ error: true, helperText: "some error" }} />
                // This won't work because TextField expects error and helperText to be separate props, not wrapped inside another object.


                //     {...textErrorHelper(formik, name)} spreads the object's properties (i.e., error and helperText) directly into TextField, like:

                // <TextField error={true} helperText="some error" />
                // This works as intended since TextField can now access both error and helperText as individual props.

                // So, by using the spread operator ..., you're passing each key-value pair from the textErrorHelper object as separate props, which TextField can process correctly.
                />
            </FormControl>
        </div>
    );
};

export default CustomTextField;
