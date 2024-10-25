import React from 'react';

const PlayerCard = ({image,number,name,lastname}) => {
    return(
        <div className="player_card_wrapper ">
            <div
                className="player_card_thmb"
                style={{ background:`#f2f9ff url(${image})`}}
            >
            </div>
            <div className="player_card_nfo ">
                <div className="player_card_number no-select">
                    {number}
                </div>
                <div className="player_card_name ">
                    <span>{name}</span>
                    <span>{lastname}</span>
                </div>

            </div>
        </div>
    )
}

export default PlayerCard;