/**
 * Format a number into standard Pakistani Rupee currency string
 * e.g., 4500 -> "Rs. 4,500"
 */
export function formatPKR(amount: number): string {
  if (isNaN(amount)) return 'Rs. 0';
  return `Rs. ${amount.toLocaleString('en-PK')}`;
}
