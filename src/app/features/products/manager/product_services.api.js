import { api } from "../../../utils/api";

export const postsApi = api.injectEndpoints({
    endpoints: build => ({
        getPosts: build.query({
            query: () => 'products',
            providesTags: ['products']
        }),
        addPosts: build.mutation({
            query: body => ({
                url: 'products',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['products'],
        }),
    }),
});

export const { useGetPostsQuery, useAddPostsMutation } = postsApi;

