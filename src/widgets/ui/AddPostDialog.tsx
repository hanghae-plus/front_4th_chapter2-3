import React from "react"
import { useStore } from "../../app/store"
import { Dialog, DialogContent, DialogHeader, DialogTitle, Input, Textarea, Button } from "../../shared/ui"

// 상태 관리
const { posts, newPost, showAddDialog, setPosts, setNewPost, setShowAddDialog } = useStore()

// 게시물 추가
const addPost = async () => {
  try {
    const response = await fetch("/api/posts/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPost),
    })
    const data = await response.json()
    setPosts([data, ...posts])
    setShowAddDialog(false)
    setNewPost({ id: 0, title: "", body: "", userId: 1 })
  } catch (error) {
    console.error("게시물 추가 오류:", error)
  }
}

/**
 * 게시물 추가 대화상자
 * @returns
 */

export const AddPostDialog = () => {
  return (
    <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 게시물 추가</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="제목"
            value={newPost.title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewPost({ ...newPost, title: e.target.value })}
          />
          <Textarea
            rows={30}
            placeholder="내용"
            value={newPost.body}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewPost({ ...newPost, body: e.target.value })}
          />
          <Input
            type="number"
            placeholder="사용자 ID"
            value={newPost.userId}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setNewPost({ ...newPost, userId: Number(e.target.value) })
            }
          />
          <Button onClick={addPost}>게시물 추가</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
