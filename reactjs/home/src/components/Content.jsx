import { Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";
import Home from "./Home"

import Pokemon from "./pokemon/Pokemon"
import PokemonEdit from "./pokemon/PokemonEdit";
import PokemonAdd from "./pokemon/PokemonAdd";
import PokemonList from "./pokemon/PokemonList";
import PokemonDetail from "./pokemon/PokemonDetail";
import PokemonDetail2 from "./pokemon/PokemonDetail2";
import PokemonPagination from "./pokemon/PokemonPagination";
import PokemonPagination2 from "./pokemon/PokemonPagination2";
import PokemonPagination3 from "./pokemon/PokemonPagination3";

import Student from "./student/Student"
import AccountJoin from "./account/AccountJoin";
import AccountJoinFinish from "./account/AccountJoinFinish";
import AccountLogin from "./account/AccountLogin";
import Private from "./guard/Private.jsx";
import Admin from "./guard/Admin.jsx";

import AdminHome from "./admin/AdminHome.jsx";
import AdminManager from "./admin/AdminManager.jsx";
import DashBoard from "./admin/DashBoard.jsx";

import TargetNotFound from "./error/TargetNotFound.jsx";
import NeedPermission from "./error/NeedPermission.jsx";
import KakaoPayVersion1 from "./pay/KakaoPayVersion1.jsx";

export default function Content() {

    return (
        <>
            <div className="row">
                <div className="col-md-10 offset-md-1">

                    <Routes>
                        <Route path="/" element={<Home />}></Route>

                        <Route path="/pokemon/spa" element={<Pokemon />}></Route>
                        <Route path="/pokemon/list" element={<PokemonList />}></Route>
                        <Route path="/pokemon/add" element={<PokemonAdd />}></Route>
                        <Route path="/pokemon/edit" element={<PokemonEdit />}></Route>
                        <Route path="/pokemon/detail/:pokemonNo" element={<PokemonDetail />}></Route>
                        <Route path="/pokemon/detail2/:pokemonNo" element={<PokemonDetail2 />}></Route>
                        <Route path="/pokemon/pagination" element={<PokemonPagination />}></Route>
                        <Route path="/pokemon/pagination2" element={<PokemonPagination2 />}></Route>
                        <Route path="/pokemon/pagination3" element={<PokemonPagination3 />}></Route>

                        <Route path="/student/spa" element={<Student />} />

                        <Route path="/account/AccountJoin" element={<AccountJoin />}></Route>
                        <Route path="/account/AccountJoinFinish" element={<AccountJoinFinish />}></Route>
                        <Route path="/account/AccountLogin" element={<AccountLogin />}></Route>


                        <Route path="/admin" element={<Admin><AdminHome /></Admin>}>
                            {/* 중첩 라우트 : 최종주소는 /admin/accounts */}
                            {/* <Route path="accounts" element={<Admin><AccountManager/></Admin>}></Route> */}
                            <Route path="/admin/AdminManager" element={<Admin><AdminManager /></Admin>}></Route>
                            {/* 중첩 라우트 : 최종주소는 /admin/dashboard */}
                            {/* <Route path="dashboard" element={<Admin><Dashboard/></Admin>}></Route> */}
                            <Route path="/admin/DashBoard" element={<Admin><DashBoard /></Admin>}></Route>
                        </Route>

                        <Route path="/kakaopay/v1" element={<KakaoPayVersion1/>}> </Route>


                        <Route path="/error/403" element={<NeedPermission />}></Route>
                        <Route path="*" element={<TargetNotFound />}></Route>
                    </Routes>

                </div>
            </div>

        </>
    )
}