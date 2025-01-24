import { UserModal } from "@/features/ui/UserModal"
import { Card } from "@/shared/ui/card"
import { Modal } from "@/shared/ui/modal"
import { PostManagerContent, PostManagerHeader } from "@/widgets/post/ui"

// 하이라이트 함수 추가
export const highlightText = (text: string, highlight: string) => {
  if (!text) return null
  if (!highlight.trim()) {
    return <span>{text}</span>
  }
  const regex = new RegExp(`(${highlight})`, "gi")
  const parts = text.split(regex)
  return (
    <span>
      {parts.map((part, i) => (regex.test(part) ? <mark key={i}>{part}</mark> : <span key={i}>{part}</span>))}
    </span>
  )
}

const PostsManager = () => {
  return (
    <>
      <Card className="w-full max-w-6xl mx-auto">
        <PostManagerHeader />
        <PostManagerContent />
      </Card>
      <Modal />
    </>
  )
}

export default PostsManager
