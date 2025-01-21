export interface Post {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: {
    likes: number;
    dislikes: number;
  };
  views: number;
  userId: number;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  birthDate: string;
  image: string;
  bloodGroup: string;
  height: number;
  weight: number;
  eyeColor: string;
  hair: {
    color: string;
    type: string;
  };
  ip: string;
  address: {
    address: string;
    city: string;
    state: string;
    stateCode: string;
    postalCode: string;
    coordinates: {
      lat: number;
      lng: number;
    };
    country: string;
  };
  macAddress: string;
  university: string;
  bank: {
    cardExpire: string;
    cardNumber: string;
    cardType: string;
    currency: string;
    iban: string;
  };
  company: {
    department: string;
    name: string;
    title: string;
    address: {
      address: string;
      city: string;
      state: string;
      stateCode: string;
      postalCode: string;
      coordinates: {
        lat: number;
        lng: number;
      };
      country: string;
    };
  };
  ein: string;
  ssn: string;
  userAgent: string;
  crypto: {
    coin: string;
    wallet: string;
    network: string;
  };
  role: string;
}

export interface Tag {
  slug: string;
  name: string;
  url: string;
}

export interface Comment {
  id: number;
  body: string;
  postId: number | null;
  likes: number;
  user: {
    id: number;
    username: string;
    fullName: string;
  };
}

export interface Response {
  limit: number;
  skip: number;
  total: number;
}

export type ResponseWithData<T, K extends string = `${Lowercase<string & T>}s`> = Response & {
  [key in K]: T[];
};

export type Posts = ResponseWithData<Post, 'posts'>;
export type Users = ResponseWithData<User, 'users'>;
export type Tags = ResponseWithData<Tag, 'tags'>;
export type Comments = ResponseWithData<Comment, 'comments'>;

export type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};
