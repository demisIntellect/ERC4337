import "dotenv/config"
import { zeroAddress } from "viem"
import { getKernelClient } from "../utils"

async function main() {
  const kernelClient = await getKernelClient()

  console.log("Account address:", kernelClient.account.address)

  const userOpHash = await kernelClient.sendUserOperation({
    userOperation: {
      callData: await kernelClient.account.encodeCallData({
        to: zeroAddress,
        value: BigInt(0),
        data: "0x",
      }),
    },
  })

  console.log("UserOp hash:", userOpHash)
}

main()