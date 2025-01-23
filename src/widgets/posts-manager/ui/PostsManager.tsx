import { DynamicIcon } from "lucide-react/dynamic";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { IComment } from "../../../entities/comment/api";
import { FetchPostsParams } from "../../../entities/post/api";
import { CreatePostData, useCreatePostMutation } from "../../../entities/post/api/createPost";
import { useFetchUserByIdQuery } from "../../../entities/user/api/fetchUserById";
import CreatePostDialog from "../../../features/create-post-dialog/ui/CreatePostDialog";
import { useOverlay } from "../../../shared/hooks";
import { usePreservedCallback } from "../../../shared/hooks/usePreservedCallback";
import { createSafeContext, sortArray } from "../../../shared/lib";
import { Button, Card } from "../../../shared/ui";
import { IPostWithAuthor, useFetchPostsWithAuthor } from "../api";
import PostsManagerControlPanel from "./PostsManagerControlPanel";
import PostsManagerPagination from "./PostsManagerPagination";
import PostsManagerTable from "./PostsManagerTable";

const PostsManager = () => {
  return (
    <PostsManagerProvider>
      <Root>
        <PostsManagerControlPanel />
        <PostsManagerTable />
        <PostsManagerPagination />
      </Root>
    </PostsManagerProvider>
  );
};

/** -----------------------------------------------------------------------------------------------
 * Context API
 * --------------------------------------------------------------------------------------------- */

const initialState: ContextState = {
  posts: [],
  comments: {},
};

interface PostsManagerProviderProps {
  children: React.ReactNode;
}

const PostsManagerProvider = ({ children }: PostsManagerProviderProps) => {
  const [state, setState] = useState<ContextState>(initialState);
  const [, setSearchParams] = useSearchParams();

  // 게시물 목록 Set
  const setPosts = usePreservedCallback<ContextActions["setPosts"]>((posts) => {
    setState((prev) => ({
      ...prev,
      posts: typeof posts === "function" ? posts(prev.posts) : posts,
    }));
  });

  // 게시글 추가
  // 같은 아이디를 가진 게시글이 존재한다면 추가 되지 않음
  const createPost = usePreservedCallback<ContextActions["createPost"]>((newPost) => {
    const existing = state.posts.some((post) => post.id === newPost.id);

    if (existing) return;

    setPosts((prev) => [...prev, newPost]);
  });

  // 게시글 수정
  const modifyPost = usePreservedCallback<ContextActions["modifyPost"]>((modifiedPost) => {
    setPosts((prev) => prev.map((post) => (post.id === modifiedPost.id ? modifiedPost : post)));
  });

  // 게시글 삭제
  const deletePost = usePreservedCallback<ContextActions["deletePost"]>((id) => {
    setPosts((prev) => prev.filter((post) => post.id !== id));
  });

  // 댓글 목록 Set
  const setComments = usePreservedCallback<ContextActions["setComments"]>((postId, comments) => {
    setState((prev) => ({
      ...prev,
      comments: {
        ...prev.comments,
        [postId]: typeof comments === "function" ? comments(prev.comments[postId] || []) : comments,
      },
    }));
  });

  // 댓글 추가
  // 같은 아이디를 가진 댓글이 존재한다면 추가되지 않음
  const createComment = usePreservedCallback<ContextActions["createComment"]>(
    (postId, newComment) => {
      const postComments = state.comments[postId];
      const existing = postComments.some((comment) => comment.id === newComment.id);

      if (existing) return;

      setComments(postId, (prev) => [...prev, newComment]);
    },
  );

  // 댓글 수정
  const modifyComment = usePreservedCallback<ContextActions["modifyComment"]>(
    (postId, modifiedComment) => {
      if (!state.comments[postId]) return;

      setComments(postId, (prev) =>
        prev.map((comment) => (comment.id === modifiedComment.id ? modifiedComment : comment)),
      );
    },
  );

  // 댓글 삭제
  const deleteComment = usePreservedCallback<ContextActions["deleteComment"]>(
    (postId, commentId) => {
      if (!state.comments[postId]) return;

      setComments(postId, (prev) => prev.filter((comment) => comment.id !== commentId));
    },
  );

  const onParamsChange = usePreservedCallback<ContextActions["onParamsChange"]>((key, value) => {
    setSearchParams((prev) => {
      prev.set(key, String(value));
      return prev;
    });
  });

  const actions = useMemo<ContextActions>(
    () => ({
      setPosts,
      createPost,
      modifyPost,
      deletePost,
      setComments,
      createComment,
      modifyComment,
      deleteComment,
      onParamsChange,
    }),
    [
      setPosts,
      createPost,
      modifyPost,
      deletePost,
      setComments,
      createComment,
      modifyComment,
      deleteComment,
      onParamsChange,
    ],
  );

  return (
    <PostsManagerStateProvider {...state}>
      <PostsManagerActionsProvider {...actions}>{children}</PostsManagerActionsProvider>
    </PostsManagerStateProvider>
  );
};

interface ContextState {
  posts: IPostWithAuthor[];
  comments: Record<number, IComment[]>;
}

interface ContextActions {
  setPosts: (posts: React.SetStateAction<ContextState["posts"]>) => void;
  createPost: (newPost: IPostWithAuthor) => void;
  modifyPost: (modifiedPost: IPostWithAuthor) => void;
  deletePost: (id: number) => void;
  setComments: (postId: number, comments: React.SetStateAction<IComment[]>) => void;
  createComment: (postId: number, newComment: IComment) => void;
  modifyComment: (postId: number, modifiedComment: IComment) => void;
  deleteComment: (postId: number, commentId: number) => void;
  onParamsChange: <K extends keyof FetchPostsParams>(key: K, value: FetchPostsParams[K]) => void;
}

export const [PostsManagerStateProvider, usePostsManagerStateContext] =
  createSafeContext<ContextState>("PostsManager");
export const [PostsManagerActionsProvider, usePostsManagerActionsContext] =
  createSafeContext<ContextActions>("PostsManager");

/** -----------------------------------------------------------------------------------------------
 * Sub Components
 * --------------------------------------------------------------------------------------------- */

interface RootProps {
  children: React.ReactNode;
}

const Root = ({ children }: RootProps) => {
  const { setPosts, createPost } = usePostsManagerActionsContext("Root");

  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("searchQuery");
  const selectedTag = searchParams.get("selectedTag");
  const sortBy = searchParams.get("sortBy") || "id";
  const order = searchParams.get("order") || "asc";

  const overlay = useOverlay();

  const { data: postsData } = useFetchPostsWithAuthor({ limit: 0 });
  const { data: user } = useFetchUserByIdQuery(1);
  const { mutateAsync: createPostMutateAsync } = useCreatePostMutation();

  useEffect(() => {
    setPosts(postsData?.posts || []);
  }, [postsData, setPosts]);

  useEffect(() => {
    const origin = postsData?.posts || [];
    let clone = [...origin];

    if (searchQuery !== null) {
      clone = clone.filter((post) => post.body.toLowerCase().includes(searchQuery));
    }

    if (selectedTag !== null && selectedTag !== "all") {
      clone = clone.filter(({ tags }) =>
        tags.map((tag) => tag.toLowerCase()).includes(selectedTag!.toLowerCase()),
      );
    }

    clone = sortArray(clone, sortBy, order);

    setPosts(clone);
  }, [postsData, searchQuery, selectedTag, sortBy, order, setPosts]);

  const handlePostCreate = usePreservedCallback(async (newPost: CreatePostData) => {
    const _post = await createPostMutateAsync(newPost);
    const post = {
      ..._post,
      id: Date.now(),
      tags: [],
      reactions: {
        likes: 0,
        dislikes: 0,
      },
      view: 0,
      userId: 1,
      author: user || null,
    };

    createPost(post);
  });

  return (
    <Card className="mx-auto w-full max-w-6xl">
      <Card.Header>
        <Card.Title className="flex items-center justify-between">
          <span>게시물 관리자</span>
          <Button
            onClick={() => {
              overlay.open((props) => (
                <CreatePostDialog {...props} onPostCreate={handlePostCreate} />
              ));
            }}
          >
            <DynamicIcon name="plus" className="mr-2" size="16px" />
            게시물 추가
          </Button>
        </Card.Title>
      </Card.Header>
      <Card.Content>{children}</Card.Content>
    </Card>
  );
};

export default PostsManager;
