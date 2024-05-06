export const CHANGE_PASSWORD = "/api/user/changepassword";
export const BLOCK_USER = (id: string) => `/api/user/block-user/${id}`;
export const UNBLOCK_USER = (id: string) => `/api/user/unblock-user/${id}`;
export const GET_CATEGORIES = "/api/user/all-categories";
export const ADD_CATEGORY = "/api/user/add-category";
export const UPDATE_CATEGORY = "/api/user/update-category";
export const DELETE_CATEGORY = (id: string) =>
  `/api/user/delete-category/${id}`;
