import {
	Button,
	Flex,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
} from "@chakra-ui/react";
import Comment from "../Comment/Comment";
import usePostComment from "../../hooks/usePostComment";
import { useEffect, useRef, useState } from "react";
import Picker from "emoji-picker-react";

const CommentsModal = ({ isOpen, onClose, post }) => {
	const { isCommenting, handlePostComment } = usePostComment();
	const commentsContainerRef = useRef(null);

	const [commentText, setCommentText] = useState("");
	const [showEmojiPicker, setShowEmojiPicker] = useState(false);

	const handleSubmitComment = async (e) => {
		e.preventDefault();
		await handlePostComment(post.id, commentText);
		setCommentText(""); 
	};

	const onEmojiClick = (emojiData) => {
		setCommentText((prev) => prev + emojiData.emoji); // Append emoji to the current text
	};

	useEffect(() => {
		const scrollToBottom = () => {
			commentsContainerRef.current.scrollTop =
				commentsContainerRef.current.scrollHeight;
		};
		if (isOpen) {
			setTimeout(() => {
				scrollToBottom();
			}, 100);
		}
	}, [isOpen, post.comments.length]);

	return (
		<Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInLeft">
			<ModalOverlay />
			<ModalContent bg={"black"} border={"1px solid gray"} maxW={"400px"}>
				<ModalHeader>Comments</ModalHeader>
				<ModalCloseButton />
				<ModalBody pb={6}>
					<Flex
						mb={4}
						gap={4}
						flexDir={"column"}
						maxH={"250px"}
						overflowY={"auto"}
						ref={commentsContainerRef}
					>
						{post.comments.map((comment, idx) => (
							<Comment key={idx} comment={comment} />
						))}
					</Flex>
					<form onSubmit={handleSubmitComment} style={{ marginTop: "2rem" }}>
						<Input
							placeholder="Comment"
							size={"sm"}
							value={commentText} 
							onChange={(e) => setCommentText(e.target.value)} // Update state
						/>
						<Flex w={"full"} justifyContent={"space-between"} alignItems={"center"} mt={2}>
							<Button
								size={"sm"}
								bg={"transparent"}
								color={"blue.400"}
								_hover={{ color: "white" }}
								onClick={() => setShowEmojiPicker(!showEmojiPicker)}
							>
								{showEmojiPicker ? "Close Emojis" : "Add Emoji"}
							</Button>
							<Button type="submit" ml={"auto"} size={"sm"} my={4} isLoading={isCommenting}>
								Post
							</Button>
						</Flex>
						{showEmojiPicker && (
							<Picker
								onEmojiClick={onEmojiClick}
								pickerStyle={{ width: "100%" }}
							/>
						)}
					</form>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};

export default CommentsModal;
