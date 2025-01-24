export interface Tag {
  slug: string
  name: string
  url: string
}

export const tagApi = {
  getTags: async () => {
    try {
      const response = await fetch("/api/posts/tags")
      return (await response.json()) as Tag[]
    } catch (error) {
      console.error("GET /api/posts/tags:", error)
    }
  },
}
