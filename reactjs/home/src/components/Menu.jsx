import { Link, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { loginIdState, loginLevelState, loginState, adminState } from "../utils/recoil";
import { useCallback } from "react";

export default function Menu() {
    const  navigate = useNavigate();

    const [loginId, setLoginId] = useRecoilState(loginIdState);
    const [loginLevel, setLoginLevel] = useRecoilState(loginLevelState);

    const isLogin = useRecoilValue(loginState);
    const isAdmin = useRecoilValue(adminState);

    const logout = useCallback((e)=>{
        e.stopPropagation();
        e.preventDefault();
        
        setLoginId(null);
        setLoginLevel(null);
        
        navigate("/")
    });

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-dark fixed-top" data-bs-theme="dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">KH정보교육원</Link>

                    <button className="navbar-toggler" type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#menu-body"
                        aria-controls="menu-body"
                        aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="menu-body">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/pokemon/spa">
                                    <span>포켓몬(SPA)</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/pokemon/list">
                                    <span>포켓몬 목록</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/pokemon/pagination">
                                    <span>포켓몬 페이징</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/pokemon/pagination2">
                                    <span>포켓몬 페이징2</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/pokemon/pagination3">
                                    <span>포켓몬 페이징3</span>
                                </Link>
                            </li>
                            {isLogin && (
                                <li className="nav-item">
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
                            <li className="nav-item">
                                <Link className="nav-link" to="#">
                                    <span>충전</span>
                                </Link>
                            </li>
                            {isLogin === true? 
                            (<>
                             <li className="nav-item">
                                <Link className="nav-link" onClick={logout}>
                                    <span>로그아웃</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="#">
                                    <span>MyPage</span>
                                </Link>
                            </li>
                            </>) : 
                            (<>
                                 <li className="nav-item">
                                <Link className="nav-link" to="/account/AccountLogin">
                                    <span>로그인</span>
                                </Link>
                            </li>
                            </>)}
                            <li className="nav-item">
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