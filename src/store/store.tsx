import create from "zustand";
import {Player_interface} from "../interfaces/player_interface";

type State = {
    favs: Array<Player_interface>;
    add: (player: Player_interface) => void;
    remove: (id: number) => void;
    clear: () => void;
};

const useStore = create<State>(set => ({
    favs: [],
    add: (player: Player_interface) => set(state => ({ favs: [...state.favs,player]})),
    remove: (id: number) => set(state => ({favs: state.favs.filter((f) => f.id !== id)})),
    clear: () => set({ favs: [] })
}));

export default useStore;