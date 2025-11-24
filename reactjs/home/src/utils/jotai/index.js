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

export const loginIdState = atomWithStorage("loginIdState", "", sessionStorage);
export const loginLevelState = atomWithStorage("loginLevelState", "", sessionStorage);

export const loginState = atom(get => {
    const loginId = get(loginIdState);
    const loginLevel = get(loginLevelState);
    return loginId !== "" && loginLevel !== "";
});

export const adminState = atom(get => {
    const loginId = get(loginIdState);
    const loginLevel = get(loginLevelState);
    return loginId !== "" && loginLevel === "관리자";
});

export const clearLoginState = atom(null, (get, set) =>{
    set(loginIdState, "");
    set(loginLevelState, "");
    set(accessTokenState, "");
});

export const accessTokenState = atomWithStorage("accessTokenState", "", sessionStorage);

loginIdState.debugLabel = "loginIdState";
loginLevelState.debugLabel = "loginLevelState";
loginState.debugLabel = "loginState";
adminState.debugLabel = "adminState";
accessTokenState.debugLabel = "accessTokenState";