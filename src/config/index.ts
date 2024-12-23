export const TOKEN_ADDRESS = process.env.NEXT_PUBLIC_TOKEN_ADDRESS || '';

if (!process.env.NEXT_PUBLIC_TOKEN_ADDRESS) {
  console.warn('TOKEN_ADDRESS not configured in environment variables');
}

export const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_TOKEN_ADDRESS || '';

if (!process.env.NEXT_PUBLIC_TOKEN_ADDRESS) {
  console.warn('CONTRACT_ADDRESS not configured in environment variables');
}

console.log('Config loaded:', { TOKEN_ADDRESS, CONTRACT_ADDRESS });