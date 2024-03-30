import * as anchor from "@coral-xyz/anchor";
import { BN, Program } from "@coral-xyz/anchor";
import { AnchorNumber } from "../target/types/anchor_number";
import { expect } from "chai";

describe("anchor-number", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.AnchorNumber as Program<AnchorNumber>;

  it("Is initialized!", async () => {
    const counterAcc = anchor.web3.Keypair.generate();

    await program.methods.init().accounts({ counterAcc: counterAcc.publicKey }).signers([counterAcc]).rpc();
    const account = await program.account.counter.fetch(counterAcc.publicKey);
    expect(account.count.toNumber()).to.eq(0)
  });

  it("Counts up", async () => {
    const counterAcc = anchor.web3.Keypair.generate();

    await program.methods.init().accounts({ counterAcc: counterAcc.publicKey }).signers([counterAcc]).rpc();
    await program.methods.inc().accounts({ counterAcc: counterAcc.publicKey }).rpc()
    const account = await program.account.counter.fetch(counterAcc.publicKey);
    expect(account.count.toNumber()).to.eq(1)
  })

  it("Counts up", async () => {
    const counterAcc = anchor.web3.Keypair.generate();

    await program.methods.init().accounts({ counterAcc: counterAcc.publicKey }).signers([counterAcc]).rpc();
    await program.methods.inc().accounts({ counterAcc: counterAcc.publicKey }).rpc()
    await program.methods.dec().accounts({ counterAcc: counterAcc.publicKey }).rpc()
    const account = await program.account.counter.fetch(counterAcc.publicKey);
    expect(account.count.toNumber()).to.eq(0)
  })

  it("Set data", async () => {
    const counterAcc = anchor.web3.Keypair.generate();
    const num = new BN(10);

    await program.methods.init().accounts({ counterAcc: counterAcc.publicKey }).signers([counterAcc]).rpc();
    await program.methods.set(num).accounts({ counterAcc: counterAcc.publicKey }).rpc()
    const account = await program.account.counter.fetch(counterAcc.publicKey);
    expect(account.count.toNumber()).to.eq(num.toNumber())
  })

  it("Close account", async () => {
    const counterAcc = anchor.web3.Keypair.generate();
    const num = new BN(10);

    await program.methods.init().accounts({ counterAcc: counterAcc.publicKey }).signers([counterAcc]).rpc();
    await program.methods.close().accounts({ dataAccount: counterAcc.publicKey }).rpc()
    const account = await program.account.counter.fetch(counterAcc.publicKey);
    expect(account.count.toNumber()).to.eq(num.toNumber())
  })
});
