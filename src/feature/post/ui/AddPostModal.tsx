import React, { useState } from "react"
import { Button, DialogContent, DialogHeader, DialogTitle, Input, Textarea } from "../../../shared/ui"
import { useModalStore } from "../../../shared/model/useModalStore"

function AddPostModal() {
  const { closeModal } = useModalStore()
  const [newPost, setNewPost] = useState({ title: "", body: "", userId: 1 })

  // 게시물 추가
  const addPost = async () => {
    try {
      const response = await fetch("/api/posts/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
      })
      await response.json()
      //refetch post

      closeModal()
    } catch (error) {
      console.error("게시물 추가 오류:", error)
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>새 게시물 추가</DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
        <Input
          placeholder="제목"
          value={newPost.title}
          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
        />
        <Textarea
          rows={30}
          placeholder="내용"
          value={newPost.body}
          onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
        />
        <Input
          type="number"
          placeholder="사용자 ID"
          value={newPost.userId}
          onChange={(e) => setNewPost({ ...newPost, userId: Number(e.target.value) })}
        />
        <Button onClick={addPost}>게시물 추가</Button>
      </div>
    </DialogContent>
  )
}

export default AddPostModal
