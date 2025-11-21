import { Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";
import Home from "./Home"

import Pokemon from "./pokemon/Pokemon"
import PokemonEdit from "./pokemon/PokemonEdit";
import PokemonAdd from "./pokemon/PokemonAdd";
import PokemonList from "./pokemon/PokemonList";
import PokemonDetail from "./pokemon/PokemonDetail";
import PokemonDetail2 from "./pokemon/PokemonDetail2";
import PokemonPagination from "./pokemon/PokemonPagination";
import PokemonPagination2 from "./pokemon/PokemonPagination2";
import PokemonPagination3 from "./pokemon/PokemonPagination3";

import Student from "./Student"
import AccountJoin from "./account/AccountJoin";
import AccountJoinFinish from "./account/AccountJoinFinish";


export default function Content (){

    return (
        <>
            <div className="row">
                <div className="col-md-10 offset-md-1">

                    <Routes>
                        <Route path="/" element={<Home/>}></Route>

                        <Route path="/pokemon/spa" element={<Pokemon/>}></Route>
                        <Route path="/pokemon/list" element={<PokemonList/>}></Route>
                        <Route path="/pokemon/add" element={<PokemonAdd/>}></Route>
                        <Route path="/pokemon/edit" element={<PokemonEdit/>}></Route>
                        <Route path="/pokemon/detail/:pokemonNo" element={<PokemonDetail/>}></Route>
                        <Route path="/pokemon/detail2/:pokemonNo" element={<PokemonDetail2/>}></Route>
                        <Route path="/pokemon/pagination" element={<PokemonPagination/>}></Route>
                        <Route path="/pokemon/pagination2" element={<PokemonPagination2/>}></Route>
                        <Route path="/pokemon/pagination3" element={<PokemonPagination3/>}></Route>

                        <Route path="/student" element={<Student/>}></Route>

                    
                        <Route path="/account/AccountJoin" element={<AccountJoin/>}></Route>
                        <Route path="/account/AccountJoinFinish" element={<AccountJoinFinish/>}></Route>
                    </Routes>

                </div>
            </div>

        </>
    )
}