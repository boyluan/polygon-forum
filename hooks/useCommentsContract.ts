// This hook will interact with our deployed contract
// It will allows us to interact with our contract functions from the UI ⬇
// And will return us a new contract instance whenever the active signer/provider changes via wagmi/MM 🦊

// 'wagmi' is a wrapper library around another library called 'ethers' (see: <https://docs.ethers.io/v5/>)
// Ethers allows developers to interact with EVM-compatible blockchains (i.e. Ethereum and Polygon)
import * as wagmi from "wagmi";

import {
    useProvider,
    useSigner
} from "wagmi";

import type { BigNumber } from "ethers";

// Import our contract ABI (a json representation of our contract's public interface)
// The hardhat compiler writes this file to artifacts during compilation
// ## Steps for Vercel deployment ⬇⬇
// 1) Create a new folder at the root directory called 'utils'
// 2) Add a .json file to this /utils folder - to hold your smart contract's corresponding abi file
// 3) Copy + Paste contents from the abi file, into the new .json file you've created in the /utils directory
// 4) Import the new .json file under its new /utils directory (contd. below)
// Into each JavaScript/Typescript file that needs to reference my smart contract (see: Line 26)
// See: <https://github.com/vercel/next.js/discussions/34502>
// import CommentsContract from "../artifacts/contracts/Comments.sol/Comments.json"; {{ DEFUNCT }}
import CommentsContract from "../utils/Comments.json";

export interface Comment {
    id: string;
    topic: string;
    message: string;
    creator_address: string;
    created_at: BigNumber;
}

export enum EventType {
    CommentAdded = "CommentAdded",
}

const useCommentsContract = () => {
    // An ethers.Signer instance associated with the signed-in wallet
    // See: <https://docs.ethers.io/v5/api/signer>
    const [signer] = useSigner();

    // An ethers.Provider instance
    // This will be the same provider that is passed as a prop to the WagmiProvider
    const provider = useProvider();

    // This returns a new ethers.Contract ready to interact with our comments API
    // We need to pass in the address of our deployed contract, as well as its abi
    // We also pass in the signer if there is a signed-in wallet ⬇
    // Or if there's no signed-in wallet, then we'll pass in the connected provider
    const contract = wagmi.useContract({
        // addressOrName: "0x5FbDB2315678afecb367f032d93F642f64180aa3", {{ DEFUNCT }}
        addressOrName: "0xfC4A8d3f46E4fcc6922F9B700771868fE93A6e3D",
        contractInterface: CommentsContract.abi,
        signerOrProvider: signer.data || provider,
    });

    // Wrapper to add types to our getComments function
    const getComments = async (topic: string): Promise<Comment[]> => {
        return contract.getComments(topic).then((comments) => {
            // Each comment is represented as an array by default, so we convert to object
            return comments.map((c) => ({ ...c }));
        });
    };

    // Wrapper to add types to our addComment function
    const addComment = async (topic: string, message: string): Promise<void> => {
        // Create a new transaction
        const tx = await contract.addComment(topic, message);
        // Wait for transaction to be mined
        await tx.wait();
    };

    return {
        contract,
        chainId: contract.provider.network?.chainId,
        getComments,
        addComment,
    };
};

export default useCommentsContract;