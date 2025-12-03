import { Link, useNavigate } from "react-router-dom";
import { useCallback, useEffect, useRef, useState } from "react";
import { useAtom, useAtomValue } from "jotai";
import { adminState, loginIdState, loginLevelState, loginState, accessTokenState, clearLoginState } from "../utils/jotai";
import axios from "axios";

export default function Menu() {
    const navigate = useNavigate();

    const [loginId, setLoginId] = useAtom(loginIdState);
    const [loginLevel, setLoginLevel] = useAtom(loginLevelState);
    const [accessToken, setAccessToken] = useAtom(accessTokenState);

    const isLogin = useAtomValue(loginState);
    const isAdmin = useAtomValue(adminState);
    const [, clearLogin] = useAtom(clearLoginState);
    // const clearLogin = useSetAtom(clearLoginState);

    const logout = useCallback(async (e) => {
        e.stopPropagation();
        e.preventDefault();

        //setLoginId("");
        //setLoginLevel("");
        //setAccessToken("");
        clearLogin();

        delete axios.defaults.headers.common["Authorization"];

        navigate("/");

        closeMenu();


        //await axios.delete("/account/logout", account);
    });

    const [open, setOpen] = useState(false);
    const toggleMenu = useCallback(() => { setOpen(prev => !prev); }, []);

    //메뉴 및 외부 영역 클릭 시 메뉴가 닫히도록 처리하는 코드
    //- 메뉴를 클릭했을 때 닫히게 하는 것은 메뉴에 onClick 설정을 하면 됨
    //- 메뉴가 아닌 외부영역을 클릭했을 때 감지하고 싶다면 window에 mousedown 이벤트를 설정
    const closeMenu = useCallback(() => { setOpen(false); }, []);
    const menuRef = useRef();//메뉴 영역을 선택해둘 리모컨
    useEffect(() => {
        //클릭 감지 함수
        const listener = e => {
            // if(메뉴가 열려있고 클릭한 장소가 메뉴영역이 아니라면) {
            if (open === true && menuRef.current.contains(e.target) === false) {
                closeMenu();
            }
        };
        window.addEventListener("mousedown", listener);
        return () => {//clean up 함수
            window.removeEventListener("mousedown", listener);
        };
    }, [open]);

    useEffect(() => {
        // console.log("accessToken", accessToken);
        if (accessToken?.length > 0) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        }
    }, [accessToken]);

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-dark fixed-top" data-bs-theme="dark" ref={menuRef}>
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/" onClick={closeMenu}>KH정보교육원</Link>

                    <button className="navbar-toggler" type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#menu-body"
                        aria-controls="menu-body"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                        onClick={toggleMenu}>
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className={`collapse navbar-collapse ${open && 'show'}`} id="menu-body">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" data-bs-toggle="dropdown" to="#" role="button" aria-haspopup="true" aria-expanded="false">Pokemon</Link>
                                <div className="dropdown-menu">
                                    <Link className="dropdown-item" to="/pokemon/spa">포켓몬(SPA)</Link>
                                    <Link className="dropdown-item" to="/pokemon/list">포켓몬 목록</Link>
                                </div>
                            </li>
                            {/* <li className="nav-item" onClick={closeMenu}>
                                <Link className="nav-link" to="/pokemon/spa">
                                    <span>포켓몬(SPA)</span>
                                </Link>
                            </li>
                            <li className="nav-item" onClick={closeMenu}>
                                <Link className="nav-link" to="/pokemon/list">
                                    <span>포켓몬 목록</span>
                                </Link>
                            </li> */}
                            {/* <li className="nav-item" onClick={closeMenu}>
                                <Link className="nav-link" to="/pokemon/pagination">
                                    <span>포켓몬 페이징</span>
                                </Link>
                            </li>
                            <li className="nav-item" onClick={closeMenu}>
                                <Link className="nav-link" to="/pokemon/pagination2">
                                    <span>포켓몬 페이징2</span>
                                </Link>
                            </li>
                            <li className="nav-item" onClick={closeMenu}>
                                <Link className="nav-link" to="/pokemon/pagination3">
                                    <span>포켓몬 페이징3</span>
                                </Link>
                            </li> */}

                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" data-bs-toggle="dropdown" to="#" role="button" aria-haspopup="true" aria-expanded="false">페이징</Link>
                                <div className="dropdown-menu">
                                    <Link className="dropdown-item" to="/pokemon/pagination">포켓몬 페이징1</Link>
                                    <Link className="dropdown-item" to="/pokemon/pagination2">포켓몬 페이징2</Link>
                                    <Link className="dropdown-item" to="/pokemon/pagination3">포켓몬 페이징3</Link>
                                </div>
                            </li>

                            {isLogin && (
                                <li className="nav-item" onClick={closeMenu}>
                                    <Link className="nav-link" to="/student/spa">
                                        <span>학생</span>
                                    </Link>
                                </li>
                            )}

                            {/* <li className="nav-item">
                                <Link className="nav-link" to="#">
                                    <span>게시판</span>
                                </Link>
                            </li> */}
                            {/* <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button"
                                    aria-haspopup="true" aria-expanded="false">Dropdown</a>
                                <div className="dropdown-menu">
                                    <a className="dropdown-item" href="#">Action</a>
                                    <a className="dropdown-item" href="#">Another action</a>
                                    <a className="dropdown-item" href="#">Something else here</a>
                                    <div className="dropdown-divider"></div>
                                    <a className="dropdown-item" href="#">Separated link</a>
                                </div>
                            </li> */}
                        </ul>
                        <ul className="navbar-nav">
                            {/* <li className="nav-item" onClick={closeMenu}>
                                <Link className="nav-link" to="/kakaopay/v1">
                                    <span>결제(v1)</span>
                                </Link>
                            </li>
                             <li className="nav-item" onClick={closeMenu}>
                                <Link className="nav-link" to="/kakaopay/v2">
                                    <span>결제(v2)</span>
                                </Link>
                            </li> */}

                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" data-bs-toggle="dropdown" to="#" role="button" aria-haspopup="true" aria-expanded="false">채팅</Link>
                                <div className="dropdown-menu">
                                    <Link className="dropdown-item" to="/websocket/basic">기본</Link>
                                    <Link className="dropdown-item" to="/websocket/advance">웹소켓</Link>
                                    <Link className="dropdown-item" to="/websocket/member">회원전용</Link>
                                    <div className="dropdown-divider"></div>
                                    <Link className="dropdown-item" to="/websocket/group">그룹채팅</Link>
                                    <Link className="dropdown-item" to="/websocket/cheat">CheatRoom</Link>
                                </div>
                            </li>

                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">결제</Link>
                                <div className="dropdown-menu">
                                    <Link className="dropdown-item" to="/kakaopay/v1">카카오결제1</Link>
                                    <Link className="dropdown-item" to="/kakaopay/v2">카카오결제2</Link>
                                </div>
                            </li>

                            {isLogin === true ?
                                (<>
                                    <li className="nav-item" onClick={closeMenu}>
                                        <Link className="nav-link" onClick={logout}>
                                            <span>로그아웃</span>
                                        </Link>
                                    </li>
                                    <li className="nav-item" onClick={closeMenu}>
                                        <Link className="nav-link" to="/account/info">
                                            <span>MyPage</span>
                                        </Link>
                                    </li>
                                    {isAdmin === true && (
                                        <li className="nav-item" onClick={closeMenu}>
                                            <Link className="nav-link" to="/admin">
                                                <span>AdminHome</span>
                                            </Link>
                                        </li>
                                    )}
                                </>) :
                                (<>
                                    <li className="nav-item" onClick={closeMenu}>
                                        <Link className="nav-link" to="/account/AccountLogin">
                                            <span>로그인</span>
                                        </Link>
                                    </li>
                                </>)}
                            <li className="nav-item" onClick={closeMenu}>
                                <Link className="nav-link" to="/account/AccountJoin">
                                    <span>회원가입</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}