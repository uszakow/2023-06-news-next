import { AxiosResponse } from "axios";
import { api } from "./config";
import { getRequestOptions } from "@/helpers/getRequestOptions";
import { UserDto } from "@/types/User.dto";
import { UserInterface } from "@/types/User.interface";
import { UpdateUserDto } from "@/types/UpdateUser.dto";

export const useUserApi = () => {
  const createUserApi = async (body: UserDto): Promise<AxiosResponse> => {
    return await api.post("/user", body);
  };

  const loginUserApi = async (body: UserDto): Promise<string> => {
    const response = await api.post("/user/login", body);
    return response.data.token;
  };

  const getUserApi = async (token: string): Promise<UserInterface> => {
    const response = await api.get("/user", getRequestOptions(token));
    return response.data;
  };

  const updateUserApi = async (
    body: UpdateUserDto,
    token: string
  ): Promise<void> => {
    await api.put("/user", body, getRequestOptions(token));
  };

  const deleteUserApi = async (token: string): Promise<void> => {
    await api.delete("/user", getRequestOptions(token));
  };

  return {
    createUserApi,
    loginUserApi,
    getUserApi,
    updateUserApi,
    deleteUserApi,
  };
};
