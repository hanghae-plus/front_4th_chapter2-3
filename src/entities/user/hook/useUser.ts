import { useSetAtom } from "jotai";
import { selectedUserAtom, userModalAtom } from "../../../app/store/atom";
import { User } from "../model/types";

export const useUser = () => {
  const setSelectedUser = useSetAtom(selectedUserAtom);
  const setShowUserModal = useSetAtom(userModalAtom);

  // 사용자 모달 열기
  const openUserModal = async (user: User) => {
    if (!user) return;

    try {
      const response = await fetch(`/api/users/${user?.id}`);
      const userData = await response.json();

      setSelectedUser(userData);
      setShowUserModal(true);
    } catch (error) {
      console.error("사용자 정보 가져오기 오류:", error);
    }
  };

  return { openUserModal };
};
