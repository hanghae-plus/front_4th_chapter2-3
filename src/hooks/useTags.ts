import { useEffect, useState } from "react"
import { getTags } from "../api/tag"

export const useTags = () => {
  const [tags, setTags] = useState([])

  const fetchTags = async () => {
    try {
      const data = await getTags()
      setTags(data)
    } catch (error) {
      console.error("태그 가져오기 오류:", error)
    }
  }

  useEffect(() => {
    fetchTags()
  }, [])

  return {
    tags,
  }
}
