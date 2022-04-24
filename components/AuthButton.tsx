import * as React from "react";

import {
    Button,
    ButtonProps
} from "@chakra-ui/react";

import {
    useAccount,
    useConnect
} from "wagmi";

import toast from "react-hot-toast";

interface AuthButtonProps extends ButtonProps {}

const AuthButton: React.FunctionComponent<AuthButtonProps> = (props) => {
    // We use the wagmi 'useConnect' hook and call 'connect' ⬇
    // Passing the MetaMask connector (InjectedConnector) to prompt the user sign in with MM 🦊
    const [connectQuery, connect] = useConnect();

    // Here, we call the 'useAccount' hook provided by wagmi too see if there's a signed-in wallet
    const [accountQuery] = useAccount();

    React.useEffect(() => {
        if (connectQuery.error?.name === "ConnectorNotFoundError") {
            toast.error("MetaMask 🦊 extension required to sign in");
        }
    }, [connectQuery.error]);

    // If not authenticated, require sign-in
    if (!accountQuery.data?.address) {
        return (
            <Button
                {...props}
                onClick={() => {
                    connect(connectQuery.data.connectors[0]);
                }}
            >
                Sign In
            </Button>
        );
    }

    // If authenticated, show button as usual
    return <Button {...props}>{props.children}</Button>
};

export default AuthButton;