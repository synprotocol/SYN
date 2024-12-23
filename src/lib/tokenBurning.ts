import { SolanaBurnToken } from './SolanaBurnToken';

interface BurnResult {
  success: boolean;
  signature?: string;
  error?: string;
}

export async function burnTokens(amount: number, reason: string): Promise<BurnResult> {
  // Validate inputs
  if (!amount || amount <= 0) {
    return {
      success: false,
      error: 'Invalid amount specified'
    };
  }

  try {
    // Initialize the burn token handler
    const burnToken = new SolanaBurnToken();
    
    // Check current balance
    const currentBalance = await burnToken.getTokenBalance();
    console.log(`Current balance: ${currentBalance}, Attempting to burn: ${amount}`);
    
    if (currentBalance < amount) {
      return {
        success: false,
        error: `Insufficient balance. Available: ${currentBalance}, Requested: ${amount}`
      };
    }

    // Execute burn transaction
    const signature = await burnToken.burnTokens(amount);
    
    // Log the successful burn
    console.log(`Successfully burned ${amount} tokens. Signature: ${signature}`);
    console.log(`Burn reason: ${reason}`);

    return {
      success: true,
      signature
    };

  } catch (error) {
    // Log the error for debugging
    console.error('Error in burnTokens:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return {
      success: false,
      error: `Burn operation failed: ${errorMessage}`
    };
  }
}

// Helper function to validate environment variables
export function validateBurnEnvironment(): boolean {
  const requiredVars = [
    'SOLANA_PRIVATE_KEY',
    'SOLANA_RPC_URL',
    'NEXT_PUBLIC_TOKEN_ADDRESS'
  ];

  const missingVars = requiredVars.filter(varName => !process.env[varName]);

  if (missingVars.length > 0) {
    console.error('Missing required environment variables:', missingVars);
    return false;
  }

  return true;
} 