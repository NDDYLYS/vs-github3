/*
죠-타이 jotai
recoil과 호환성을 개선한 상태관리 라이브러리
recoil - atom, selector
jotai - atom only
atom(값) : atom
atom(함수) : selector
*/

import {  atom } from "jotai";
import {  atomWithStorage } from "jotai/utils";

export const loginIdState = atomWithStorage("loginIdState", null, sessionStorage);
export const loginLevelState = atomWithStorage("loginLevelState", null, sessionStorage);

export const loginState = atom(get => {
    const loginId = get(loginIdState);
    const loginLevel = get(loginLevelState);
    return loginId !== null && loginLevel !== null;
});

export const adminState = atom(get => {
    const loginId = get(loginIdState);
    const loginLevel = get(loginLevelState);
    return loginId !== null && loginLevel === "관리자";
});

loginIdState.debugLabel = "loginIdState";
loginLevelState.debugLabel = "loginLevelState";
loginState.debugLabel = "loginState";
adminState.debugLabel = "adminState";