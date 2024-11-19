import { atom } from "recoil";

//ログイン状態を管理するatom
export const authState = atom({
  key: "authState",
  default: false,
});
