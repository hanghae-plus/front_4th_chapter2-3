import { Edit2, MessageSquare, ThumbsDown, ThumbsUp, Trash2 } from 'lucide-react';
import { PostItem } from '../../../entities/post/model/types';
import { Button, TableCell, TableRow } from '../../../shared/ui';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { User } from '../../../entities/user';
import { atom, useAtom } from 'jotai';

interface PostTableRowProps {
  post: PostItem;
  onUserModalClick: (author: User) => void;
  onPostDetailClick: (post: PostItem) => void;
  onDeleteClick: (id: number) => void;
}

const selectedPostAtom = atom<PostItem | null>(null);

export const PostsTableRow = ({
	post,
	onUserModalClick,
	onPostDetailClick,
	onDeleteClick,
}: PostTableRowProps) => {

	const navigate = useNavigate();
	const queryParams = new URLSearchParams(location.search)

	const [showEditDialog, setShowEditDialog] = useState(false)
	const [selectedPost, setSelectedPost] = useAtom(selectedPostAtom);

	// URL 업데이트 함수
	const updateURL = () => {
		const params = new URLSearchParams()
		if (skip) params.set("skip", skip.toString())
		if (limit) params.set("limit", limit.toString())
		if (searchQuery) params.set("search", searchQuery)
		if (sortBy) params.set("sortBy", sortBy)
		if (sortOrder) params.set("sortOrder", sortOrder)
		if (selectedTag) params.set("tag", selectedTag)
		navigate(`?${params.toString()}`)
	}

	const [skip, setSkip] = useState(parseInt(queryParams.get("skip") || "0"))
	const [limit, setLimit] = useState(parseInt(queryParams.get("limit") || "10"))
	const [searchQuery, setSearchQuery] = useState(queryParams.get("search") || "")
	const [sortBy, setSortBy] = useState(queryParams.get("sortBy") || "")
	const [sortOrder, setSortOrder] = useState(queryParams.get("sortOrder") || "asc")
	const [selectedTag, setSelectedTag] = useState(queryParams.get("tag") || "")
	// 하이라이트 함수 추가
  const highlightText = (text: string, highlight: string) => {
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

	return (
		<TableRow key={post.id}>
			<TableCell>{post.id}</TableCell>
			<TableCell>
				<div className="space-y-1">
					<div>{highlightText(post.title, searchQuery)}</div>

					<div className="flex flex-wrap gap-1">
						{post.tags?.map((tag) => (
							<span
								key={tag}
								className={`px-1 text-[9px] font-semibold rounded-[4px] cursor-pointer ${
									selectedTag === tag
										? "text-white bg-blue-500 hover:bg-blue-600"
										: "text-blue-800 bg-blue-100 hover:bg-blue-200"
								}`}
								onClick={() => {
									setSelectedTag(tag)
									updateURL()
								}}
							>
								{tag}
							</span>
						))}
					</div>
				</div>
			</TableCell>
			<TableCell>
				<div className="flex items-center space-x-2 cursor-pointer" onClick={() => onUserModalClick(post.author)}>
					<img src={post.author?.image} alt={post.author?.username} className="w-8 h-8 rounded-full" />
					<span>{post.author?.username}</span>
				</div>
			</TableCell>
			<TableCell>
				<div className="flex items-center gap-2">
					<ThumbsUp className="w-4 h-4" />
					<span>{post.reactions?.likes || 0}</span>
					<ThumbsDown className="w-4 h-4" />
					<span>{post.reactions?.dislikes || 0}</span>
				</div>
			</TableCell>
			<TableCell>
				<div className="flex items-center gap-2">
					<Button variant="ghost" size="sm" onClick={() => onPostDetailClick(post)}>
						<MessageSquare className="w-4 h-4" />
					</Button>
					<Button
						variant="ghost"
						size="sm"
						onClick={() => {
							setSelectedPost(post)
							setShowEditDialog(true)
						}}
					>
						<Edit2 className="w-4 h-4" />
					</Button>
					<Button variant="ghost" size="sm" onClick={() => onDeleteClick(post.id)}>
						<Trash2 className="w-4 h-4" />
					</Button>
				</div>
			</TableCell>
		</TableRow>
	)
}