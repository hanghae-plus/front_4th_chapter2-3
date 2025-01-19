import { UsersResponseDto } from "@entities/user";

export const getUsers = async (): Promise<UsersResponseDto> =>
  fetch("/api/users?limit=0&select=username,image")
    .then((response) => response.json())
    .catch((error) => {
      console.error("유저 가져오기 오류:", error);
    });
