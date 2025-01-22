import { UserProfileModal } from "@/widgets/users";

import { useModalStore } from "@/features/modal";

import { User } from "@/entities/users";

import { useSuspenseQueryGetUserbyId } from "../model";

interface UserProfileProps {
  userId: User["id"];
}

export function UserProfile({ userId }: UserProfileProps) {
  const { data: user } = useSuspenseQueryGetUserbyId(userId);
  const { open } = useModalStore();

  const handleOpenUser = () => {
    open(<UserProfileModal user={user} />);
  };

  return (
    <div className="flex items-center space-x-2 cursor-pointer" onClick={handleOpenUser}>
      <img src={user.image} alt={user.username} className="w-8 h-8 rounded-full" />
      <span>{user.username}</span>
    </div>
  );
}
