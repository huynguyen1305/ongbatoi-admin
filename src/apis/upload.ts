import baseClient from "@/configs/baseClient";

export const uploadFileApi = () => baseClient.post("/upload/files");
