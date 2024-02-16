export interface CommentProps {
    commentId: number
    comment: string
    commenterId: number
    postId: number
    username?: string
    postedOn?: Date
    allowEdit?: boolean
    isEdited?: boolean
}