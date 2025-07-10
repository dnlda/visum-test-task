import { IUser } from "../../model/types";
import { baseApi } from "./baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserById: builder.query<IUser, string>({
      query: (id) => `/users/${id}`,
    }),
  }),
});

export const { useGetUserByIdQuery } = userApi;
