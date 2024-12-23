import { Connection, Keypair, PublicKey, Transaction, sendAndConfirmTransaction } from '@solana/web3.js';
import { 
  TOKEN_PROGRAM_ID,
  createBurnInstruction,
  getAssociatedTokenAddress
} from '@solana/spl-token';
import bs58 from 'bs58';

export class SolanaBurnToken {
  private connection: Connection;
  private payer: Keypair;
  private tokenMint: PublicKey;

  constructor() {
    this.connection = new Connection(
      process.env.SOLANA_RPC_URL || 'https://api.mainnet-beta.solana.com',
      'confirmed'
    );

    if (!process.env.SOLANA_PRIVATE_KEY) {
      throw new Error('SOLANA_PRIVATE_KEY environment variable is not set');
    }

    const privateKeyBytes = bs58.decode(process.env.SOLANA_PRIVATE_KEY);
    this.payer = Keypair.fromSecretKey(privateKeyBytes);

    if (!process.env.NEXT_PUBLIC_TOKEN_ADDRESS) {
      throw new Error('NEXT_PUBLIC_TOKEN_ADDRESS environment variable is not set');
    }
    this.tokenMint = new PublicKey(process.env.NEXT_PUBLIC_TOKEN_ADDRESS);
  }

  async burnTokens(amount: number): Promise<string> {
    try {
      const associatedTokenAccount = await getAssociatedTokenAddress(
        this.tokenMint,
        this.payer.publicKey
      );

      const burnInstruction = createBurnInstruction(
        associatedTokenAccount,
        this.tokenMint,
        this.payer.publicKey,
        amount
      );

      const transaction = new Transaction().add(burnInstruction);
      const signature = await sendAndConfirmTransaction(
        this.connection,
        transaction,
        [this.payer]
      );

      return signature;
    } catch (error: unknown) {
      console.error('Error burning tokens:', error);
      if (error instanceof Error) {
        throw new Error(`Failed to burn tokens: ${error.message}`);
      }
      throw new Error('Failed to burn tokens: Unknown error');
    }
  }

  async getTokenBalance(): Promise<number> {
    try {
      const associatedTokenAccount = await getAssociatedTokenAddress(
        this.tokenMint,
        this.payer.publicKey
      );

      const balance = await this.connection.getTokenAccountBalance(
        associatedTokenAccount
      );

      return balance.value.uiAmount || 0;
    } catch (error: unknown) {
      console.error('Error getting token balance:', error);
      if (error instanceof Error) {
        throw new Error(`Failed to get token balance: ${error.message}`);
      }
      throw new Error('Failed to get token balance: Unknown error');
    }
  }
} 