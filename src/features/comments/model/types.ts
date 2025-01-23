interface NewComment { 
    body: string
    postId: number | null
    userId: number
}

interface Comment {
    id: number
    postId: number
    body: string
    user: { username: string }
    likes: number
}
  
interface CommentsState {
    [postId: number]: Comment[]
}

export type { 
    NewComment, Comment, CommentsState 
}