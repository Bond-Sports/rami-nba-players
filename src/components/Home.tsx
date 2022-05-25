import React from 'react'
import Players from "./Players";
import FavPlayers from "./FavPlayers";
import {Divider} from 'primereact/divider';

const Home: React.FunctionComponent = () => {
    /**
     * @see
     * usinng inline styling isn't really best practice
     */
    const displayStyle = {display:'flex'};
    const flexStyle = {flex: '1 1 auto'}

    /**
     * @see
     * why Players and FavPlayers isn't the same component with some flag?
     */
    return (
        <div style={displayStyle}>
            <div style={flexStyle}><Players/></div>
            <Divider layout="vertical" />
            <div style={flexStyle}><FavPlayers/></div>
        </div>
    )
}

export default Home;