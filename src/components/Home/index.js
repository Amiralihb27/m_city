import React,{useEffect} from "react";
import Featured from "./featured";
import MatchesHome from "./matches";
import MeetPlayer from "./meetPlayers";
import Promotion from "./promotion";


const Home = () =>{
    useEffect(()=>{
        window.scrollTo(0,0)
    },[])
    return(
        <div className="bck_blue">
            <Featured/>
            <MatchesHome/>
            <MeetPlayer/>
            <Promotion/>
        </div>
    )
}

export default Home;