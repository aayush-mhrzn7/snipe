import axios from "axios";
import { toast } from "sonner";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:8000",
  timeout: 10000,
});
export const getBody = (body: any) => {
  const isFile = (value: any) => value instanceof File || value instanceof Blob;

  const isFileArray = (value: any) =>
    Array.isArray(value) && value.every(isFile);

  if (body instanceof Array) {
    const formData = new FormData();
    body.forEach((item, itemIndex) => {
      if (typeof item === "object" && item !== null) {
        // Iterate over each key in the object
        Object.keys(item).forEach((key) => {
          if (isFile(item[key])) {
            formData.append(`data[${itemIndex}][${key}]`, item[key]);
          } else if (isFileArray(item[key])) {
            // If the value is an array of files
            item[key].forEach((file: File | Blob, fileIndex: number) => {
              formData.append(`data[${itemIndex}][${key}][${fileIndex}]`, file);
            });
          } else if (Array.isArray(item[key])) {
            // Handle arrays of non-file values inside objects
            item[key].forEach((value, valueIndex) => {
              formData.append(
                `data[${itemIndex}][${key}][${valueIndex}]`,
                value
              );
            });
          } else {
            // Handle normal values
            formData.append(`data[${itemIndex}][${key}]`, item[key]);
          }
        });
      }
    });
    return formData;
  } else {
    Object.keys(body).forEach((key) => {
      if (body[key] === undefined) {
        delete body[key];
      }
    });
    const containsFile = Object.values(body).some(
      (value) => isFile(value) || isFileArray(value)
    );
    if (containsFile) {
      const formData = new FormData();
      Object.keys(body).forEach((key) => {
        if (isFileArray(body[key])) {
          body[key].forEach((file: File | Blob, index: number) => {
            formData.append(`${key}[${index}]`, file);
          });
        } else if (isFile(body[key])) {
          formData.append(key, body[key]);
        } else {
          formData.append(key, body[key]);
        }
      });
      return formData;
    }
    return body;
  }
};
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.status === 401) {
      localStorage.removeItem("token");
      toast.error("you are not authorized");
    }
    if (error.status == 500) {
      toast.error("Internal Server Error");
    }
    return Promise.reject(error);
  }
);
