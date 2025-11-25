import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"
import Jumbotron from "../templates/Jumbotron";
import { HashLoader } from "react-spinners";
import { useCallback } from "react";
import { toast } from "react-toastify";
import { FaEdit } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa6";

//경로 변수(pokemonNo)를 읽어와서 정보를 조회(ajax)한 뒤 출력
export default function PokemonDetail2() {
    //경로 변수를 읽는 도구 생성
    //const params = useParams();//이렇게 만들 경우 param.pokemonNo로 읽을 수 있음
    const {pokemonNo} = useParams();//구조 분해할당을 이용하여 한번에 원하는 데이터를 추출

    //이동 도구
    const navigate = useNavigate();

    //화면에 정보를 표시하기 위한 state
    const [pokemon, setPokemon] = useState(null);//불러오기 전까지 다른 화면을 보여주고 싶을 때
    const [backup, setBackup] = useState(null);//수정 취소 혹은 수정 실패 등에서 복구에 사용할 정보

    //시작하자마자 정보를 불러오는 코드
    useEffect(()=>{
        axios({
            url: `/pokemon/${pokemonNo}`,
            method: "get"
        })
        .then(response=>{
            setPokemon(response.data);//화면에 표시할 데이터
            setBackup(response.data);//백업에 사용할 데이터
        })
        .catch(err=>{
            toast.error("존재하지 않는 몬스터 번호");
            navigate("/pokemon/list");
        });
    }, []);

    //callback
    const deleteData = useCallback(()=>{
        const choice = window.confirm("정말 삭제하시겠습니까?");
        if(choice === false) return;

        axios({
            url: `/pokemon/${pokemonNo}`,
            method: "delete"
        })
        .then(response=>{
            //삭제 성공 시 해야할 일 (목록으로 이동)
            toast.error("몬스터 정보 삭제 완료");
            navigate("/pokemon/list");
        });
    }, [pokemonNo]);


    //수정 여부를 표시하기 위한 state (true면 수정창으로 변경)
    const [editable, setEditable] = useState({
        pokemonName : false,
        pokemonType : false,
        pokemonLike : false
    });
    const changePokemonNameEditable = useCallback(isEdit=>{
        //연관항목이 없을 경우에도 함수 형태로 초기화를 시키면 최신 데이터 유지가 된다

        // 1. 연관항목이 설정되어 있을 경우
        // setEditable({
        //     ...editable,
        //     pokemonName : isEdit
        // });

        // 2. 연관항목을 설정할 수 없거나 설정하기 까다로운 경우
        // - prev가 직전의 상태(지금은 editable)
        // setEditable(prev=>{
        //     return {...prev, pokemonName : isEdit };
        // });
        setEditable(prev=>({...prev, pokemonName : isEdit }));
    }, []);
    const changePokemonTypeEditable = useCallback(isEdit=>{
        setEditable(prev=>({
            ...prev,
            pokemonType : isEdit
        }));
    }, []);
    const changePokemonLikeEditable = useCallback(isEdit=>{
        setEditable(prev=>({
            ...prev,
            pokemonLike : isEdit
        }));
    }, []);

    //포켓몬 이름 관련 함수
    const cancelPokemonName = useCallback(()=>{
        //원상복구코드
        setPokemon({
            ...pokemon, 
            pokemonName : backup.pokemonName //이름을 백업에서 불러와서 덮어쓰기 (복원처리)
        });
        changePokemonNameEditable(false);
    }, [pokemon, backup]);
    const savePokemonName = useCallback(()=>{
        //ajax로 PATCH매핑을 호출
        axios({
            //url: "/pokemon/"+pokemonNo,
            url: `/pokemon/${pokemonNo}`,
            method: "patch",
            //data: pokemon //이러면 다바뀜
            data : {pokemonName : pokemon.pokemonName}//바꿀 항목만 추출하여 전달
        })
        .then(response=>{
            toast.success("변경사항이 적용되었습니다");
            //다시 백업하는 코드
            setBackup({
                ...backup,
                pokemonName : pokemon.pokemonName
            })
            changePokemonNameEditable(false);
        })
        .catch(err=>{
            toast.error("변경 과정에서 문제가 발생했습니다.");
            //원상복구코드
            setPokemon({
                ...pokemon, 
                pokemonName : backup.pokemonName //이름을 백업에서 불러와서 덮어쓰기 (복원처리)
            });
            changePokemonNameEditable(false);
        });
    }, [pokemon, backup]);

    //포켓몬 속성 관련 함수
    const savePokemonType = useCallback(()=>{
        //ajax로 PATCH매핑을 호출
        axios({
            //url: "/pokemon/"+pokemonNo,
            url: `/pokemon/${pokemonNo}`,
            method: "patch",
            //data: pokemon //이러면 다바뀜
            data : {pokemonType : pokemon.pokemonType}//바꿀 항목만 추출하여 전달
        })
        .then(response=>{
            toast.success("변경사항이 적용되었습니다");
            //다시 백업하는 코드
            setBackup({
                ...backup,
                pokemonType : pokemon.pokemonType
            })
            changePokemonTypeEditable(false);
        })
        .catch(err=>{
            toast.error("변경 과정에서 문제가 발생했습니다.");
            //원상복구코드
            setPokemon({
                ...pokemon, 
                pokemonType : backup.pokemonType //백업에서 불러와서 덮어쓰기 (복원처리)
            });
            changePokemonTypeEditable(false);
        });
    }, [pokemon, backup]);
    const cancelPokemonType = useCallback(()=>{
        //원상복구코드
        setPokemon({
            ...pokemon, 
            pokemonType : backup.pokemonType //백업에서 불러와서 덮어쓰기 (복원처리)
        });
        changePokemonTypeEditable(false);
    }, [pokemon, backup]);

    //포켓몬 좋아요 관련 함수
    const savePokemonLike = useCallback(()=>{
        //ajax로 PATCH매핑을 호출
        axios({
            //url: "/pokemon/"+pokemonNo,
            url: `/pokemon/${pokemonNo}`,
            method: "patch",
            //data: pokemon //이러면 다바뀜
            data : {pokemonLike : pokemon.pokemonLike}//바꿀 항목만 추출하여 전달
        })
        .then(response=>{
            toast.success("변경사항이 적용되었습니다");
            //다시 백업하는 코드
            setBackup({
                ...backup,
                pokemonLike : pokemon.pokemonLike
            })
            changePokemonLikeEditable(false);
        })
        .catch(err=>{
            toast.error("변경 과정에서 문제가 발생했습니다.");
            //원상복구코드
            setPokemon({
                ...pokemon, 
                pokemonLike : backup.pokemonLike //백업에서 불러와서 덮어쓰기 (복원처리)
            });
            changePokemonLikeEditable(false);
        });
    }, [pokemon, backup]);
    const cancelPokemonLike = useCallback(()=>{
        //원상복구코드
        setPokemon({
            ...pokemon, 
            pokemonLike : backup.pokemonLike //백업에서 불러와서 덮어쓰기 (복원처리)
        });
        changePokemonLikeEditable(false);
    }, [pokemon, backup]);


    //입력 함수
    const changeStrValue = useCallback(e=>{
        const {name, value} = e.target;//이벤트 대상에 적혀있는 name과 value를 추출
        setPokemon({//pokemon을 변경하는데
            ...pokemon, //나머지 정보는 유지하고
            [name] : value//name에 해당하는 항목의 값만 value로 수정하세요
        });
    }, [pokemon]);
    const changeNumberValue = useCallback(e=>{
        const {name, value} = e.target;//이벤트 대상에 적혀있는 name과 value를 추출
        const regex = /[^0-9]+/g;//숫자를 제외한 나머지를 개수 제한 없이(g) 찾기 위한 정규표현식
        const replacement = value.replace(regex, "");//숫자가 아닌 항목들을 모두 제거(빈칸으로 변경)
        //const number = replacement.length === 0 ? "" : parseInt(replacement);//없을 경우 빈칸으로
        const number = replacement.length === 0 ? 0 : parseInt(replacement);//없을 경우 0으로
        setPokemon({//pokemon을 변경하는데
            ...pokemon,//나머지 항목들은 유지하고
            [name] : number,//name 항목만 number로 변경
        });
    }, [pokemon]);

    //대기화면 효과 (초기값이 null일 경우만 의미가 있음, 빈 객체면 생략)
    if(pokemon?.length > 0) {
        return (
            <div className="row mt-4">
                <div className="col d-flex justify-content-center">
                    <HashLoader size={100} color="#d63031"/>
                </div>
            </div>
        )
    }

    //render
    return (<>
        
        <Jumbotron subject={`${pokemonNo} 번 몬스터 정보`}
                            detail="몬스터 정보를 확인하세요!"/>

        <div className="row mt-4 fs-2">
            <div className="col-sm-3 text-primary">번호</div>
            <div className="col-sm-9">{pokemon.pokemonNo}</div>
        </div>

        <div className="row mt-4 fs-2">
            <div className="col-sm-3 text-primary">이름</div>
            <div className="col-sm-9 d-flex align-items-center">
                { editable.pokemonName ? (<>
                    {/* 수정화면 */}
                    <input type="text" name="pokemonName" className="form-control w-auto"
                            value={pokemon.pokemonName} onChange={changeStrValue} />
                    {/* 취소버튼 (cancel~) */}
                    <FaXmark className="ms-4" onClick={cancelPokemonName}/>
                    {/* 저장버튼 (save~) */}
                    <FaCheck className="ms-2" onClick={savePokemonName}/>
                </>) : (<>
                    {/* 일반화면 */}
                    {pokemon.pokemonName}
                    {/* 수정버튼 */}
                    <FaEdit className="ms-4" onClick={e=>{
                        //setEditable({...editable, pokemonName: true});
                        changePokemonNameEditable(true);
                    }}/>
                </>) }
            </div>
        </div>

        <div className="row mt-4 fs-2">
            <div className="col-sm-3 text-primary">속성</div>
            <div className="col-sm-9 d-flex align-items-center">
                { editable.pokemonType ? (<>
                    <input type="text" name="pokemonType" className="form-control w-auto"
                            value={pokemon.pokemonType} onChange={changeStrValue} />
                    {/* 취소버튼 (cancel~) */}
                    <FaXmark className="ms-4" onClick={cancelPokemonType}/>
                    {/* 저장버튼 (save~) */}
                    <FaCheck className="ms-2" onClick={savePokemonType}/>
                </>) : (<>
                    {pokemon.pokemonType}
                    {/* 수정버튼 */}
                    <FaEdit className="ms-4" onClick={e=>{
                        changePokemonTypeEditable(true);
                    }}/>
                </>) }
            </div>
        </div>

        <div className="row mt-4 fs-2">
            <div className="col-sm-3 text-primary">좋아요</div>
            <div className="col-sm-9 d-flex align-items-center">
                { editable.pokemonLike ? (<>
                    <input type="text" name="pokemonLike" className="form-control w-auto"
                            value={pokemon.pokemonLike} onChange={changeNumberValue} 
                            inputMode="numeric"/>
                    {/* 취소버튼 (cancel~) */}
                    <FaXmark className="ms-4" onClick={cancelPokemonLike}/>
                    {/* 저장버튼 (save~) */}
                    <FaCheck className="ms-2" onClick={savePokemonLike}/>
                </>) : (<>
                    {pokemon.pokemonLike}
                    {/* 수정버튼 */}
                    <FaEdit className="ms-4" onClick={e=>{
                        changePokemonLikeEditable(true);
                    }}/>
                </>) }
            </div>
        </div>

        <div className="row mt-5">
            <div className="col">
                <Link to="/pokemon/add" className="btn btn-success">신규등록</Link>
                <Link to="/pokemon/list" className="btn btn-secondary ms-2">목록보기</Link>
                <button className="btn btn-danger ms-2" onClick={deleteData}>삭제하기</button>
            </div>
        </div>

    </>)
}