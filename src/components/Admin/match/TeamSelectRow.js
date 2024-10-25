// src/components/admin/match/TeamSelectRow.js
import React from 'react';
import { FormControl, MenuItem, Select } from '@mui/material';
import CustomTextField from "../../Utils/customTextField";
import { selectErrorHelper, selectHasError } from "../../Utils/tools";

const TeamSelectRow = ({ label, selectName, resultName, teams, formik }) => (
    <div>
        <h4>{label}</h4>
        <div className="sameRow">
            <FormControl error={selectHasError(formik, selectName)}>
                <Select
                    id={selectName}
                    name={selectName}
                    {...formik.getFieldProps(selectName)}
                    displayEmpty
                >
                    <MenuItem value='' disabled>Select a team</MenuItem>
                    {teams.map(team => (
                        <MenuItem key={team.id} value={team.shortName}>
                            {team.shortName}
                        </MenuItem>
                    ))}
                </Select>
                {selectErrorHelper(formik, selectName)}
            </FormControl>
        <CustomTextField
            id={resultName}
            name={resultName}
            type="number"
            placeholder={resultName}
            formik={formik}
            style={{ marginLeft: '10px' }}
        />
        </div>
    </div>
);

export default TeamSelectRow;
