import { atom } from "recoil";


export const authState = atom({
    key: "authState",
    default: {
        isLoggedIn: false,
        user: null //ユーザー情報もここに入れる
    }
});