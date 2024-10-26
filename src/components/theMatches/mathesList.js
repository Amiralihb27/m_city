import React , {useState,useEffect,useReducer} from 'react';
import { showSuccessToast,showErrorToast } from '../Utils/tools';
import { CircularProgress } from '@mui/material';
import { matchesCollection } from '../../firebase';
const MatchesList = ()=>{
    return (
        <div>
            The Matches
        </div>
    )
}

export default MatchesList;