// src/components/admin/match/ResultSelect.js
import React from 'react';
import { FormControl, MenuItem, Select } from '@mui/material';
import { selectErrorHelper, selectHasError } from "../../Utils/tools";

const ResultSelect = ({ formik }) => (
    <div>
        <FormControl error={selectHasError(formik, 'result')}>
            <Select
                id="result"
                name="result"
                {...formik.getFieldProps('result')}
                displayEmpty
            >
                <MenuItem value='' disabled>Select a result</MenuItem>
                <MenuItem value='W'>Win</MenuItem>
                <MenuItem value='L'>Lose</MenuItem>
                <MenuItem value='D'>Draw</MenuItem>
                <MenuItem value='n/a'>Not available</MenuItem>
            </Select>
            {selectErrorHelper(formik, 'result')}
        </FormControl>
    </div>
);

export default ResultSelect;
