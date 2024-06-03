export const CHANGE_PASSWORD = "/api/user/changepassword";
export const BLOCK_USER = (id: string) => `/api/user/block-user/${id}`;
export const UNBLOCK_USER = (id: string) => `/api/user/unblock-user/${id}`;
export const GET_CATEGORIES = "/api/user/all-categories";
export const ADD_CATEGORY = "/api/user/add-category";
export const UPDATE_CATEGORY = "/api/user/update-category";
export const DELETE_CATEGORY = (id: string) =>
  `/api/user/delete-category/${id}`;
export const GET_COURSES = "/api/user/get-courses";
export const GET_SINGLECOURSE = (id: string) => `/api/user/get-course/${id}`;
export const GET_STRIPE_KEY = "/api/order/payment/stripepublishablekey";
export const NEW_PAYMENT = "/api/order/payment";
export const CREATE_ORDER = "/api/order/create-order";
export const USER_INFO = "/api/user/me";
export const COURSE_FULL_CONTENT = (id: string) =>
  `/api/user/get-course-content/${id}`;
export const ADD_QUESTION = "/api/user/add-question";
export const ADD_ANSWER = "/api/user/add-answer";
export const ADD_REVIEW = (courseId: string) =>
  `/api/user/add-review/${courseId}`;

export const GET_COURSES_SEARCH = ({
  search = "",
  category = "All",
  page = 1,
  pageSize = 10,
}) =>
  `/api/user/get-courses-search?search=${encodeURIComponent(
    search
  )}&category=${encodeURIComponent(
    category
  )}&page=${page}&pageSize=${pageSize}`;

export const COURSE_ANALYTICS = "/api/user/get-course-analytics";
export const USER_ANALYTICS = "/api/user/get-user-analytics";
export const ORDER_ANALYTICS = "/api/order/get-order-analytics";
export const ALL_ORDERS = "/api/order/get-allorders";
export const DASHBOARD_DATA = "/api/order/get-dashboarddata";
export const MY_TEACHINGS = "/api/user/get-myteachings";
export const INSTRUCTOR_DASHBOARD_DATA =
  "/api/order/get-instructordashboardanalytics";
//----------------------------------------------------------------------------------------------------------
