import { call, put, select } from "redux-saga/effects";
import { ToastActionsCreators } from "react-native-redux-toast";
import AsyncStorage from "@react-native-community/async-storage";
import api from "../../services/api";
import NavigationService from "../../services/navigation";

import AuthActions from "../ducks/auth";
import ListsActions from "../ducks/lists";

export function* init() {
  const token = yield call([AsyncStorage, "getItem"], "@Ely:token");

  if (token) {
    yield put(AuthActions.signInSuccess(token));
  }

  const list = yield call([AsyncStorage, "getItem"], "@Ely:list");

  if (list) {
    console.log(JSON.parse(list));
    yield put(ListsActions.selectList(JSON.parse(list)));
  }

  yield put(AuthActions.initCheckSuccess());
}

export function* signIn({ email, password }) {
  try {
    console.log("CHAMOU SIGN IN");

    const response = yield call(api.post, "sessions", { email, password });

    console.log(response.data.token);
    yield call([AsyncStorage, "setItem"], "@Ely:token", response.data.token);

    yield put(AuthActions.signInSuccess(response.data.token));
    NavigationService.navigate("Main");
  } catch (err) {
    yield put(
      ToastActionsCreators.displayError(
        "Erro ao entrar, verifique seu email/senha!"
      )
    );
  }
}

export function* signOut() {
  yield call([AsyncStorage, "clear"]);
  NavigationService.navigate("SignIn");
}
