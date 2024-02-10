import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPostsApi } from "../api/api-utils";

export const fetchUserPosts = createAsyncThunk(
    "user/posts",
    async (userId: number, { rejectWithValue }) => {
        try {
            const response = await fetchPostsApi("/users/{user_id}/posts", "get", {
                pathParams: {
                    user_id: userId,
                },
            });
            if (response.status === 200) return response.data;
            else if (response.status === 401) return rejectWithValue("unauthorized");
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);
