import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../../shared/ui';
import { useUserStore } from '../model/store';
import { useUserDetail } from '../api/queries';

export const UserDetailDialog = () => {
  const { selectedUser, isUserDetailOpen, setSelectedUser, setIsUserDetailOpen } = useUserStore();

  const { data: userDetail } = useUserDetail(selectedUser?.id || 0);

  const handleOpenChange = (open: boolean) => {
    setIsUserDetailOpen(open);
    if (!open) {
      setSelectedUser(null);
    }
  };

  if (!userDetail) return null;

  return (
    <Dialog open={isUserDetailOpen} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>사용자 정보</DialogTitle>
        </DialogHeader>
        <div className='space-y-4'>
          {/* 프로필 이미지 */}
          <div className='flex justify-center'>
            <img
              src={userDetail.image}
              alt={userDetail.username}
              className='w-24 h-24 rounded-full'
            />
          </div>

          {/* 기본 정보 */}
          <div className='text-center'>
            <h3 className='text-xl font-semibold'>{userDetail.username}</h3>
            <p className='text-sm text-muted-foreground'>
              {userDetail.firstName} {userDetail.lastName}
            </p>
          </div>

          {/* 상세 정보 */}
          <div className='space-y-2 text-sm'>
            <InfoItem label='이메일' value={userDetail.email} />
            <InfoItem label='나이' value={userDetail.age.toString()} />
            <InfoItem label='전화번호' value={userDetail.phone} />
            <InfoItem
              label='주소'
              value={`${userDetail.address?.address}, ${userDetail.address?.city}`}
            />
            <InfoItem
              label='직장'
              value={`${userDetail.company?.name} - ${userDetail.company?.title}`}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// 헬퍼 컴포넌트
const InfoItem = ({ label, value }: { label: string; value: string }) => (
  <div className='flex justify-between'>
    <span className='font-medium'>{label}:</span>
    <span className='text-muted-foreground'>{value}</span>
  </div>
);
