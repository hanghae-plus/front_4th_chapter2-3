export interface User {
  id: number;
  name?: string;
  username?: string;
  image?: string; // 필수 필드
  firstName?: string;
  lastName?: string;
  age?: number;
  email?: string;
  phone?: string;
  address?: {
    address?: string;
    city?: string;
    state?: string;
  };
  company?: {
    name?: string;
    title?: string;
  };
}
