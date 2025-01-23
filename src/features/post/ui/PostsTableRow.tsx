import { Edit2, MessageSquare, Trash2 } from 'lucide-react';
import { PostItem } from '../../../entities/post/model/types';
import { Button, HighlightText, TableCell, TableRow } from '../../../shared/ui';
import { useState } from 'react';
import { User } from '../../../entities/user';
import { atom, useAtom } from 'jotai';
import { PostsTags, PostsLikes } from '../';

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
	const [showEditDialog, setShowEditDialog] = useState(false)
	const [selectedPost, setSelectedPost] = useAtom(selectedPostAtom);

	const queryParams = new URLSearchParams(location.search)
	const [searchQuery, setSearchQuery] = useState(queryParams.get("search") || "")

	return (
		<TableRow key={post.id}>
			<TableCell>{post.id}</TableCell>
			<TableCell>
				<div className="space-y-1">
					<div>{HighlightText(post.title, searchQuery)}</div>

					<div className="flex flex-wrap gap-1">
						{post.tags?.map((tag: string) => (
							<PostsTags tag={tag} />
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
				<PostsLikes post={post} />
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