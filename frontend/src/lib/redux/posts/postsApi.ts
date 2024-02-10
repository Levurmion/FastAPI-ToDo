import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Post, PostsState } from "./postsSlice.types";
import { queryBuilder } from "@/lib/api/rtk-query-utils";
import { PathRequestConfig, PathResponses } from "@/lib/api/api-utils.types";
import { createBearerToken, getBearerToken } from "@/lib/tokens/tokens";

export const postsApi = createApi({
    reducerPath: 'postsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8000',
        prepareHeaders: (headers) => {
            return headers.set('authorization', createBearerToken())
        }
    }),
    tagTypes: ["Posts", "Comments", "Likes"],
    endpoints: (builder) => ({
        signUp: builder.mutation<PathResponses<'/auth/sign-up', 'post', 200>, PathRequestConfig<'/auth/sign-up', 'post'>>({
            query: queryBuilder('/auth/sign-up', 'post')
        }),
        signIn: builder.mutation<PathResponses<'/auth/sign-in', 'post', 200>, PathRequestConfig<'/auth/sign-in', 'post'>>({
            query: queryBuilder('/auth/sign-in', 'post')
        }),
        getUserPosts: builder.query<PathResponses<'/users/{user_id}/posts', 'get', 200>, PathRequestConfig<'/users/{user_id}/posts', 'get'>>({
            query: queryBuilder('/users/{user_id}/posts', 'get'),
            providesTags: (result) => {
                return result ? [...result.map(post => ({ type: 'Posts' as const, id: post.id })), 'Posts'] : ["Posts"]
            }
        }),
        createPost: builder.mutation<PathResponses<'/posts', 'post', 200>, PathRequestConfig<'/posts', 'post'>>({
            query: queryBuilder('/posts', 'post')
        }),
        editPost: builder.mutation<PathResponses<'/posts/{post_id}', 'put', 200>, PathRequestConfig<'/posts/{post_id}', 'put'>>({
            query: queryBuilder('/posts/{post_id}', 'put')
        }),
        deletePost: builder.mutation<PathResponses<'/posts/{post_id}', 'delete', undefined>, PathRequestConfig<'/posts/{post_id}', 'delete'>>({
            query: queryBuilder('/posts/{post_id}', 'delete')
        }),
        getPost: builder.query<PathResponses<'/posts/{post_id}', 'get', 200>, PathRequestConfig<'/posts/{post_id}', 'get'>>({
            query: queryBuilder('/posts/{post_id}', 'get'),
            providesTags: (result) => {
                return result ? [{ type: 'Posts' as const, id: result.id }] : []
            }
        }),
        getPostComments: builder.query<PathResponses<'/posts/{post_id}/comments', 'get', 200>, PathRequestConfig<'/posts/{post_id}/comments', 'get'>>({
            query: queryBuilder('/posts/{post_id}/comments', 'get'),
            providesTags: (result) => {
                return result ? [...result.map(comment => ({ type: 'Comments' as const, id: comment.id })), 'Comments'] : ['Comments']
            }
        }),
        createPostComment: builder.mutation<PathResponses<'/comments', 'post', 200>, PathRequestConfig<'/comments', 'post'>>({
            query: queryBuilder('/comments', 'post'),
            onQueryStarted: async ({ requestBody }, { dispatch, queryFulfilled }) => {
                try {
                    if (!requestBody?.data) throw new Error('createPostComment request body is undefined')

                    const { post_id } = requestBody.data
                    const { data } = await queryFulfilled
                    const createCommentResult = dispatch(
                        postsApi.util.updateQueryData('getPostComments', { pathParams: { post_id } }, (prevPostComments) => {
                            prevPostComments.unshift(data)
                        })
                    )
                } catch {}
            }
        }),
        editPostComment: builder.mutation<PathResponses<'/comments/{comment_id}', 'put', 200>, PathRequestConfig<'/comments/{comment_id}', 'put'>>({
            query: queryBuilder('/comments/{comment_id}', 'put'),
            onQueryStarted: async ({ requestBody }, { dispatch, queryFulfilled }) => {
                try {
                    if (!requestBody?.data) throw new Error('editPostComment request body is undefined')

                    const { post_id } = requestBody.data
                    const { data } = await queryFulfilled
                    const editCommentResult = dispatch(
                        postsApi.util.updateQueryData('getPostComments', { pathParams: { post_id } }, (prevPostComments) => {
                            const modifiedCommentIdx = prevPostComments.findIndex(comment => comment.id === data.id)
                            prevPostComments[modifiedCommentIdx] = data
                        })
                    )
                } catch {}
            }
        })
    })
})

export const { 
    useGetUserPostsQuery,
    useSignUpMutation,
    useSignInMutation,
    useCreatePostMutation,
    useEditPostMutation,
    useDeletePostMutation,
    useGetPostCommentsQuery, 
    useCreatePostCommentMutation,
    useEditPostCommentMutation
} = postsApi