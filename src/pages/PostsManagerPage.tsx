import { Fragment, useEffect, useState } from "react"
import { Plus } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Button } from "../shared/ui/Button/ui"
import { Card, CardContent, CardHeader, CardTitle } from "../shared/ui/Card/ui"
import { useDeletePosts, useGetPosts, useGetSearchPosts, usePostPosts, usePutPosts } from "../features/post/api"
import { useGetPostsByTag, useGetTags } from "../features/tag/api"
import PostTable from "../components/PostTable"
import Pagination from "../components/Pagination"
import { useSearchStore } from "../shared/model/useSearchStore"
import SearchForm from "../components/SearchForm"
import usePostModalStore from "../entities/modal/model/usePostModalStore"
import PostForm from "../components/PostForm"
import { Post, postPostsRequest } from "../entities/post/model/type"

const PostsManager = () => {
  const { search, tag, sortBy, sortOrder, limit, skip, resetSearchParams } = useSearchStore()

  const navigate = useNavigate()
  const { openPostModal, closePostModal } = usePostModalStore()

  // 상태 관리
  const [posts, setPosts] = useState<Post[]>([])
  const [total, setTotal] = useState<number>(0)

  //search 값이 변경될때 마다 URL 업데이트 및 조회
  useEffect(() => {
    updateQuerystring()
  }, [search, tag, sortBy, sortOrder, limit, skip])

  const updateQuerystring = () => {
    const params = new URLSearchParams()
    const searchParams = {
      search: search,
      tag: tag,
      sortBy: sortBy,
      sortOrder: sortOrder,
      limit: limit,
      skip: skip,
    }

    Object.entries(searchParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        params.set(key, String(value))
      }
    })

    navigate({ search: params.toString() }, { replace: true })
  }

  //값이 변경될때마다 조회
  const {
    data: postsData,
    isLoading: postsLoading,
    isError: postsIsError,
    error: postsError,
  } = useGetPosts({ limit, skip })

  const { data: postsDataByTag, isLoading: tagsLoading, isError: tagsIsError, error: tagsError } = useGetPostsByTag(tag)

  //나머지 api
  const { data: tags } = useGetTags()
  const { mutate: getSearchPostsMutation } = useGetSearchPosts()
  const { mutate: addPostMutation } = usePostPosts()
  const { mutate: putPostMutation } = usePutPosts()
  const { mutate: deletePostMutation } = useDeletePosts()

  useEffect(() => {
    if (postsData) {
      setPosts(postsData.posts)
      setTotal(postsData.total)
    }

    if (postsIsError) {
      console.error("게시물 가져오기 오류:", postsError)
    }
  }, [postsData])

  useEffect(() => {
    if (postsDataByTag) {
      setPosts(postsDataByTag.posts)
      setTotal(postsDataByTag.total)
    }

    if (tagsIsError) {
      console.error("게시물 가져오기 오류:", tagsError)
    }
  }, [postsDataByTag])

  // 게시물 검색
  const searchPosts = async () => {
    getSearchPostsMutation(
      { q: search! },
      {
        onSuccess: (data) => {
          setPosts(data.posts)
          setTotal(data.total)
        },
        onError: (error) => {
          console.error("게시물 검색 오류:", error)
        },
      },
    )
  }

  //게시물 추가
  const addPost = (form: postPostsRequest) => {
    addPostMutation(form, {
      onSuccess: (data) => {
        setPosts([data, ...posts])
        closePostModal()
      },
      onError: (error) => {
        console.error("게시물 추가 오류:", error)
      },
    })
  }

  //게시물 수정
  const editPost = (form: postPostsRequest) => {
    const post = posts.find((p) => p.userId === form.userId)
    const newForm = { ...post!, ...form }

    putPostMutation(newForm, {
      onSuccess: (data) => {
        setPosts(posts.map((post) => (post.id === data.id ? data : post)))
        closePostModal()
      },
      onError: (error) => {
        console.error("게시물 업데이트 오류:", error)
      },
    })
  }

  // 게시물 삭제
  const deletePost = async (id: number) => {
    deletePostMutation(id, {
      onSuccess: () => {
        setPosts(posts.filter((post) => post.id !== id))
      },
      onError: (error) => {
        console.error("게시물 삭제 오류:", error)
      },
    })
  }

  return (
    <Fragment>
      <Card className="w-full max-w-6xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>게시물 관리자</span>
            <div className="flex gap-4">
              <Button
                onClick={() => {
                  resetSearchParams()
                }}
              >
                검색 초기화
              </Button>
              <Button
                onClick={() => {
                  openPostModal({
                    title: "새 게시물 추가",
                    children: <PostForm onSubmit={addPost} />,
                  })
                }}
              >
                <Plus className="w-4 h-4 mr-2" />
                게시물 추가
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            {/* 검색 및 필터 컨트롤 */}
            <SearchForm tags={tags!} searchPosts={searchPosts} />

            {/* 게시물 테이블 */}
            {postsLoading || tagsLoading ? (
              <div className="flex justify-center p-4">로딩 중...</div>
            ) : (
              <PostTable posts={posts} editPost={editPost} deletePost={deletePost} />
            )}

            {/* 페이지네이션 */}
            <Pagination total={total} />
          </div>
        </CardContent>
      </Card>
    </Fragment>
  )
}

export default PostsManager
