import { IPost, IPostWithUsername, IUser } from "../../model/types";
import { baseApi } from "./baseApi";

export const postsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query<IPost[], void>({
      query: () => "/posts",
    }),
    getPostsById: builder.query<IPostWithUsername, string>({
      async queryFn(id, _queryApi, _extraOptions, fetchWithBQ) {
        // Сначала получаем пост по ID
        const postResult = await fetchWithBQ(`/posts/${id}`);
        if (postResult.error) throw postResult.error;
        const post = postResult.data as IPost;

        // Затем получаем пользователя по userId из поста
        const userResult = await fetchWithBQ(`/users/${post.userId}`);
        if (userResult.error) throw userResult.error;
        const user = userResult.data as IUser;

        // Объединяем данные поста и имя пользователя
        return {
          data: {
            ...post,
            userName: user.name,
          },
        };
      },
    }),
  }),
});

export const { useGetPostsQuery, useGetPostsByIdQuery } = postsApi;
