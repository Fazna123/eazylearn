import axios from "axios";
import {
  ADD_CATEGORY,
  BLOCK_USER,
  CHANGE_PASSWORD,
  DELETE_CATEGORY,
  GET_CATEGORIES,
  UNBLOCK_USER,
  UPDATE_CATEGORY,
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
