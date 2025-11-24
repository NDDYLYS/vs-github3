import { Link, useNavigate } from "react-router-dom";
import { useCallback, useEffect, useRef, useState } from "react";
import { useAtom, useAtomValue } from "jotai";
import { adminState, loginIdState, loginLevelState, loginState } from "../utils/jotai";

export default function Menu() {
    const  navigate = useNavigate();

    const [loginId, setLoginId] = useAtom(loginIdState);
    const [loginLevel, setLoginLevel] = useAtom(loginLevelState);

    const isLogin = useAtomValue(loginState);
    const isAdmin = useAtomValue(adminState);

    const logout = useCallback((e)=>{
        e.stopPropagation();
        e.preventDefault();
        
        setLoginId(null);
        setLoginLevel(null);
        
        navigate("/")
    });

    const [open, setOpen] = useState(false);
    const toggleMenu = useCallback(()=>{ setOpen(prev=>!prev); }, []);

    //메뉴 및 외부 영역 클릭 시 메뉴가 닫히도록 처리하는 코드
    //- 메뉴를 클릭했을 때 닫히게 하는 것은 메뉴에 onClick 설정을 하면 됨
    //- 메뉴가 아닌 외부영역을 클릭했을 때 감지하고 싶다면 window에 mousedown 이벤트를 설정
    const closeMenu = useCallback(()=>{ setOpen(false); }, []);
    const menuRef = useRef();//메뉴 영역을 선택해둘 리모컨
    useEffect(()=>{
        //클릭 감지 함수
        const listener = e=>{
            // if(메뉴가 열려있고 클릭한 장소가 메뉴영역이 아니라면) {
            if(open === true && menuRef.current.contains(e.target) === false) {
                closeMenu();
            }
        };
        window.addEventListener("mousedown", listener);
        return ()=>{//clean up 함수
            window.removeEventListener("mousedown", listener);
        };
    }, [open]);

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
                        onClick={closeMenu}>
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="menu-body">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item" onClick={closeMenu}>
                                <Link className="nav-link" to="/pokemon/spa">
                                    <span>포켓몬(SPA)</span>
                                </Link>
                            </li>
                            <li className="nav-item" onClick={closeMenu}>
                                <Link className="nav-link" to="/pokemon/list">
                                    <span>포켓몬 목록</span>
                                </Link>
                            </li>
                            <li className="nav-item" onClick={closeMenu}>
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
                            </li>
                            {isLogin && (
                                <li className="nav-item" onClick={closeMenu}>
                                    <Link className="nav-link" to="/student">
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
                            <li className="nav-item" onClick={closeMenu}>
                                <Link className="nav-link" to="#">
                                    <span>충전</span>
                                </Link>
                            </li>
                            {isLogin === true? 
                            (<>
                             <li className="nav-item" onClick={closeMenu}>
                                <Link className="nav-link" onClick={logout}>
                                    <span>로그아웃</span>
                                </Link>
                            </li>
                            <li className="nav-item" onClick={closeMenu}>
                                <Link className="nav-link" to="#">
                                    <span>MyPage</span>
                                </Link>
                            </li>
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