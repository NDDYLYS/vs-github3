// recoil의 상태 저장소
// HttpSseion을 대신한다
// 보안 수준이 높지 읺다
// atom : recoil state 생성
// selector : recoil memo 생성

import { atom } from "recoil";

const loginIdStste = atom({
    key: "loginIdState",
    default: null,
});
export { loginIdStste };

const loginLevelStste = atom({
    key: "loginLevelStste",
    default: null,
});
export { loginLevelStste };