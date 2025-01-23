import { useFetchUserByIdQuery } from "../../../entities/user/api/fetchUserById";
import { useControllableState, usePreservedCallback } from "../../../shared/hooks";
import { Dialog } from "../../../shared/ui";
import { OverlayElementProps } from "../../../shared/ui/OverlayController";

interface Props extends OverlayElementProps {
  userId: number;
}

const UserInfoModal = ({ userId, opened: _opened, close }: Props) => {
  const { data: user } = useFetchUserByIdQuery(userId);

  const [opened, setOpened] = useControllableState({
    prop: _opened,
  });

  const handleOpenChange = usePreservedCallback((opened: boolean) => {
    if (!opened) close();
    setOpened(opened);
  });

  return (
    <Dialog open={opened} onOpenChange={handleOpenChange}>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>사용자 정보</Dialog.Title>
        </Dialog.Header>
        {user && (
          <div className="space-y-4">
            <img src={user.image} alt={user.username} className="mx-auto h-24 w-24 rounded-full" />
            <h3 className="text-center text-xl font-semibold">{user.username}</h3>
            <div className="space-y-2">
              <p>
                <strong>이름:</strong> {user.firstName} {user.lastName}
              </p>
              <p>
                <strong>나이:</strong> {user.age}
              </p>
              <p>
                <strong>이메일:</strong> {user.email}
              </p>
              <p>
                <strong>전화번호:</strong> {user.phone}
              </p>
              <p>
                <strong>주소:</strong> {user.address.address}, {user.address.city},{" "}
                {user.address.state}
              </p>
              <p>
                <strong>직장:</strong> {user.company.name} - {user.company.title}
              </p>
            </div>
          </div>
        )}
      </Dialog.Content>
    </Dialog>
  );
};

export default UserInfoModal;
