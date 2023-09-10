import api from "@/utils/api";

export const readNotifications = async (): Promise<null> => {
  return await api.put<null, null>("/notifications/seen");
};