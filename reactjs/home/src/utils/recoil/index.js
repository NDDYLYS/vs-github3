// recoil의 상태 저장소
// HttpSseion을 대신한다
// 보안 수준이 높지 읺다
// atom : recoil state 생성
// selector : recoil memo 생성

import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

// recoil-persist
const { persistAtom } = recoilPersist();

const loginIdState = atom({
    key: "loginIdState",
    default: null,
    effects_UNSTABLE : [persistAtom],
});
export { loginIdState };

const loginLevelState = atom({
    key: "loginLevelStste",
    default: null,
    effects_UNSTABLE : [persistAtom],
});
export { loginLevelState };

const loginState = selector({
    key:"loginState",
    get:(state)=>{
        const loginId = state.get(loginIdState);
        const loginLevel = state.get(loginLevelState);

        return loginId !== null && loginLevel !== "관리자";
    }
});
export { loginState };

const adminState = selector({
    key:"adminState",
    get:(state)=>{
        const loginId = state.get(loginIdState);
        const loginLevel = state.get(loginLevelState);

        return loginId !== null && loginLevel === "관리자";
    }
});
export { adminState };