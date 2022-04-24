// This hook is responsible for managing react state around the promise lifecycle of our 'getComments' function
// To do this, we'll use react-query (see: <https://react-query.tanstack.com/overview>)
// This is an incredibly powerful async state management library for react
// 'react-query' fetches data on our behalf, and provides use useful state helpers such as:
// isLoading, isSuccess, and isError
import { useQuery } from "react-query";

import useCommentsContract from "./useCommentsContract";

interface UseCommentsQuery {
    topic: string;
}

// Notes ⬇
// This hook will automatically fetch comments for a given topic when rendered
// And also will re-fetch comments whenever the 'topic' or the 'chainId' change

const useComments = ({ topic }: UseCommentsQuery) => {
    const contract = useCommentsContract();
    // The first argument passed to 'useQuery' is known as a query key
    // See: <https://react-query.tanstack.com/guides/query-keys>
    // The query key is serialized by 'react-query' and used to maintain a global cache of fetched data
    return useQuery(["comments", { topic, chainId: contract.chainId }], () =>
        contract.getComments(topic)
    );
};

export default useComments;