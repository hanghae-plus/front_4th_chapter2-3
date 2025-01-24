import { TableHead, TableRow } from "../../../shared/ui";

export const PostHeader = () => {
  return (
    <TableRow>
      <TableHead className="w-[50px]">ID</TableHead>
      <TableHead>제목</TableHead>
      <TableHead className="w-[150px]">작성자</TableHead>
      <TableHead className="w-[150px]">반응</TableHead>
      <TableHead className="w-[150px]">작업</TableHead>
    </TableRow>
  );
};
