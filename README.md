# ERC4337 Template

This repo acts as a starting template with various ERC 4337 examples. The repo includes scripts for creating accounts, making transfers, sponsoring gas fees and using the dashboard of Zerodev (you can also use stackup or alchemy instead). The repo is primarily used for account abstraction and developers can improve upon the scripts provided to create more complex protocols such as having embedded social accounts, creating exchanges with gas sponsorships, creating a unique whitelist contract and more!

## Setup and Installation

1. **Clone the repository**

   Use the following command to clone this repository to your local machine:

   ```bash
   git clone git@github.com:demisIntellect/ERC4337
   ```

2. **Install dependencies**

   Navigate to the project directory and install the dependencies:

   ```bash
   cd ERC4337
   npm install
   ```

3. **Setup environment variables**

   Copy the `.env.example` file to `.env` and fill in the required values (most examples only require a few of these env vars). Some of these variables such as the Project ID can be taken from the zerodev dashboard so I would suggest you start with that first: http://dashboard.zerodev.app

   ```bash
    cp .env.example .env
    ```

4. **Run the script**

   Run any of the example scripts using the following command:

   ```bash
   npx ts-node path/to/script.ts
   ```


## Usecases

1. **Third party gas payments**
Make sure to set the correct ERC20 and check the estimate-gas.ts private keys and chains selected
2. **Account Creation**
You can use any provider you want here whether it is stackup or alchemy or zerodev, it should work with either one. Make sure to adjust the chain and number of accounts you need + fund them afterwards.
3. **Transaction monitoring and sending**
Transaction monitoring can be done through the dashboard https://dashboard.zerodev.app (alchemy and stackup can also be used) and there is a script for sending tranasctions both in the full tutorial folder and the send-transactions folder.
4. **Multi Signature Authentication**

5. **Transaction batching**


## Adittional functionality 

**Embedded Accounts**
1. **Create wallets using the create account functionality of the contract**

2. **Create ENS names if needed **

3. **Fund wallets and accounts as needed **
4. **Set up a Wallet connect script for embedded accounts or follow the second tutorial listed below by dynamic**
https://docs.dynamic.xyz/sign-in-sign-up/overview
https://portal.thirdweb.com/connect/embedded-wallet/overview

**Fast Deployment/Shortcut for non developers**
Follow the instructions in the link below to deploy your own ERC4337 contract without any code and customise it to suit your needs (includes embedded account and gas fee sponsorship)
https://thirdweb.com/thirdweb.eth/AccountFactory


