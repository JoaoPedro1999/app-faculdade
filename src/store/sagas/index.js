import { all, fork, takeLatest } from "redux-saga/effects";

import { signIn, init, signOut } from "./auth";
import { AuthTypes } from "../ducks/auth";

import { getLists, createList, setActiveList } from "./lists";
import { ListsTypes } from "../ducks/lists";

import { getBooks, createBook, deleteBook } from "./books";
import { BooksTypes } from "../ducks/books";

export default function* rootSaga() {
  return yield all([
    init(),
    takeLatest(AuthTypes.SIGN_IN_REQUEST, signIn),
    takeLatest(AuthTypes.SIGN_OUT, signOut),

    takeLatest(ListsTypes.GET_LISTS_REQUEST, getLists),
    takeLatest(ListsTypes.CREATE_LIST_REQUEST, createList),
    takeLatest(ListsTypes.SELECT_LIST, setActiveList),

    takeLatest(BooksTypes.GET_BOOKS_REQUEST, getBooks),
    takeLatest(BooksTypes.CREATE_BOOK_REQUEST, createBook),
    takeLatest(BooksTypes.DELETE_BOOK_REQUEST, deleteBook)
  ]);
}
