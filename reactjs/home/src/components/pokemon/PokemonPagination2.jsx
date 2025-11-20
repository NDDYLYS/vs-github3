import { useEffect, useRef } from "react";
import Jumbotron from "../templates/Jumbotron";
import { useCallback } from "react";
import { useState } from "react";
import axios from "axios";
import { throttle, debounce } from "lodash"
import "./PokemonPagination.css";

export default function PokemonPagination2() {
    const [pokemonList, setPokemonList] = useState([]);
    const [page, setPage] = useState(1);
    const [info, setInfo] = useState({
        page: 0, size: 0, begin: 0, end: 0, count: 0, last: true
    });

    const loadData = useCallback(async () => {
        try {
            loading.current = true;
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

        loading.current = false;
    }, [page]);

    useEffect(() => {
        //console.log("현재페이지 : ", page);
        loadData();
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

        // 부동 소수점 오차 보정: 
        // 스크롤 가능한 최대 높이와 현재 스크롤 위치의 차이가 1px 미만이면 100%로 간주
        if (scrollableHeight - scrollTop < 1) {
            return 100;
        }

        // (현재 스크롤 위치 / 스크롤 가능한 최대 높이) * 100
        const percentage = (scrollTop / scrollableHeight) * 100;

        return percentage;
    }, []); // 의존성 배열이 비어있으므로 컴포넌트 마운트 시 한 번만 생성됩니다.

    
    const listner = throttle(e => {
        const p = getScrollPercent();
        console.log("스크롤 감지", p);
        if (p === 100 && loading.current === false)
            setPage(prev=>prev+1);
    }, 250);

    useEffect(() => {
        window.addEventListener("scroll", listner);
        // effect clean up
        return () => {
            window.removeEventListener("scroll", listner);
        };
    }, []);

    const loading = useRef(false);

    return (
        <>
            <Jumbotron subject="PokemonPagination2" detail="infinity-scroll에 대해 알아보자"></Jumbotron>

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