// src/components/admin/match/MatchInfo.js
import React from 'react';
import CustomTextField from "../../Utils/customTextField";

const MatchInfo = ({ formik }) => (
    <div>
        <h4>Match Info</h4>
        <CustomTextField
            id="referee"
            name="referee"
            type="text"
            placeholder="Add the referee name"
            formik={formik}
        />
        <CustomTextField
            id="stadium"
            name="stadium"
            type="text"
            placeholder="Add the stadium name"
            formik={formik}
        />
    </div>
);

export default MatchInfo;
