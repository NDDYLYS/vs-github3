import { useEffect } from "react";
import Jumbotron from "../templates/Jumbotron";
import { useCallback } from "react";
import { useState } from "react";
import axios from "axios";

export default function PokemonPagination() {
    const [pokemonList, setPokemonList] = useState([]);
    const [page, setPage] = useState(1);
    const [info, setInfo] = useState({
        page: 0, size: 0, begin: 0, end: 0, count: 0, last: true
    });

    const loadData = useCallback(async () => {
        try {
            const response = await axios.get(`/pokemon/page/${page}`);
            if (page == 1)
                setPokemonList(response.data.list);
            else {
                //setPokemonList([...pokemonList, response.data]);
                setPokemonList(prev => ([...prev, ...response.data.list]));
            }

            const { list, ...other } = response.data;
            setInfo(other);
        }
        catch (err) {
        }
    }, [page]);

    useEffect(() => {
        //console.log("현재페이지 : ", page);
        loadData();
    }, [page]);

    return (
        <>
            <Jumbotron subject="PokemonPagination" detail="pokemon-list에 페이징을 적용한다"></Jumbotron>

            <div className="row mt-4">
                <div className="col">
                    <ul className="list-group list-group-flush">
                        {pokemonList.map(pokemon => (
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

                    {info.last === false && (
                        <button type="button" className="btn btn-lg btn-success mt-4 w-100"
                            onClick={() => setPage(page + 1)}>
                            <span>더보기({info.begin}-{info.end}/총 {info.count})</span>
                        </button>
                    )}
                </div>
            </div>
        </>
    )
}