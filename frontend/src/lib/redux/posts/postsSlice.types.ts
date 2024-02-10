import { components } from "@/lib/api/api-specs.types"

export type FetchStatus = 'ok' | 'loading' | 'error'
export type Post = components['schemas']['Post']

export interface PostsState {
    posts: Post[];
    status: FetchStatus,
    error: null | string
}

export const payloadIsPosts = (payload: any): payload is Post => {
    const postProps = ['content', 'poster_id', 'id', 'posted_on', 'edited']
    return postProps.every(key => key in payload)
}