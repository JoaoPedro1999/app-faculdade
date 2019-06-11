/* eslint-disable import/no-cycle */
import { call, put } from "redux-saga/effects";
import { ToastActionsCreators } from "react-native-redux-toast";
import api from "../../services/api";

import BooksActions from "../ducks/books";

export function* getBooks() {
  const response = yield call(api.get, "books");
  console.log(response.data);
  yield put(BooksActions.getBooksSuccess(response.data));
}

export function* getOneBook({ id }) {
  const response = yield call(api.get, `books/${id}`);
  console.log(response.data);
}

export function* createBook({ book_title, author }) {
  try {
    const response = yield call(api.post, "books", { book_title, author });

    yield put(BooksActions.getBooksSuccess(response.data));

    yield put(BooksActions.closeBookModal());

    yield put(ToastActionsCreators.displayInfo("Livro adicionado"));
  } catch (err) {
    yield put(ToastActionsCreators.displayError("Erro ao adiconar o livro"));
  }
}

export function* deleteBook({ id }) {
  try {
    console.log("CHAMOU DELETE");
    console.log(id);
    yield call(api.delete, `books/${id}`);

    const response = yield call(api.get, "books");
    console.log(response.data);
    yield put(BooksActions.getBooksSuccess(response.data));

    yield put(ToastActionsCreators.displayInfo("Livro removido"));
  } catch (err) {
    yield put(ToastActionsCreators.displayError("Erro ao remover o livro"));
  }
}
