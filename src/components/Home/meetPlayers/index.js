import React from "react";
import { Fade } from 'react-awesome-reveal';
import { Tag } from '../../Utils/tools';
import HomeCards from "./cards";
import Home from "..";



let tagDefault = {
    bck: '#0e1731',
    size: '100px',
    color: '#fff'
}
const MeetPlayer = () => {

    const showTextTag = (text) => {
        return (
            <Tag
                {...tagDefault}
                add={{
                    display: 'inline-block',
                    marginBottom: '20px'
                }}>
                {text}
            </Tag>
        )
    }

    return (
        <Fade
            triggerOnce>

            <div className="home_meetplayers">
                <div className="container">
                    <div className="home_meetplayers_wrapper">
                        <div className="home_card_wrapper">
                            <HomeCards></HomeCards>
                        </div>
                        <div className="home_text_wrapper">
                            <div>
                                {showTextTag('Meet')}
                            </div>
                            <div>
                                {showTextTag('The')}
                            </div>
                            <div>
                                {showTextTag('Players')}
                            </div>
                            <div>
                                <Tag
                                bck='#fff'
                                size='27px'
                                color='#0e1731'
                                link={true}
                                linkTo='/the_team'
                                add={{
                                    display:'inline-block',
                                    marginBottom:'27px',
                                    border:'1px solid #0e1731'

                                }}>

                                    Meet Them Here
                                </Tag>
                            </div>

                        </div>
                    </div>

                </div>

            </div>

        </Fade>
    )
}


export default MeetPlayer;