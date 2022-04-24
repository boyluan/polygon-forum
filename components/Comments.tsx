import * as React from "react";

// We're using 'chakra-ui' a s component library, which gives us some pretty elegant JSX (JavaScript XML)
// JSX allows us to write html in React.js
import {
    Box,
    Spinner,
    Stack,
    Center
} from "@chakra-ui/react";

import useComments from "../hooks/useComments";

import Comment from "./Comment";

import CommentEditor from "./CommentEditor";

import useEvents from "../hooks/useEvents";

interface CommentsProps {
    topic: string;
}

const Comments: React.FunctionComponent<CommentsProps> = ({ topic }) => {
    const query = useComments({ topic });

    // ## Notes
    // We import several chakra-ui components ⬇⬇
    // 1) Box: a simple div-like building block
    // 2) Stack: a vertical list of elements with space between each element
    // 3) Center: a 'Box' that centers its children by default
    // 4) Spinner: a loading spinner whose size and colour can be configured via props

    // We also pass a few shorthand props to make these chakra components
    // E.g: p = padding, m = margin, bg = background
    // Most chakra-ui components support a base set of style-like props to help you easily add styles
    // See: <https://chakra-ui.com/docs/styled-system/features/style-props>

    useEvents({ topic });

    return (
        // <Box as="pre">{JSON.stringify(query.data, null, 2)}</Box>;
        <Box>
            {query.isLoading && (
                <Center p={8}>
                    <Spinner />
                </Center>
            )}
            <Stack spacing={4}>
                {query.data?.map((comment) => (
                    /* <Box key={comment.id} bg="whiteAlpha.100" rounded="2x1" p={3}>
                        {comment.message}
                    </Box> */
                    <Comment key={comment.id} comment={comment} />
                ))}
                {query.isFetched && <CommentEditor topic={topic}/>} *
            </Stack>
        </Box>
    );
};

export default Comments;