import { 
  Connection, 
  PublicKey, 
  Transaction, 
  sendAndConfirmTransaction,
  Signer
} from '@solana/web3.js';

import { 
  createBurnInstruction,
  TOKEN_PROGRAM_ID, 
  ASSOCIATED_TOKEN_PROGRAM_ID,
  getAssociatedTokenAddress
} from '@solana/spl-token';

interface BurnResult {
  success: boolean;
  signature?: string;
  error?: string;
}

export async function burnTokens(
  connection: Connection,
  payer: Signer,
  mint: PublicKey,
  amount: number,
): Promise<BurnResult> {
  try {
    const associatedTokenAddress = await getAssociatedTokenAddress(
      mint,
      payer.publicKey,
      false,
      TOKEN_PROGRAM_ID,
      ASSOCIATED_TOKEN_PROGRAM_ID
    );

    const burnInstruction = createBurnInstruction(
      associatedTokenAddress,
      mint,
      payer.publicKey,
      amount,
      []
    );

    const transaction = new Transaction().add(burnInstruction);
    
    const options = {
      commitment: 'confirmed' as const,
      preflightCommitment: 'confirmed' as const,
    };

    const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
    transaction.recentBlockhash = blockhash;
    transaction.feePayer = payer.publicKey;

    const signature = await sendAndConfirmTransaction(
      connection,
      transaction,
      [payer],
      options
    );

    const confirmation = await connection.confirmTransaction({
      blockhash,
      lastValidBlockHeight,
      signature,
    });

    if (confirmation.value.err) {
      throw new Error(`Transaction failed: ${confirmation.value.err.toString()}`);
    }

    return {
      success: true,
      signature,
    };

  } catch (error) {
    console.error('Burn error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

export async function checkTokenBalance(
  connection: Connection,
  owner: PublicKey,
  mint: PublicKey
): Promise<number> {
  try {
    const associatedTokenAddress = await getAssociatedTokenAddress(
      mint,
      owner,
      false,
      TOKEN_PROGRAM_ID,
      ASSOCIATED_TOKEN_PROGRAM_ID
    );

    const balance = await connection.getTokenAccountBalance(associatedTokenAddress);
    return Number(balance.value.amount);
  } catch (error) {
    console.error('Balance check error:', error);
    throw error;
  }
}