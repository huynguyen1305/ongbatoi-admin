import baseClient from "@/configs/baseClient";

const endpoint = "/user";

export const loginApi = (payload: { username: string; password: string }) =>
  baseClient.post(`${endpoint}/login`, payload);

export const registerApi = (payload: {
  username: string;
  password: string;
  displayName: string;
}) => baseClient.post(`${endpoint}/register`, payload);
