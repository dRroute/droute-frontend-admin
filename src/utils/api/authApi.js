
import { apiGetRequest } from "../http/get";
import { apiPostRequest } from "../http/post";
import { apiPutRequest } from "../http/put";

const API_URL = import.meta.env.VITE_APP_BACKEND_API;

console.log("this is ev api url",API_URL)
// Sign In API
export const signInAPI = (data) =>
  apiPostRequest({
    apiUrl: `${API_URL}/auth/login`,
    content_type: "application/json",
    data: data,
  });

// Get User By ID API
export const getUserByIdAPI = (userId) =>
  apiGetRequest({
    apiUrl: `${API_URL}/${userId}`,
    content_type: "application/json",
  });

export const getAllUserAPI = () =>
  apiGetRequest({
    apiUrl: `${API_URL}/user`,
    content_type: "application/json",
  });

  export const getAllDriverAPI = () =>
  apiGetRequest({
    apiUrl: `${API_URL}/driver`,
    content_type: "application/json",
  });

   export const getAllJourneyAPI = () =>
  apiGetRequest({
    apiUrl: `${API_URL}/journey`,
    content_type: "application/json",
  });
   export const getAllOrderAPI = () =>
  apiGetRequest({
    apiUrl: `${API_URL}/order`,
    content_type: "application/json",
  });


  export const updateUserAPI = (data) =>
  apiPutRequest({
    apiUrl: `${API_URL}/user/${data?.userId}`,
    content_type: "application/json",
    data: data,
  });

   export const updateDriverAPI = (data) =>
   apiPutRequest({
    apiUrl: `${API_URL}/driver/${data?.driverId}`,
    content_type: "application/json",
    data: data,
  });

