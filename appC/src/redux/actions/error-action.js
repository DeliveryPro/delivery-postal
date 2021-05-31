import { createAction } from "redux-actions";
import logger from "../../utils/logger";

import { ERROR, HIDE_ERROR } from "../types";
import types from "../../constants";
import { notificationsShower } from "./notification-action";

export const errorShow = createAction(ERROR);
export const hideError = createAction(HIDE_ERROR);

export const errorHandler = (page, error) => (dispatch) => {
  logger("errorHandler", error);
  setTimeout(() => dispatch(errorHider()), 3000);

  dispatch(notificationsShower(types.ERROR, "server error", error.toString()));
  dispatch(errorShow({ page, error: error.toString() }));
};

export const errorHider = () => (dispatch) => {
  dispatch(hideError());
};
