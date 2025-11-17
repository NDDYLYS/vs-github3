import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Jumbotron from "../templates/Jumbotron";
import axios from "axios";
import { toast } from "react-toastify";
import { Modal } from "bootstrap";
import { FaTrash } from "react-icons/fa6";

export default function Pokemon() {
    const [pokemonList, setPokemonList] = useState([]);//목록
    const [pokemon, setPokemon] = useState({//입력(수정?)
        pokemonName: "", pokemonType: ""
    });
    const [pokemonClass, setPokemonClass] = useState({//입력 피드백
        pokemonName: "", pokemonType: ""
    });

    //effect
    useEffect(() => {
        loadData();
    }, []);

    const loadData = useCallback(async () => {
        try {
            const response = await axios.get("http://localhost:8080/pokemon/");
            setPokemonList(response.data);
        }
        catch (err) {
            //에러 발생 시 실행할 코드 (기존의 .catch 메소드)
        }
    }, []);

    const changeStrValue = useCallback(e => {
        const { name, value } = e.target;
        setPokemon({ ...pokemon, [name]: value });
    }, [pokemon]);
    const changeNumberValue = useCallback(e => {
        const { name, value } = e.target;
        const replacement = value.replace(/[^0-9]+/g, "");
        const number = replacement.length === 0 ? 0 : parseInt(replacement);
        setPokemon({ ...pokemon, [name]: number });
    }, [pokemon]);

    const checkPokemonName = useCallback(e => {
        const regex = /^[가-힣]{1,10}$/;
        //const isValid = regex.test(e.target.value);
        const isValid = regex.test(pokemon.pokemonName);
        setPokemonClass({
            ...pokemonClass,
            pokemonName: isValid ? "is-valid" : "is-invalid"
        });
    }, [pokemon, pokemonClass]);
    const checkPokemonType = useCallback(e => {
        const regex = /^[가-힣]{1,10}$/;
        //const isValid = regex.test(e.target.value);
        const isValid = regex.test(pokemon.pokemonType);
        setPokemonClass({
            ...pokemonClass,
            pokemonType: isValid ? "is-valid" : "is-invalid"
        });
    }, [pokemon, pokemonClass]);

    //memo
    const pokemonValid = useMemo(() => {
        if (pokemonClass.pokemonName !== "is-valid") return false;
        if (pokemonClass.pokemonType !== "is-valid") return false;
        return true;
    }, [pokemonClass]);

    const sendData = useCallback(async () => {
        if (pokemonValid === false) return;

        try {
            const response = await axios.post("http://localhost:8080/pokemon/", pokemon);
            toast.success("신규 등록 완료");
            clearData();
            loadData();
            closenclear_Modal();
        }
        catch (err) {
            //에러 발생 시 할 일
        }
    }, [pokemon, pokemonValid]);

    //입력창 초기화
    const clearData = useCallback(() => {
        setPokemon({ pokemonName: "", pokemonType: "" });
        setPokemonClass({ pokemonName: "", pokemonType: "" });
    }, []);

    //MODAL - ref || ref라는 속성을 만들어서 연결
    // 작업이 끝나면 document.querySelector() 처럼 modal.current로 사용 가능 
    const modal = useRef();

    const openModal = useCallback(() => {
        var instance = Modal.getOrCreateInstance(modal.current);
        instance.show();
    }, [modal]);
    const closeModal = useCallback(() => {
        var instance = Modal.getInstance(modal.current);
        instance.hide();
    }, [modal]);
    const closenclear_Modal = useCallback(() => {
        var instance = Modal.getInstance(modal.current);
        instance.hide();
        clearData();
    }, [modal]);

    const deleteData = useCallback(async (pokemon)=>{
        try{
            const response = await axios.delete(`http://localhost:8080/pokemon/${pokemon.pokemonNo}`);
            loadData();
        } catch(err){
            // try catch
        }
    }, []);


    //render
    return (<>
        <Jumbotron subject="pokemon-spa" detail="one page -> crud process" />

        <div className="row mt-4">
            <div className="col text-end">
                <button type="button" className="btn btn-success" onClick={openModal}>포켓몬 등록</button>
            </div>
        </div>


        {/* 포켓몬 목록 */}
        <div className="row mt-4">
            <div className="col">
                <div className="text-nowrap table-responsive">
                    <table className="table table-striped table-hover">
                        <thead className="text-center">
                            <tr>
                                <th>번호</th>
                                <th>이름</th>
                                <th>속성</th>
                                <th>좋아요</th>
                                <th>관리</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {pokemonList.map(pokemon => (
                                <tr key={pokemon.pokemonNo}>
                                    <td>{pokemon.pokemonNo}</td>
                                    <td>{pokemon.pokemonName}</td>
                                    <td>{pokemon.pokemonType}</td>
                                    <td>{pokemon.pokemonLike}</td>
                                    <td><FaTrash onClick={e=>{deleteData(pokemon);}}></FaTrash></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <div className="modal fade" tabindex="-1" data-bs-backdrop="static" ref={modal}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">포켓몬 신규 등록</h5>
                    </div>
                    <div className="modal-body">
                        <div className="row mt-4">
                            <label className="col-sm-3 col-form-label">포켓몬 이름</label>
                            <div className="col-sm-9">
                                <input type="text" name="pokemonName"
                                    className={`form-control ${pokemonClass.pokemonName}`}
                                    value={pokemon.pokemonName} onChange={changeStrValue}
                                    onBlur={checkPokemonName} />
                                <div className="valid-feedback">멋진 이름입니다!</div>
                                <div className="invalid-feedback">10글자 이내로 작성하세요</div>
                            </div>
                        </div>
                        <div className="row mt-4">
                            <label className="col-sm-3 col-form-label">포켓몬 속성</label>
                            <div className="col-sm-9">
                                <input type="text" name="pokemonType"
                                    className={`form-control ${pokemonClass.pokemonType}`}
                                    value={pokemon.pokemonType} onChange={changeStrValue}
                                    onBlur={checkPokemonType} />
                                <div className="valid-feedback">올바른 형식입니다</div>
                                <div className="invalid-feedback">10글자 이내로 작성하세요</div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <div className="row mt-4 d-flex text-end">
                            <div className="col">
                                <button type="button" className="btn btn-primary" onClick={closenclear_Modal}>취소</button>
                            </div>
                            <div className="col">
                                <button type="button" className="btn btn-success"
                                    disabled={pokemonValid === false} onClick={sendData}>
                                    <span>등록</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}