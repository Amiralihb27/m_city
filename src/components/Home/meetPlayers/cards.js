import React from "react";
import { easePolyInOut } from "d3-ease";
import Otamendi from '../../../Resources/images/players/Otamendi.png';
import Sterling from '../../../Resources/images/players/Raheem_Sterling.png';
import kompany from '../../../Resources/images/players/Vincent_Kompany.png'; 
import { motion } from 'framer-motion';


let cards=[
    {
        bottom:90,
        left:300,
        player:kompany

    },
    {
        bottom:60,
        left:200,
        player:Sterling

    },
    {
        bottom:30,
        left:100,
        player:Otamendi

    },
    {
        bottom:0,
        left:0,
        player:kompany

    }

]
const HomeCards = (props)=>{
    const showAnimateCrads = ()=>{
        cards.map((card,index)=>{
            
        })
    }


    return(
        <div>
            {showAnimateCrads()}
        </div>
    )
}

export default HomeCards;