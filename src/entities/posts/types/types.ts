export interface InfUser {
 id : number;
 fullName : string;
 username: string;
}

export interface InfPost {
 id ?: string;
 title : string;
 body : string;
 userId : number;
}

export type TypeSkip = number;
export type TypeLimit = number;
export type TypeTotal = number;