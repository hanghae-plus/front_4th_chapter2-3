interface Address {
    address: string;
    city: string;
    state: string;
}
  
interface Company {
    name: string;
    title: string;
}
  
interface User {
    username: string;
    firstName: string;
    lastName: string;
    age: number;
    email: string;
    phone: string;
    address?: Address;
    company?: Company;
    image?: string; // image 속성 추가
}

export type {
    User, 
    Address, 
    Company
}