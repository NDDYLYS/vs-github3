import { useEffect } from "react";
import Jumbotron from "../templates/Jumbotron";
import { useCallback } from "react";
import { useState } from "react";
import axios from "axios";

export default function PokemonPagination() {
    const [pokemonList, setPokemonList] = useState([]);

    const loadData = useCallback(async () => {
        try {
            const response = await axios.get("http://localhost:8080/pokemon/");
            setPokemonList(response.data);
        }
        catch (err) {
        }
    }, []);

    useEffect(() => {
        loadData();
    }, []);

    return (
        <>
            <Jumbotron subject="PokemonPagination" detail="pokemon-list에 페이징을 적용한다"></Jumbotron>

            <div className="row mt-4">
                <div className="col">
                    <ul className="list-group list-group-flush">
                        {pokemonList.map(pokemon=>(
                            <li className="list-group-item">
                                <div className="p-4 shadow rounded">
                                    <div className="fs-2 d-flex align-items-center">
                                        {pokemon.pokemonName}
                                    </div>
                                    <p className="text-muted">{pokemon.pokemonType}</p>
                                    <p>상세설명-상세설명-상세설명-상세설명-상세설명-상세설명</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
}