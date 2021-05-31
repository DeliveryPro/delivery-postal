import { createAction } from "redux-actions";
import logger from "../../utils/logger";

import { NOTIFICATION_SHOW, NOTIFICATION_HIDE } from "../types";

export const showNotification = createAction(NOTIFICATION_SHOW);
export const hideNotification = createAction(NOTIFICATION_HIDE);

export const notificationsShower = (type, text, description) => (dispatch) => {
  logger("notification handler", { type, text, description });
  dispatch(showNotification({ type, text, description }));
};

export const clearNotification = () => (dispatch) => {
  logger("clearNotification");
  dispatch(hideNotification());
};
