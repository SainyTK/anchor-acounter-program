# Solana Smart Contract Learning - Solana Contract with Anchor

This repository is my learning space for Anchor Solana Program development. Here, I build a simple counter contract using Anchor framework.

## Getting started
1. Install dependencies:
```bash
yarn
```

## Commands
1. Create program key-pair (Check the target/deploy folder. If not exist, the command need to be run first):
```bash
anchor keys sync
```
2. Build contract:
```bash
anchor build
```
3. Test contract:
```bash
anchor test
```
4. Deploy contract (the deployment network can be adjusted in `Anchor.toml`):
```bash
anchor deploy
```
5. To close the deployed program and reclaim back SOL, run the following command:
```bash
solana program close <PROGRAM_ID> --url devnet --bypass-warning
```