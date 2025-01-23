import { FunctionComponent } from "react"
import { Button, Textarea } from "../../../shared/ui"
import { TComment } from "../model/types"

const ButtonLabel = {
  POST: "댓글 추가",
  PATCH: "댓글 업데이트",
}

type TType = keyof typeof ButtonLabel

type TCommentForm = {
  comment?: TComment
  type: TType
}

const CommnetForm: FunctionComponent<TCommentForm> = ({
  comment = {
    id: 0,
    body: "",
    postId: null,
    userId: 0,
    likes: 0,
    user: {
      id: 0,
      username: "",
      fullName: "",
    },
  },
  type,
}) => {
  return (
    <div className="space-y-4">
      <Textarea
        placeholder="댓글 내용"
        value={comment.body || ""}
        onChange={(e) => console.log(e.target.value, "~~~commnetDataUPDATE~~~")}
      />
      <Button
        onClick={() => {
          console.log("~~UPDATE COMMENT~~")
        }}
      >
        {ButtonLabel[type]}
      </Button>
    </div>
  )
}

export default CommnetForm
