import axios from "axios"
import { useState, useEffect, useCallback } from 'react'
import { useParams, Link, useNavigate } from "react-router-dom"
import Jumbotron from "../templates/Jumbotron";
import { toast } from "react-toastify";
import { HashLoader } from "react-spinners";

export default function PokemonDetail() {

    const { pokemonNo } = useParams();

    const [pokemon, setPokemon] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        axios({
            url: `http://localhost:8080/pokemon/${pokemonNo}`,
            method: "get"
        }).then(response => {
            setPokemon(response.data);
        })
    }, []);
    // pokemonNo가 바뀔 때만 불러옴

    const deleteData = useCallback(()=>{
        const choice = window.confirm("삭제 리얼리?");
        if (choice == false)
            return;

        axios({
            url: `http://localhost:8080/pokemon/${pokemonNo}`,
            method: "delete"
        }).then(response => {
            toast.error("포켓몬 삭제 완료");
            navigate("/pokemon/list");
        })
    }, [pokemonNo]);

    if (pokemon === null) {
        return (
            <div className="row mt-4">
                <div className="col d-flex justify-content-center">
                    <HashLoader size={100} color="red" />
                </div>
            </div>
        )
    }

    return (
        <>
            <Jumbotron subject="pokemon-detail" detail="포켓몬 상세보기" />

            <div className="row mt-4 fs-2">
                <div className="col-3 text-primary">번호</div>
                <div className="col-9">{pokemon.pokemonNo}</div>
            </div>

            <div className="row mt-4 fs-2">
                <div className="col-3 text-primary">이름</div>
                <div className="col-9">{pokemon.pokemonName}</div>
            </div>

            <div className="row mt-4 fs-2">
                <div className="col-3 text-primary">속성</div>
                <div className="col-9">{pokemon.pokemonType}</div>
            </div>

            <div className="row mt-4 fs-2">
                <div className="col-3 text-primary">좋아요</div>
                <div className="col-9">{pokemon.pokemonLike}</div>
            </div>


            <div className="row mt-4">
                <div className="col">
                    <Link to="/pokemon/add" className="btn btn-success">신규 등록</Link>
                    <Link to="/pokemon/list" className="btn btn-secondary ms-2">목록으로</Link>
                    <Link to={`/pokemon/edit/${pokemonNo}`} className="btn btn-warning ms-2">전체 수정</Link>
                    <button className="btn btn-danger ms-2" onClick={deleteData}>삭제하기</button>
                </div>
            </div>

            <div className="row mt-4">
                <div className="col d-flex justify-content-center">
                    <HashLoader size={100} color="red" />
                </div>
            </div>
        </>
    )
}