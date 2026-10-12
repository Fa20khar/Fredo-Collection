import { storeConfig } from '../data/config';
import { formatPKR } from './currency';

export interface WhatsAppOrderDetails {
  customerName: string;
  customerPhone: string;
  city: string;
  address: string;
  notes?: string;
  items: Array<{
    name: string;
    size: string;
    color?: string;
    quantity: number;
    unitPrice: number;
  }>;
  subtotal: number;
  deliveryFee: number;
  total: number;
}

/**
 * Generate official WhatsApp click-to-chat URL for an order
 * Destination: https://wa.me/923051367640?text=...
 */
export function generateWhatsAppOrderUrl(details: WhatsAppOrderDetails): string {
  const lines: string[] = [];

  lines.push(`🌟 *NEW ORDER REQUEST — FREDO'S COLLECTION* 🌟`);
  lines.push(`----------------------------------------`);
  lines.push(`👤 *Customer Information:*`);
  lines.push(`• Name: ${details.customerName}`);
  lines.push(`• Contact Phone: ${details.customerPhone}`);
  lines.push(`• City: ${details.city}`);
  lines.push(`• Delivery Address: ${details.address}`);
  if (details.notes && details.notes.trim()) {
    lines.push(`• Special Instructions: ${details.notes.trim()}`);
  }
  lines.push(``);

  lines.push(`🛍️ *Order Items:*`);
  details.items.forEach((item, index) => {
    const itemSubtotal = item.unitPrice * item.quantity;
    lines.push(`${index + 1}. *${item.name}*`);
    lines.push(`   - Size: ${item.size || 'Standard'}`);
    if (item.color) {
      lines.push(`   - Color: ${item.color}`);
    }
    lines.push(`   - Qty: ${item.quantity} × ${formatPKR(item.unitPrice)} = ${formatPKR(itemSubtotal)}`);
  });
  lines.push(``);

  lines.push(`💳 *Order Financial Summary:*`);
  lines.push(`• Subtotal: ${formatPKR(details.subtotal)}`);
  lines.push(`• Est. Delivery Charges: ${details.deliveryFee === 0 ? 'FREE' : formatPKR(details.deliveryFee)}`);
  lines.push(`• *Total Estimated Amount: ${formatPKR(details.total)}*`);
  lines.push(`----------------------------------------`);
  lines.push(`ℹ️ _Please confirm availability and dispatch timeline for my order. Thank you!_`);

  const rawMessage = lines.join('\n');
  const encoded = encodeURIComponent(rawMessage);
  return `https://wa.me/${storeConfig.whatsappNumber}?text=${encoded}`;
}

/**
 * Generate direct inquiry WhatsApp URL for a specific product
 */
export function generateProductInquiryUrl(productName: string, price: number, selectedSize?: string): string {
  const lines: string[] = [
    `Salam Fredo's Collection! ✨`,
    `I am interested in this product from your collection:`,
    `• Product: *${productName}*`,
    `• Price: ${formatPKR(price)}`,
  ];

  if (selectedSize) {
    lines.push(`• Size: ${selectedSize}`);
  }

  lines.push(``);
  lines.push(`Could you please share availability and more details? Thank you!`);

  const raw = lines.join('\n');
  return `https://wa.me/${storeConfig.whatsappNumber}?text=${encodeURIComponent(raw)}`;
}

/**
 * Generate simple direct customer support WhatsApp URL
 */
export function generateSupportWhatsAppUrl(customMessage?: string): string {
  const msg = customMessage || `Salam Fredo's Collection! I would like to inquire about your clothing collection.`;
  return `https://wa.me/${storeConfig.whatsappNumber}?text=${encodeURIComponent(msg)}`;
}
