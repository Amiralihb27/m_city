import React from 'react';

const FormInput = ({ name, type = "text", placeholder, formik }) => (
    <>
        <input
            name={name}
            type={type}
            placeholder={placeholder}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values[name]}
            className={formik.touched[name] && formik.errors[name] ? 'input_error' : ''}
        />
        {formik.touched[name] && formik.errors[name] && (
            <div className="error_label">{formik.errors[name]}</div>
        )}
    </>
);

export default FormInput;
