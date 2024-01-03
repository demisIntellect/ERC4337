import "dotenv/config"
import {
  createKernelAccount,
  createKernelPaymasterClient,
} from "@kerneljs/core"
import { signerToEcdsaValidator } from "@kerneljs/ecdsa-validator"
import { UserOperation, createSmartAccountClient } from "permissionless"
import { http, Hex, createPublicClient, zeroAddress } from "viem"
import { privateKeyToAccount } from "viem/accounts"
import { polygonMumbai } from "viem/chains"

if (!process.env.BUNDLER_RPC || !process.env.PAYMASTER_RPC || !process.env.PRIVATE_KEY) {
  throw new Error("BUNDLER_RPC or PAYMASTER_RPC or PRIVATE_KEY is not set")
}

const publicClient = createPublicClient({
  transport: http(process.env.BUNDLER_RPC),
})

const signer = privateKeyToAccount(process.env.PRIVATE_KEY as Hex)

const main = async () => {
  const ecdsaValidator = await signerToEcdsaValidator(publicClient, {
    signer,
  })

  const account = await createKernelAccount(publicClient, {
    plugin: ecdsaValidator,
  })

  const kernelClient = createSmartAccountClient({
    account,
    chain: polygonMumbai,
    transport: http(process.env.BUNDLER_RPC),
    sponsorUserOperation: async ({ userOperation }): Promise<UserOperation> => {
      const kernelPaymaster = createKernelPaymasterClient({
        chain: polygonMumbai,
        transport: http(process.env.PAYMASTER_RPC),
      })
      return kernelPaymaster.sponsorUserOperation({
        userOperation,
      })
    },
  })

  console.log("My account:", kernelClient.account.address)

  const txnHash = await kernelClient.sendTransaction({
    to: zeroAddress,
    value: BigInt(0),
    data: "0x",
  })

  console.log("txn hash:", txnHash)

  const userOpHash = await kernelClient.sendUserOperation({
    userOperation: {
      callData: await account.encodeCallData({
        to: zeroAddress,
        value: BigInt(0),
        data: "0x",
      }),
    },
  })

  console.log("userOp hash:", userOpHash)
}

main()