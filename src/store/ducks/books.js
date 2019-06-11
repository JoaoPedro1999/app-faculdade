import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";

/* Types & Action Creators */

const { Types, Creators } = createActions({
  getBooksRequest: null,
  getOneBookRequest: ["id"],
  getBooksSuccess: ["data"],
  selectBook: ["book"],
  openBookModal: null,
  closeBookModal: null,
  createBookRequest: ["book_title", "author"],
  createBookSuccess: ["project"],
  deleteBookRequest: ["id"]
});

export const BooksTypes = Types;
export default Creators;

/* Initial State */

export const INITIAL_STATE = Immutable({
  data: [],
  bookModalOpen: false,
  active: null
});

/* Reducers */

export const success = (state, { data }) => state.merge({ data });

export const openModal = state => state.merge({ bookModalOpen: true });

export const closeModal = state => state.merge({ bookModalOpen: false });

export const createSuccess = (state, { book }) =>
  state.merge({ data: [...state.data, book] });

export const selectBookSucess = (state, { book }) =>
  state.merge({ active: book });

/* Reducers to types */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_BOOKS_SUCCESS]: success,
  [Types.SELECT_BOOK]: selectBookSucess,
  [Types.OPEN_BOOK_MODAL]: openModal,
  [Types.CLOSE_BOOK_MODAL]: closeModal,
  [Types.CREATE_BOOK_SUCCESS]: createSuccess
});
