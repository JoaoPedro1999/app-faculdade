import { call, put } from "redux-saga/effects";
import { ToastActionsCreators } from "react-native-redux-toast";
import AsyncStorage from "@react-native-community/async-storage";
import api from "../../services/api";
import ListsActions from "../ducks/lists";

export function* getLists() {
  const response = yield call(api.get, "lists");
  console.log(response.data.slug);

  yield put(ListsActions.getListsSuccess(response.data));
}

export function* createList({ name }) {
  try {
    console.log(name);
    const response = yield call(api.post, "lists", { name });
    console.log(response.data);
    yield put(ListsActions.createListSuccess(response.data));
    yield put(ListsActions.closeListModal());

    yield put(ToastActionsCreators.displayInfo("Lista Criado"));
  } catch (err) {
    console.log(err);
    yield put(ToastActionsCreators.displayError("Erro ao criar lista"));
  }
}

export function* setActiveList({ list }) {
  yield call([AsyncStorage, "setItem"], "@Ely:list", JSON.stringify(list));
}
