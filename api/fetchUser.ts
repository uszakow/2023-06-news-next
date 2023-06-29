import { api } from "@/api/config";
import { UserInterface } from "@/types/User.interface";

export const fetchUser = async (token: string): Promise<UserInterface> => {
  const response = await api.get("/user", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
