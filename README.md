# Ticketing dApp
This is an application for creating events, buy and sell tickets on the Ethereum blockchain. This prototype was developed as part of the "Blockchain" Seminar at the University of Zurich.



This project was bootstrapped with [Truffle]([https://github.com/facebook/create-react-app](https://github.com/trufflesuite/truffle/)).

```bash
npm install -g truffle
truffle unbox react
```

## Contribution Workflow

0. (Optional) Create a new issue and add it to the _To Do_ column of _Ticketing dApp_ project
1. Assign yourself an issue from the _To Do_ column of the _Ticketing dApp_ project and move it to the _In Progress_ column
2. Pull the latest changes from `origin/master`
3. Create a new local branch beginning with the issue number (e.g., `4-feature`).
4. Commit to this branch mentioning the issue number in the commit message (e.g. `add functionality xyz (#4)`
5. Finish your implementation on the branch
6. Pull and merge the latest changes from `origin/master` into your local branch
7. Verify that your changes still work as expected
8. Merge your branch into `master` and push the changes
9. Close the issue and move it to the _Done_ column of the _Ticketing dApp_ project

## Prerequisites

- [Git](https://git-scm.com/) command line interface
- [Node.js](https://nodejs.org/) command line interface
- [Metamask Extension](https://metamask.io/) for your browser (including wallet)
- [Ganache-CLI](https://github.com/trufflesuite/ganache-cli) to spin up a blockchain with instant mining

> We **don't** use [Ganache](https://truffleframework.com/ganache) at the moment, as it fails somehow. Everything works though with Ganache-CLI. If at some point we switch back, the README should be updated.

## Setup

_onetime setup_

### Clone the Project

```bash
git clone https://github.com/simibac/ticketing-dapp.git

# or

git clone git@github.com:simibac/ticketing-dapp.git
```

### Set up Client

```bash
cd ticketing-dapp/client/
npm install
```
_Detailed information can be found here: [README](./client/README.md)._

### Install Truffle

```bash
npm install -g truffle

# or

sudo npm install -g truffle
```

### Install Ganache-CLI
Install with `@beta` to get the latest updates which fixes a bug that caused wrong gas estimations ([more details](https://github.com/trufflesuite/ganache-cli/releases/tag/v6.4.2-beta.0)).

```bash
npm install -g ganache-cli@beta

# or

sudo npm install -g ganache-cli@beta
```

### Setup Metamask

1. Start a local blockchain with `ganache-cli` in a terminal - which will most likely be running on: `http://127.0.0.1:8545`).
2. Open `Metamask` in your browser and login with your wallet.
3. Click on the network dropdown and select _Custom RPC_.
4. Scroll down and enter the copied `RPC Server` of `ganache-cli` into the _New RPC URL_ field.
5. Hit _Save_.
6. Switch to your `ganache-cli` an copy one of the private keys.
7. Back in `Metamask`, click on the _colored circle_ on the top right and select _Import Account_.
8. Paste the private key from `ganache-cli` and hit _Import_. You should now be logged in with an Account from the `ganache-cli` network with a balance of _100 ETH_.

## Run Environment

_everytime to run the environment_

1. Pull the latest commits:
   ```bash
   # Terminal Tab #1
   cd /path/to/ticketing-dapp
   git pull
   ```
2. Start local blockchain with `ganache-cli`.
3. Compile the `Smart Contracts`:
   ```bash
   # Terminal Tab #1
   truffle compile
   ```
4. Deploy the `Smart Contracts` on the `Ganache` network:
   ```bash
   # Terminal Tab #1
   truffle migrate --reset
   ```
4. Start the `Truffle` console:
   ```bash
   # Terminal Tab #1
   truffle console
   ```
5. Start the `React` client:
   ```bash
   # Terminal Tab #2
   cd /path/to/ticketing-dapp/client
   npm install
   npm start
   ```
6. `localhost:3000` should be opened automatically in your browser

:warning: Make sure your Metamask is connected to the correct network! :warning:
