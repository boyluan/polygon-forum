// This component is responsible for render each individual comment

import * as React from "react";

import {
    Text,
    Heading,
    HStack,
    Stack
} from "@chakra-ui/react";

// 'react-timeago' renders the duration that has passed since a comment was created
import TimeAgo from "react-timeago";

// '@davatar/react' helps us render a unique avatar for every wallet address
import Avatar from "@davatar/react";

import Username from "./Username";

import { Comment } from "../hooks/useCommentsContract";

interface CommentProps {
    comment: Comment;
}

// ## Notes
// We pass a few shorthand props to make these chakra components
// E.g: p = padding, bg = background
// Most chakra-ui components support a base set of style-like props to help you easily add styles
// See: <https://chakra-ui.com/docs/styled-system/features/style-props>

const Comment: React.FunctionComponent<CommentProps> = ({ comment }) => {
    return (
        <HStack spacing={3} alignItems="start">
            <Avatar size={48} address={comment.creator_address} />
            <Stack spacing={1} flex={1} bg="whiteAlpha.100" rounded="2xl" p={3}>
                <Heading color="whiteAlpha.900" fontSize="lg">
                    <Username address={comment.creator_address} />
                </Heading>
                <Text color="whiteAlpha.800" fontSize="lg">
                    {comment.message}
                </Text>
                <Text color="whiteAlpha.500" fontSize="md">
                    <TimeAgo date={comment.created_at.toNumber() * 1000} />
                </Text>
            </Stack>
        </HStack>
    );
};

export default Comment;