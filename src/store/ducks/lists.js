import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";

/* Types & Action Creators */

const { Types, Creators } = createActions({
  getListsRequest: null,
  getListsSuccess: ["data"],
  selectList: ["list"],
  openListModal: null,
  closeListModal: null,
  createListRequest: ["name"],
  createListSuccess: ["list"]
});

export const ListsTypes = Types;
export default Creators;

/* Initial State */

export const INITIAL_STATE = Immutable({
  data: [],
  listModalOpen: false,
  active: null
});

/* Reducers */

export const getSuccess = (state, { data }) => state.merge({ data });

export const selectListSucess = (state, { list }) =>
  state.merge({ active: list });

export const openModal = state => state.merge({ listModalOpen: true });

export const closeModal = state => state.merge({ listModalOpen: false });

export const createSuccess = (state, { list }) =>
  state.merge({ data: [...state.data, list] });

/* Reducers to types */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_LISTS_SUCCESS]: getSuccess,
  [Types.SELECT_LIST]: selectListSucess,
  [Types.OPEN_LIST_MODAL]: openModal,
  [Types.CLOSE_LIST_MODAL]: closeModal,
  [Types.CREATE_LIST_SUCCESS]: createSuccess
});
