export interface InfComment {
  body : string;
  id ?: number;
  likes ?: number;
  postId : number | null;
  userId : number | null;
}

export interface InfComments {
  limit : number;
  skip : number;
  total : number;
  comments: InfComment[];
}

// export interface InfComments {
//   [postId : number] : InfComment[];
// }