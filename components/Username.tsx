import * as React from "react";

import {
    Text,
    TextProps
} from "@chakra-ui/react";

// We're going to use this component to lookup and display the ENS name for a wallet address
// And if one does not exist, we will display a truncated wallet address string instead ⬇
// Coercing it to the format: '0x123...4567'
import { useEnsLookup } from "wagmi";
import truncateMiddle from "truncate-middle";

interface UsernameProps extends TextProps {
    address: string;
}

const Username: React.FunctionComponent<UsernameProps> = ({
    address,
    ...otherProps
}) => {
    const [query] = useEnsLookup({ address });

    // Show ENS name if it exists
    // Display truncated wallet address as a fallback
    return (
        <Text
            display="inline"
            /* Notes
                # The question mark operator ? takes three operands (contd. below):
                # 1) some condition 2) a value if that condition is TRUE 3) and a value if that condition is FALSE
                # It is used in JavaScript to shorten an if else statement to one line of code.
            */
            textTransform={query.data ? "none" : "lowercase"}
            {...otherProps}
        >
            {query.data || truncateMiddle(address || "", 7, 4, ". . .")}
        </Text>
    );
};

export default Username;