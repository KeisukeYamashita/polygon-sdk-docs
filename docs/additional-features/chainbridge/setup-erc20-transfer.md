---
id: setup-erc20-transfer
title: ERC20 Token Transfer
---

So far, we've set up bridge to exchange assets/data between Polygon PoS and Polygon SDK chain. This section will guide you to set up an ERC20 bridge and send tokens between different blockchains.

## Step 1: Register resource ID

Firstly, you will register a resource ID that associates resources in a cross-chain environment. A Resource ID is a 32-byte value that must be unique to the resource that we are transferring between these blockchains. The Resource IDs are arbitrary, but they may have the chain ID of the home chain in the last byte, as a convention (home chain referring to the network on which these resources originated from).

To register resource ID, you can use the `cb-sol-cli bridge register-resource` command. You will need to give the private key of the `admin` account.

```bash
# For Polygon PoS chain
$ cb-sol-cli bridge register-resource \
  --url https://rpc-mumbai.matic.today \
  --privateKey [ADMIN_ACCOUNT_PRIVATE_KEY] \
  # Set Resource ID for ERC20
  --resourceId "0x000000000000000000000000000000c76ebe4a02bbc34786d860b355f5a5ce00" \
  --bridge "[BRIDGE_CONTRACT_ADDRESS]" \
  --handler "[ERC20_HANDLER_CONTRACT_ADDRESS]" \
  --targetContract "[ERC20_CONTRACT_ADDRESS]"

# For Polygon SDK chain
$ cb-sol-cli bridge register-resource \
  --url http://localhost:10002 \
  --privateKey [ADMIN_ACCOUNT_PRIVATE_KEY] \
  # Set Resource ID for ERC20
  --resourceId "0x000000000000000000000000000000c76ebe4a02bbc34786d860b355f5a5ce00" \
  --bridge "[BRIDGE_CONTRACT_ADDRESS]" \
  --handler "[ERC20_HANDLER_CONTRACT_ADDRESS]" \
  --targetContract "[ERC20_CONTRACT_ADDRESS]"
```

## (Optional) Make contracts mintable/burnable

When transferring ERC20 tokens between chains, tokens can be processed in two different modes:

(1) Lock/Release mode

**Source chain**: The tokens you are sending will be locked in the ERC20 Handler Contract  
**Destination chain**: The same amount of tokens as you sent in the source chain would be unlocked and transferred from the ERC20 Handler contract to the recipient account in the destination chain.

(2) Burn/Mint mode

**Source chain**: The tokens you are sending will be burned  
**Destination chain**: The same amount of tokens as you sent and burned on the source chain will be minted on the destination chain and sent to the recipient account.

You can use different modes in each chain. It means that you can lock an ERC20 token in the main chain while minting an ERC20 token in the subchain for transfer. For instance, it may make sense to lock/release tokens if the total supply or mint schedule is controlled. Tokens would be minted/burned if the contract in the sub chain has to follow the supply in the main chain.

The default mode is **lock/release** mode. If you want to make the Tokens mintable/burnable, you need to call `adminSetBurnable` method. If you want to mint tokens on execution, you will need to grant `minter` role to the ERC20 Handler contract.

```bash
# Let ERC20 contract burn on source chain and mint on destination chain
$ cb-sol-cli bridge set-burn \
  --url http://localhost:10002 \
  --privateKey [ADMIN_ACCOUNT_PRIVATE_KEY] \
  --bridge "[BRIDGE_CONTRACT_ADDRESS]" \
  --handler "[ERC20_HANDLER_CONTRACT_ADDRESS]" \
  --tokenContract "[ERC20_CONTRACT_ADDRESS]"

# Grant minter role to ERC20 Handler contract
$ cb-sol-cli erc20 add-minter \
  --url http://localhost:10002 \
  --privateKey [ADMIN_ACCOUNT_PRIVATE_KEY] \
  --erc20Address "[ERC20_CONTRACT_ADDRESS]" \
  --minter "[ERC20_HANDLER_CONTRACT_ADDRESS]"
```

## Step 2: Transfer ERC20 Token

We will send ERC20 Tokens from the Polygon PoS chain to the Polygon SDK chain.

First, you will get tokens by minting. An account with the `minter` role can mint new tokens. The account that has deployed the ERC20 contract has the `minter` role by default. To specify other accounts as members of the `minter` role, you need to run the `cb-sol-cli erc20 add-minter` command.

```bash
# Mint ERC20 tokens
$ cb-sol-cli erc20 mint \
  --url https://rpc-mumbai.matic.today \
  --privateKey [MINTER_ACCOUNT_PRIVATE_KEY] \
  --erc20Address "[ERC20_CONTRACT_ADDRESS]" \
  --amount 1000
```

To check the current balance, you can use `cb-sol-cli erc20 balance` command.

```bash
# Check ERC20 token balance
$ cb-sol-cli erc20 balance \
  --url https://rpc-mumbai.matic.today \
  --privateKey [PRIVATE_KEY] \
  --erc20Address "[ERC20_CONTRACT_ADDRESS]" \
  --address "[ACCOUNT_ADDRESS]"

[erc20/balance] Account <ACCOUNT_ADDRESS> has a balance of 1000.0
```

Next, you need to approve ERC20 token transfer from the account by ERC20 Handler

```bash
# Approve transfer from the account by ERC20 Handler
$ cb-sol-cli erc20 approve \
  --url https://rpc-mumbai.matic.today \
  --privateKey [USER_ACCOUNT_ADDRESS] \
  --erc20Address "[ERC20_CONTRACT_ADDRESS]" \
  --recipient "[ERC20_HANDLER_CONTRACT_ADDRESS]" \
  --amount 500
```

To transfer tokens to Polygon SDK chains, you will call `deposit`.

```bash
# Start transfer from Polygon PoS to Polygon SDK chain
$ cb-sol-cli erc20 deposit \
  --url https://rpc-mumbai.matic.today \
  --privateKey [PRIVATE_KEY] \
  --amount 10 \
  # ChainID of Polygon SDK chain
  --dest 100 \
  --bridge "[BRIDGE_CONTRACT_ADDRESS]" \
  --recipient "[RECIPIENT_ADDRESS_IN_POLYGON_SDK_CHAIN]" \
  --resourceId "0x000000000000000000000000000000c76ebe4a02bbc34786d860b355f5a5ce00"
```

After the deposit transaction was successful, the relayer will get the event and vote for the proposal. It executes a transaction to send tokens to the recipient account in the Polygon SDK chain after the required number of votes are submitted. 

```bash
INFO[11-19|08:15:58] Handling fungible deposit event          chain=mumbai dest=100 nonce=1
INFO[11-19|08:15:59] Attempting to resolve message            chain=polygon-sdk type=FungibleTransfer src=99 dst=100 nonce=1 rId=000000000000000000000000000000c76ebe4a02bbc34786d860b355f5a5ce00
INFO[11-19|08:15:59] Creating erc20 proposal                  chain=polygon-sdk src=99 nonce=1
INFO[11-19|08:15:59] Watching for finalization event          chain=polygon-sdk src=99 nonce=1
INFO[11-19|08:15:59] Submitted proposal vote                  chain=polygon-sdk tx=0x67a97849951cdf0480e24a95f59adc65ae75da23d00b4ab22e917a2ad2fa940d src=99 depositNonce=1 gasPrice=1
INFO[11-19|08:16:24] Submitted proposal execution             chain=polygon-sdk tx=0x63615a775a55fcb00676a40e3c9025eeefec94d0c32ee14548891b71f8d1aad1 src=99 dst=100 nonce=1 gasPrice=5
```

Once the execution transaction has been successful, you will get tokens in the Polygon SDK chain.

```bash
# Check the ERC20 balance in Polygon SDK chain
$ cb-sol-cli erc20 balance \
  --url https://localhost:10002 \
  --privateKey [PRIVATE_KEY] \
  --erc20Address "[ERC20_CONTRACT_ADDRESS]" \
  --address "[ACCOUNT_ADDRESS]"

[erc20/balance] Account <RECIPIENT_ACCOUNT_ADDRESS> has a balance of 10.0
```
