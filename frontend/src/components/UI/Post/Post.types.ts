export interface PostProps {
    postId: number,
    content: string,
    posterId: number,
    username: string,
    postedOn: Date,
    allowEdit?: boolean,
    isEdited?: boolean
}