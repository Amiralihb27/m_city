// src/components/admin/match/FinalSelect.js
import React from 'react';
import { FormControl, MenuItem, Select } from '@mui/material';
import { selectErrorHelper, selectHasError } from "../../Utils/tools";

const FinalSelect = ({ formik }) => (
    <div>
        <FormControl error={selectHasError(formik, 'final')}>
            <Select
                id="final"
                name="final"
                {...formik.getFieldProps('final')}
                displayEmpty
            >
                <MenuItem value='' disabled>Was the game played?</MenuItem>
                <MenuItem value='Yes'>Yes</MenuItem>
                <MenuItem value='No'>No</MenuItem>
            </Select>
            {selectErrorHelper(formik, 'final')}
        </FormControl>
    </div>
);

export default FinalSelect;
