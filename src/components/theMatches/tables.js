import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

const LeagueTable = ({ positions }) => {
    const showTeamPosition = () => {
        return (
            positions ?
                positions.map((pos, i) => (
                    <TableRow key={pos.id}>
                        <TableCell>{i + 1}</TableCell>
                        <TableCell>{pos.team}</TableCell>
                        <TableCell>{pos.w}</TableCell>
                        <TableCell>{pos.l}</TableCell>
                        <TableCell>{pos.d}</TableCell>
                        <TableCell>{pos.p}</TableCell>
                    </TableRow>
                )) :
                null
        );
    }

    return (
        <div className='league_table_wrapper'>
            <div className='title'>
                League Table
            </div>
            
                <Table  aria-label="positions table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Pos</TableCell>
                            <TableCell>Team</TableCell>
                            <TableCell>W</TableCell>
                            <TableCell>L</TableCell>
                            <TableCell>D</TableCell>
                            <TableCell>Pts</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {showTeamPosition()}
                    </TableBody>
                </Table>
            
        </div>
    );
};

export default LeagueTable;
