import { useCallback, useEffect, useRef, useState } from "react";
import Jumbotron from "../templates/Jumbotron";
import axios from "axios";
import { FaChevronDown, FaHeart, FaPlus } from "react-icons/fa6";
import { throttle, debounce } from "lodash";
//throttle : 특정 함수의 실행 빈도를 강제로 지정하는 함수 (250ms마다 1번만 허용)
// - scroll, resize, keyboard이벤트 등 빈도가 매우 높은 작업을 제어해야할 때 사용
//debounce : 특정 함수의 실행을 일정 시간 이상 쉬었을 때 가능하도록 지정하는 함수(마지막 작업 후 250ms 뒤 실행)
// - 어떤 작업을 마치고 난 시점에 실행해야할 때 사용 (ex : 마지막 키 입력 후 일정 시간 뒤 실행, onBlur와 비슷..)
// - 아이디 중복 검사에 활용 가능
//사용법은 기존의 함수를 Wrapping 하여 사용 (setTimeout과 유사한 형태)
//- 기존 : const f = ()=>{};
//- throttle 적용 : const f = throttle(()=>{}, 딜레이);
//- debounce 적용 : const f = debounce(()=>{}, 딜레이);

export default function PokemonPagination3() {
    //state
    const [pokemonList, setPokemonList] = useState([]);//목록
    const [page, setPage] = useState(1);//페이지번호

    const [info, setInfo] = useState({
        page : 0, size : 0 , begin : 0 , end : 0 , count : 0 , last : true
    });

    //ref
    //- ref와 state는 둘 다 값을 가질 수 있는 도구
    //- ref에는 추가적으로 태그와 연결할 수 있는 설정이 존재
    //- ref는 목적이 태그 제어이기때문에 순서가 보장되어야 한다(=동기 방식 처리)
    //- state는 목적이 값을 효율적으로 제어하는 것이기 때문에 각각에 대해서 순서가 보장될 필요가 없다    
    const loading = useRef(false);

    //effect
    useEffect(()=>{
        //console.log("현재 페이지 번호 : ", page);
        loadData();
    }, [page]);//page가 변할 때마다 실행해라!

    //최초 1회 실행하여 window에 스크롤 이벤트를 추가
    useEffect(()=>{
        //함수를 변수처럼 생성
        //- lodash 라이브러리를 이용해서 쓰로틀링(throttle) 처리를 구현
        // const listener = e=>{console.log("Throttle 적용 전")};
        const listener = throttle(e=>{
            const percent = getScrollPercent();
            console.log("현재 스크롤 위치 : " + percent);
            if(percent === 100 && loading.current === false) {//90%↑ + 로딩중이 아닌경우
                setPage(prev=>prev+1);//page를 직전값+1로 변경 (=다음페이지)
            }
        }, 500);

        window.addEventListener("scroll", listener);

        //effect cleanup 함수 - 이펙트가 종료되는 시점에 실행할 코드를 작성
        return ()=>{
            window.removeEventListener("scroll", listener);
        };
    }, []);

    //callback
    const loadData = useCallback(async ()=>{
        //로딩 시작(flag on)
        loading.current = true;

        const response = await axios.get(`http://localhost:8080/pokemon/page/${page}`);
        if(page === 1) {//첫페이지면
            setPokemonList(response.data.list);//덮어쓰기 수행
        }
        else {//첫페이지가 아니면
            //setPokemonList(pokemonList.concat(...response.data.list));//concat 함수 (연관항목에 pokemonList가 필요)
            //setPokemonList([...pokemonList, ...response.data.list]);//전개 연산 (연관항목에 pokemonList가 필요)
            setPokemonList(prev=>([...prev, ...response.data.list]));//연관항목 없이도 가능한 코드
        }
        //페이지 번호와 목록 데이터를 제외한 나머지를 info에 저장
        
        //response.data에서 list 빼고 others라고 부르겠다
        const {list, ...others} = response.data;
        setInfo(others);

        //로딩 종료(flag off)
        loading.current = false;
    }, [page]);

    /**
     * 현재 윈도우 스크롤 위치를 0-100 사이의 백분율로 반환합니다.
     * (useCallback으로 메모이제이션됨)
     */
    const getScrollPercent = useCallback(() => {
        // 현재 스크롤 Y 위치
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        
        // 문서 전체의 스크롤 가능한 총 높이
        const scrollHeight = document.documentElement.scrollHeight;
        
        // 브라우저 뷰포트(창)의 높이
        const clientHeight = document.documentElement.clientHeight;

        // 스크롤이 불가능한 경우 (콘텐츠가 창보다 작음) 0 반환
        if (scrollHeight <= clientHeight) {
            return 0;
        }

        // 스크롤 가능한 실제 최대 높이 (전체 높이 - 보이는 높이)
        const scrollableHeight = scrollHeight - clientHeight;
        
        // (현재 스크롤 위치 / 스크롤 가능한 최대 높이) * 100
        const percentage = (scrollTop / scrollableHeight) * 100;
        
        return percentage;
    }, []); // 의존성 배열이 비어있으므로 컴포넌트 마운트 시 한 번만 생성됩니다.

    //render
    return (<>
        <Jumbotron subject="무한 스크롤 방식" detail="스크롤 위치에 따른 자동 더보기 처리"/>

        {/* List Group 형태로 출력 */}
        <div className="row mt-4">
            <div className="col">
                <ul className="list-group list-group-flush">
                    {pokemonList.map(pokemon=>(
                    <li className="list-group-item" key={pokemon.pokemonNo}>
                        <div className="p-4 shadow rounded">
                            <div className="fs-2 d-flex align-items-center">
                                <span className="badge text-bg-primary">{pokemon.pokemonNo}</span> 
                                <span className="ms-4">{pokemon.pokemonName}</span>
                                <span className="text-danger ms-4">
                                    <FaHeart/> {pokemon.pokemonLike} 
                                </span>
                            </div>
                            <p className="text-muted">{pokemon.pokemonType}</p>
                            <p>몬스터 상세설명</p>
                        </div>
                    </li>
                    ))}
                </ul>

            </div>
        </div>
    </>)
}