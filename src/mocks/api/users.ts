import { http, HttpResponse } from "msw";

import { User } from "@/entities/users";

import { ListResponse } from "@/shared/model";

const { users }: ListResponse<{ users: User[] }> = await fetch("/api/users?limit=0").then((res) => res.json());

const getUserById = http.get("/api/users/:userId", ({ params }) => {
  const { userId } = params;

  const user = users.find((user) => user.id === Number(userId));

  return HttpResponse.json(user);
});

const getAllUser = http.get("/api/users", () => {
  return HttpResponse.json({ users, total: users.length, skip: 0, limit: 0 });
});

export const usersApis = [getUserById, getAllUser];
