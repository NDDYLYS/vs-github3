import { Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";
import Home from "./Home"

import Pokemon from "./pokemon/Pokemon"
import PokemonEdit from "./pokemon/PokemonEdit";

import PokemonAdd from "./pokemon/pokemonAdd";
import PokemonList from "./pokemon/pokemonList";
import PokemonDetail from "./pokemon/pokemonDetail";

import Student from "./Student"

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
                        <Route path="/pokemon/detail" element={<PokemonDetail/>}></Route>

                        <Route path="/student" element={<Student/>}></Route>
                    </Routes>

                </div>
            </div>

        </>
    )
}