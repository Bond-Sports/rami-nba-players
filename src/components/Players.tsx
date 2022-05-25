import React, {useEffect, useState} from "react";
import {Button} from 'primereact/button';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {InputText} from 'primereact/inputtext';
import {Divider} from 'primereact/divider';
import {BlockUI} from 'primereact/blockui';
import {ProgressBar} from 'primereact/progressbar';
import {Player_interface} from '../interfaces/player_interface';
import useStore from '../store/store'

const Players: React.FunctionComponent = () => {
    const [loading, setLoading] = useState(false);
    /**
     * @see
     * why there is no type here?
     */
    const [players, setPlayers] = useState([]);
    const [allPlayers, setAllPlayers] = useState([]);
    const add = useStore(state => state.add);


    // when component mounts
    useEffect(() => {
        /**
         * @see
         * weird implementation, why runing function with empty "then"
         */
        const fetchPlayers = async () => {
            setLoading(true);

            const url = 'https://www.balldontlie.io/api/v1/players';
            const response = await fetch(url);
            const json = response ? await response.json() : [];

            setAllPlayers(json.data); // get all players
            setPlayers(json.data);
            setLoading(false);
        }

        fetchPlayers().then(r => null)
    }, []);

    // for the search box
    const filter = (text: string) => {
        if (!text) return;

        const filtered = allPlayers.filter((p: Player_interface) => p.first_name.toLowerCase().includes(text) || p.last_name.toLowerCase().includes(text));
        setPlayers(filtered);
    }

    // we want to disable the add button of players that are already favourite's
    const IsDisabled = (id: number) => { // must start with capital or with "use" to init the useStore
        const favs = useStore(state => state.favs);
        const player = favs.find((f: Player_interface) => f.id === id);

        return !!player;
    }

    const buttonTemplate = (rowData: Player_interface) => {
        return <Button label="" icon="pi pi-plus" iconPos="right" onClick={() => add(rowData)}
                       disabled={IsDisabled(rowData.id)}/>;
    }

    const headerTemplate = () => {
        return (
            <div className="flex justify-content-end">
                <span className="p-input-icon-left">
                        <i className="pi pi-search"/>
                        <InputText onChange={(e) => filter(e.target.value)} placeholder="Search"/>
                </span>
            </div>)
    }

    const header = headerTemplate();

    return (
        <div>
            <BlockUI blocked={loading} fullScreen/>
            <ProgressBar mode="indeterminate" style={{height: '6px', display: loading ? 'block' : 'none'}}/>


            <Divider align="center">
                <span className="p-tag">Players</span>
            </Divider>

            <div className="card">
                <DataTable value={players} scrollable scrollHeight="500px" virtualScrollerOptions={{itemSize: 10}} header={header} size={'small'}>
                    <Column field="first_name" header="First Name"></Column>
                    <Column field="last_name" header="Last Name"></Column>
                    <Column header="" body={buttonTemplate}/>
                </DataTable>
            </div>

        </div>
    )
}

export default Players;