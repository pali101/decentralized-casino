export function getExplorerLink(chainId: number, address: string) {
    switch (chainId) {
        case 1:
            return {link:`https://etherscan.io/address/${address}`, website :"etherscan mainnet"};
        case 4:
            return {link:`https://rinkeby.etherscan.io/address/${address}`, website :"etherscan rinkeby"};
        case 5:
            return  {link:`https://goerli.etherscan.io/address/${address}`, website :"etherscan goerli"};
        case 42:
            return {link:`https://kovan.etherscan.io/address/${address}`, website :"etherscan kovan"};
        case 137:
            return {link:`https://polygonscan.com/address/${address}`, website :"polygonscan mainnet"};
        case 80001:
            return {link:`https://mumbai.polygonscan.com/address/${address}`, website :"polygonscan mumbai"};
        case 42161:
            return {link:`https://arbiscan.io/address/${address}`, website :"arbiscan mainnet"};
        case 43114:
            return {link:`https://snowtrace.io/address/${address}`, website :"snowtrace mainnet"};
            case 10: // Assuming chainId 10 is for Optimism
            return {link:`https://optimistic.etherscan.io//address/${address}`, website :"optimism mainnet"};
        default:
            return {link:`https://etherscan.io/address/${address}`, website :"etherscan mainnet"};
    }
}