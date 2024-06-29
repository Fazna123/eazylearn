export const BASE_URL = "https://backend.eazylearn.xyz";

export const CHANGE_PASSWORD = `${BASE_URL}/api/user/changepassword`;
export const BLOCK_USER = (id: string) =>
  `${BASE_URL}/api/user/block-user/${id}`;
export const UNBLOCK_USER = (id: string) =>
  `${BASE_URL}/api/user/unblock-user/${id}`;
export const GET_CATEGORIES = `${BASE_URL}/api/user/all-categories`;
export const ADD_CATEGORY = `${BASE_URL}/api/user/add-category`;
export const UPDATE_CATEGORY = `${BASE_URL}/api/user/update-category`;
export const DELETE_CATEGORY = (id: string) =>
  `${BASE_URL}/api/user/delete-category/${id}`;
export const GET_COURSES = `${BASE_URL}/api/user/get-courses`;
export const GET_SINGLECOURSE = (id: string) =>
  `${BASE_URL}/api/user/get-course/${id}`;
export const GET_STRIPE_KEY = `${BASE_URL}/api/order/payment/stripepublishablekey`;
export const NEW_PAYMENT = `${BASE_URL}/api/order/payment`;
export const CREATE_ORDER = `${BASE_URL}/api/order/create-order`;
export const USER_INFO = `${BASE_URL}/api/user/me`;
export const COURSE_FULL_CONTENT = (id: string) =>
  `${BASE_URL}/api/user/get-course-content/${id}`;
export const ADD_QUESTION = `${BASE_URL}/api/user/add-question`;
export const ADD_ANSWER = `${BASE_URL}/api/user/add-answer`;
export const ADD_REVIEW = (courseId: string) =>
  `${BASE_URL}/api/user/add-review/${courseId}`;

export const GET_COURSES_SEARCH = ({
  search = "",
  category = "All",
  page = 1,
  pageSize = 10,
}) =>
  `${BASE_URL}/api/user/get-courses-search?search=${encodeURIComponent(
    search
  )}&category=${encodeURIComponent(
    category
  )}&page=${page}&pageSize=${pageSize}`;

export const COURSE_ANALYTICS = `${BASE_URL}/api/user/get-course-analytics`;
export const USER_ANALYTICS = `${BASE_URL}/api/user/get-user-analytics`;
export const ORDER_ANALYTICS = `${BASE_URL}/api/order/get-order-analytics`;
export const ALL_ORDERS = `${BASE_URL}/api/order/get-allorders`;
export const DASHBOARD_DATA = `${BASE_URL}/api/order/get-dashboarddata`;
export const MY_TEACHINGS = `${BASE_URL}/api/user/get-myteachings`;
export const INSTRUCTOR_DASHBOARD_DATA = `${BASE_URL}/api/order/get-instructordashboardanalytics`;
export const MY_COURSES = `${BASE_URL}/api/user/mycourses-user`;
export const MY_DETAILS = `${BASE_URL}/api/user/myinfo`;
export const CREATE_CONVERSATION = `${BASE_URL}/api/chat/create-new-conversation`;
export const INSTRUCTOR_CONVERSATIONS = (id: string) =>
  `${BASE_URL}/api/chat/get-all-instructor-conversations/${id}`;
export const CREATE_NEW_MESSAGE = `${BASE_URL}/api/chat/create-new-message`;
export const UPDATE_LAST_MESSAGE = (id: string) =>
  `${BASE_URL}/api/chat/update-last-message/${id}`;

export const ALL_MESSAGES = (id: string) =>
  `${BASE_URL}/api/chat/get-all-messages/${id}`;
export const USER_DETAILS = (id: string) =>
  `${BASE_URL}/api/user/user-info/${id}`;
export const ALL_NOTIFICATIONS = `${BASE_URL}/api/user/get-all-notifications`;
export const UPDATE_NOTIFICATIONS = (id: string) =>
  `${BASE_URL}/api/user/update-notification/${id}`;

export const REPORT_COURSE = (id: string) =>
  `${BASE_URL}/api/user/add-report-reason/${id}`;

//----------------------------------------------------------------------------------------------------------
