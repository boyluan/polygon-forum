// SPDX-License-Identifier: Unilicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Comments {
    // Exposed data structure
    struct Comment {
        uint32 id;
        string topic;
        address creator_address;
        string message;
        uint created_at;
    }

    // First, we add an 'idCounter' to help us generate serial ids
    // idCounter is stored on-chain, and so its value will be persisted across function calls
    uint32 private idCounter;
    // After creating a comment in memory, we then push it to the 'commentsByTopic' mapping
    mapping(string => Comment[]) private commentsByTopic;

    // Notify users that a comment was added
    event CommentAdded(Comment comment);

    // Fetch a list of comments for a topic
    function getComments(string calldata topic) public view returns(Comment[] memory) {
        return commentsByTopic[topic];
    }

    // Persist a new comment
    function addComment(string calldata topic, string calldata message) public {
        Comment memory comment = Comment({
            id: idCounter,
            topic: topic,
            // 'msg.sender' is very commonly used, and holds the address of the authenticated wallet
            creator_address: msg.sender,
            message: message,
            created_at: block.timestamp

            // ## ⬇⬇
            // 'msg.sender' and 'blocl' are bits of contextual data (contd. below)
            // that are automatically provided to each function
            // <https://docs.soliditylang.org/en/develop/units-and-global-variables.html#special-variables-and-functions>
        });
        commentsByTopic[topic].push(comment);
        idCounter++;
        // Lastly, we're emitting a 'CommentAdded' event - which will later be useful to update our UI
        emit CommentAdded(comment);
    }
}