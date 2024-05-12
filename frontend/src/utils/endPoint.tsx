import axios from "axios";
import {
  ADD_CATEGORY,
  BLOCK_USER,
  CHANGE_PASSWORD,
  CREATE_ORDER,
  DELETE_CATEGORY,
  GET_CATEGORIES,
  GET_COURSES,
  GET_SINGLECOURSE,
  GET_STRIPE_KEY,
  NEW_PAYMENT,
  UNBLOCK_USER,
  UPDATE_CATEGORY,
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
    console.log(response);
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, error: error.response.data };
  }
}
