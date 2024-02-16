import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Post, PostsState } from "./postsApi.types";
import { queryBuilder } from "@/lib/api/rtk-query-utils";
import { PathRequestConfig, PathResponses } from "@/lib/api/api-utils.types";
import { createBearerToken, getBearerToken, getUserFromJwt } from "@/lib/tokens/tokens";
import { User } from "@/lib/tokens/tokens.types";
import { current } from "@reduxjs/toolkit";

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
        getUser: builder.query<PathResponses<'/users', 'get', 200>, PathRequestConfig<'/users', 'get'>>({
            query: queryBuilder('/users', 'get')
        }),
        getPost: builder.query<PathResponses<'/posts/{post_id}', 'get', 200>, PathRequestConfig<'/posts/{post_id}', 'get'>>({
            query: queryBuilder('/posts/{post_id}', 'get'),
            providesTags: (result) => {
                return result ? [{ type: 'Posts' as const, id: result.id }] : []
            }
        }),
        getUserPosts: builder.query<PathResponses<'/users/{user_id}/posts', 'get', 200>, PathRequestConfig<'/users/{user_id}/posts', 'get'>>({
            query: queryBuilder('/users/{user_id}/posts', 'get'),
            providesTags: (result) => {
                return result ? [...result.map(post => ({ type: 'Posts' as const, id: post.id })), 'Posts'] : ["Posts"]
            }
        }),
        createUserPost: builder.mutation<PathResponses<'/posts', 'post', 200>, PathRequestConfig<'/posts', 'post'>>({
            query: queryBuilder('/posts', 'post'),
            onQueryStarted: async ({ requestBody }, { dispatch, queryFulfilled }) => {
                try {
                    if (!requestBody?.data) throw new Error('createUserPost request body is undefined')

                    const { data } = await queryFulfilled
                    const { poster_id } = requestBody.data
                    const createUserPostResult = dispatch(
                        postsApi.util.updateQueryData('getUserPosts', { pathParams: { user_id: poster_id } }, (draftPosts) => {
                            draftPosts.unshift(data)
                        })
                    )
                } catch {}
            }
        }),
        editUserPost: builder.mutation<PathResponses<'/posts/{post_id}', 'put', 200>, PathRequestConfig<'/posts/{post_id}', 'put'>>({
            query: queryBuilder('/posts/{post_id}', 'put'),
            onQueryStarted: async ({ requestBody, pathParams }, { dispatch, queryFulfilled }) => {
                try {
                    if (!requestBody?.data || !pathParams) throw new Error('editPost request body or path parameters are undefined')

                    const { data } = await queryFulfilled
                    const editUserPostResult = dispatch(
                        postsApi.util.updateQueryData('getUserPosts', { pathParams: { user_id: data.poster_id } }, (draftPosts) => {
                            const editedPostIdx = draftPosts.findIndex(post => post.id === data.id)
                            draftPosts[editedPostIdx] = data
                        })
                    )
                } catch {}
            }
        }),
        deleteUserPost: builder.mutation<PathResponses<'/posts/{post_id}', 'delete', undefined>, PathRequestConfig<'/posts/{post_id}', 'delete'>>({
            query: queryBuilder('/posts/{post_id}', 'delete'),
            onQueryStarted: async ({ pathParams }, { dispatch, queryFulfilled }) => {
                if (!pathParams) throw new Error('deleteUserPost path parameters are undefined')

                const { meta } = await queryFulfilled
                const { post_id } = pathParams
                const user = getUserFromJwt() as User
                if (meta?.response?.status === 200) {
                    const deleteUserPostResult = dispatch(
                        postsApi.util.updateQueryData('getUserPosts', { pathParams: { user_id: user?.id as number } }, (draftPosts) => {
                            const postsWithoutDeleted = draftPosts.filter(post => post.id !== post_id)
                            Object.assign(draftPosts, postsWithoutDeleted)
                            draftPosts.pop()
                            console.log(current(draftPosts))
                        })
                    )
                }
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
                        postsApi.util.updateQueryData('getPostComments', { pathParams: { post_id } }, (draftPostComments) => {
                            draftPostComments.unshift(data)
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
                        postsApi.util.updateQueryData('getPostComments', { pathParams: { post_id } }, (draftPostComments) => {
                            const modifiedCommentIdx = draftPostComments.findIndex(comment => comment.id === data.id)
                            draftPostComments[modifiedCommentIdx] = data
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
    useGetUserQuery,
    useCreateUserPostMutation,
    useEditUserPostMutation,
    useDeleteUserPostMutation,
    useGetPostCommentsQuery, 
    useCreatePostCommentMutation,
    useEditPostCommentMutation
} = postsApi