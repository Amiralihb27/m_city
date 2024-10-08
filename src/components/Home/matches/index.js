import React from 'react';
import {Tag} from '../../Utils/tools'
import Blocks from './Block'


const MatchesHome = () =>{
    return(
        <div className='home_matches_wrapper'>
            <div className='container'>
                <Tag 
                bck='#0e1731'
                size='3.125rem'
                color='#fff'
                //if you wana overwrite the properties fill the add object

                // add={{
                //     fontFamily:'Roboto'
                // }}
                >
                    Matches
                </Tag>

                <Blocks/>

                <Tag 
                
                size='1.5rem'
                color='#0e1731'
                link={true}
                linkTo='/the_team'
                >
                    Matches
                </Tag>

            </div>
        </div>
    )
}

export default MatchesHome;