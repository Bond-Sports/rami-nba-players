import React, {useState} from "react";
import useStore from "../store/store";
import {Divider} from "primereact/divider";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Player_interface} from "../interfaces/player_interface";
import {Button} from "primereact/button";

enum COLORS {
    DEFAULT = 'white',
    PURPLE = 'mediumpurple',
    GREEN = 'green',
    RED = 'red',
    BLACK = 'black'
}

const FavPlayers: React.FunctionComponent = () =>{
    const remove = useStore(state => state.remove);
    const favs = useStore(state => state.favs);
    const [bgcolor, setBgColor] = useState(COLORS.DEFAULT);

    /**
     * @see
     * this way of implementation, might cause performances issues because of multiple re-renders
     */
    const buttonTemplate = (rowData: Player_interface) => {
        return <Button label="" icon="pi pi-trash" iconPos="right" onClick={() => remove(rowData.id)}/>;
    }

    /**
     * @see
     * seems like a duplicated code, there is a better way to implement
     */
    const headerTemplate = () => {
        return (
            <div className="flex justify-content-end">
                <Button label="Default" className="p-button-raised" style={{marginRight:'10px', backgroundColor: COLORS.BLACK}} onClick={() => setBgColor(COLORS.DEFAULT)}/>
                <Button label="Purple" className="p-button-raised" style={{marginRight:'10px', backgroundColor: COLORS.PURPLE}} onClick={() => setBgColor(COLORS.PURPLE)}/>
                <Button label="Green" className="p-button-raised" style={{marginRight:'10px', backgroundColor: COLORS.GREEN}} onClick={() => setBgColor(COLORS.GREEN)}/>
                <Button label="Red" className="p-button-raised" style={{marginRight:'10px', backgroundColor: COLORS.RED}} onClick={() => setBgColor(COLORS.RED)}/>
            </div>)
    }

    /**
     * @see
     * every rerender of the component it will run this as well...
     */
    const header = headerTemplate();

    return (
        <div>
            <Divider align="center">
                <span className="p-tag">Favourite Players</span>
            </Divider>

            <div className="card" >
                <DataTable value={favs} scrollable scrollHeight="500px" virtualScrollerOptions={{ itemSize: 10 }}  size={'small'} header={header} >
                    <Column field="first_name" header="First Name" style={{backgroundColor: bgcolor}}></Column>
                    <Column field="last_name" header="Last Name" style={{backgroundColor:bgcolor}}></Column>
                    <Column header="" body={buttonTemplate} style={{backgroundColor:bgcolor}}/>
                </DataTable>
            </div>
        </div>
    )
}

export default FavPlayers;