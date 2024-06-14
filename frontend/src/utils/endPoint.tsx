import axios from "axios";
import {
  ADD_ANSWER,
  ADD_CATEGORY,
  ADD_QUESTION,
  ADD_REVIEW,
  ALL_MESSAGES,
  ALL_NOTIFICATIONS,
  ALL_ORDERS,
  BLOCK_USER,
  CHANGE_PASSWORD,
  COURSE_ANALYTICS,
  COURSE_FULL_CONTENT,
  CREATE_CONVERSATION,
  CREATE_NEW_MESSAGE,
  CREATE_ORDER,
  DASHBOARD_DATA,
  DELETE_CATEGORY,
  GET_CATEGORIES,
  GET_COURSES,
  GET_COURSES_SEARCH,
  GET_SINGLECOURSE,
  GET_STRIPE_KEY,
  INSTRUCTOR_CONVERSATIONS,
  INSTRUCTOR_DASHBOARD_DATA,
  MY_COURSES,
  MY_DETAILS,
  MY_TEACHINGS,
  NEW_PAYMENT,
  ORDER_ANALYTICS,
  UNBLOCK_USER,
  UPDATE_CATEGORY,
  UPDATE_LAST_MESSAGE,
  UPDATE_NOTIFICATIONS,
  USER_ANALYTICS,
  USER_DETAILS,
  USER_INFO,
} from "./api";

export async function changePasswordAPI(
  oldPassword: string,
  newPassword: string
) {
  try {
    const response = await axios.put(CHANGE_PASSWORD, {
      oldPassword,
      newPassword,
    });

    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, error: error.response.data };
  }
}

export async function blockUser(id: string) {
  try {
    const response = await axios.put(BLOCK_USER(id));
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, error: error.response.data };
  }
}

export async function unBlockUser(id: string) {
  try {
    const response = await axios.put(UNBLOCK_USER(id));
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, error: error.response.data };
  }
}

export async function getCategories() {
  try {
    const response = await axios.get(GET_CATEGORIES);
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, error: error.response.data };
  }
}

export async function addCategories(name: string) {
  try {
    const response = await axios.post(ADD_CATEGORY, { name });
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, error: error.response.data };
  }
}

export async function updateCategory(id: string, name: string) {
  try {
    const response = await axios.put(UPDATE_CATEGORY, { id, name });
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, error: error.response.data };
  }
}

export async function deleteCategories(id: string) {
  try {
    const response = await axios.delete(DELETE_CATEGORY(id));
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, error: error.response.data };
  }
}

export async function getCourses() {
  try {
    const response = await axios.get(GET_COURSES);
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, error: error.response.data };
  }
}

export async function getSingleCourse(id: string) {
  try {
    const response = await axios.get(GET_SINGLECOURSE(id));
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, error: error.response.data };
  }
}

export async function getStripeKey() {
  try {
    const response = await axios.get(GET_STRIPE_KEY);
    return { success: true, publishableKey: response.data.publishableKey };
    //return res.status(response.status).json(response.publishableKey);
  } catch (error: any) {
    return { success: false, error: error.response.data };
  }
}

export async function newPayment(amount: number) {
  try {
    const response = await axios.post(NEW_PAYMENT, { amount });
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, error: error.response.data };
  }
}

export async function createOrder(courseId: string, payment_info: any) {
  try {
    const response = await axios.post(CREATE_ORDER, { courseId, payment_info });
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, error: error.response.data };
  }
}

export async function getUserInfo() {
  try {
    const response = await axios.get(USER_INFO);
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, error: error.response.data };
  }
}

export async function getCourseInfo(id: string) {
  try {
    const response = await axios.get(COURSE_FULL_CONTENT(id));
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, error: error.response.data };
  }
}

export async function addQuestion(
  question: string,
  courseId: string,
  contentId: string
) {
  try {
    const response = await axios.put(ADD_QUESTION, {
      question,
      courseId,
      contentId,
    });
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, error: error.response.data };
  }
}

export async function addAnswer(
  answer: string,
  courseId: string,
  contentId: string,
  questionId: string
) {
  try {
    const response = await axios.put(ADD_ANSWER, {
      answer,
      courseId,
      contentId,
      questionId,
    });
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, error: error.response.data };
  }
}

export async function addReview(review: any, rating: number, courseId: string) {
  try {
    const response = await axios.put(ADD_REVIEW(courseId), {
      review,
      rating,
    });
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, error: error.response.data };
  }
}

export const getCoursesSearch = async ({
  search = "",
  category = "All",
  page = 1,
  pageSize = 10,
}) => {
  try {
    const response = await axios.get(
      GET_COURSES_SEARCH({ search, category, page, pageSize })
    );
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const getUserAnalytics = async () => {
  try {
    const response = await axios.get(USER_ANALYTICS);
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, error: error.response.data };
  }
};

export const getCourseAnalytics = async () => {
  try {
    const response = await axios.get(COURSE_ANALYTICS);
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, error: error.response.data };
  }
};

export const getOrderAnalytics = async () => {
  try {
    const response = await axios.get(ORDER_ANALYTICS);
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, error: error.response.data };
  }
};

export const getAllOrders = async () => {
  try {
    const response = await axios.get(ALL_ORDERS);
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, error: error.response.data };
  }
};

export const getDashboardData = async () => {
  try {
    const response = await axios.get(DASHBOARD_DATA);
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, error: error.response.data };
  }
};

export const getMyTeachings = async () => {
  try {
    const response = await axios.get(MY_TEACHINGS);
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, error: error.response.data };
  }
};

export const getInstructorDashboardAnaytics = async () => {
  try {
    const response = await axios.get(INSTRUCTOR_DASHBOARD_DATA);
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, error: error.response.data };
  }
};

export const getMyCourses = async () => {
  try {
    const response = await axios.get(MY_COURSES);
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, error: error.response.data };
  }
};

export const getMyInfo = async () => {
  try {
    const response = await axios.get(MY_DETAILS);
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, error: error.response.data };
  }
};

export const createConversation = async (
  groupTitle: string,
  userId: string,
  instructorId: string
) => {
  try {
    const response = await axios.post(CREATE_CONVERSATION, {
      groupTitle,
      userId,
      instructorId,
    });
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, error: error.response.data };
  }
};

export const getInstructorConversations = async (instructorId: string) => {
  try {
    const response = await axios.get(INSTRUCTOR_CONVERSATIONS(instructorId));
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, error: error.response.data };
  }
};

export const createNewMessage = async (message: {}) => {
  try {
    const response = await axios.post(CREATE_NEW_MESSAGE, message);
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, error: error.response.data };
  }
};

export const updateLastMessageAPI = async (
  conversationId: string,
  lastMessage: string,
  lastMessageId: string
) => {
  try {
    const response = await axios.put(UPDATE_LAST_MESSAGE(conversationId), {
      lastMessage,
      lastMessageId,
    });
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, error: error.response.data };
  }
};

export const getAllMessages = async (id: string) => {
  try {
    const response = await axios.get(ALL_MESSAGES(id));
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, error: error.response.data };
  }
};

export const getUserDetails = async (id: string) => {
  try {
    const response = await axios.get(USER_DETAILS(id));
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, error: error.response.data };
  }
};

export const getAllNotifications = async () => {
  try {
    const response = await axios.get(ALL_NOTIFICATIONS);
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, error: error.response.data };
  }
};

export const updateNotificationsStatus = async (id: string) => {
  try {
    const response = await axios.put(UPDATE_NOTIFICATIONS(id));
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, error: error.response.data };
  }
};
