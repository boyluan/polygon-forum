import * as React from "react";

import {
    Button,
    HStack,
    Stack,
    Textarea
} from "@chakra-ui/react";

import { constants } from "ethers";

import Avatar from "@davatar/react";

import AuthButton from "./AuthButton";

import { useAccount } from "wagmi";

import useAddComment from "../hooks/useAddComment";

interface CommentEditorProps {
    topic: string;
}

const CommentEditor: React.FunctionComponent<CommentEditorProps> = ({
    topic,
}) => {
    const [message, setMessage] = React.useState("");
    const mutation = useAddComment();
    const [accountQuery] = useAccount();

    return (
        <Stack spacing={3}>
            <HStack spacing={3} alignItems="start">
                {/*
                    # On the LEFT: we show an avatar corresponding to the signed-in user ⬇
                    # (or the null address if no user is signed in)
                */}
                <Avatar
                    size={48}
                    address={accountQuery.data?.address || constants.AddressZero}
                />
                {/*
                    # On the RIGHT: we show a text-area and a submit button ⬇⬇
                    # This is to allow the user to write/submit comments
                    # When the button is clicked, we call mutateAsync (see: Line 63) on the mutation
                    # Which actually fires off the call to the blockchain
                */}
                <Textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write a message.."
                    p={3}
                    flex={1}
                    bg="whiteAlpha.100"
                    rounded="2xl"
                    fontSize="lg"
                />
            </HStack>
            {/*
                # We change our <Button /> tags to 'AuthButton'
                # Ref. Lines 14, 63 + 78
            */}
            <AuthButton
                size="sm"
                colorScheme="pink"
                alignSelf="flex-end"
                onClick={() => {
                    mutation
                        .mutateAsync({
                            message,
                            topic,
                        })
                        .then(() => setMessage(""));
                }}
                isLoading={mutation.isLoading}
            >
                Submit
            </AuthButton>
        </Stack>
    );
};

export default CommentEditor;