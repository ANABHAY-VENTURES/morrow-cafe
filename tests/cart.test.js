// Unit tests for cart calculations
export function testCartTotals() {
  const items = [{ price: 320, quantity: 2 }, { price: 280, quantity: 1 }];
  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + tax;
  console.assert(subtotal === 920, 'Subtotal should be 920');
  console.assert(tax === 46, 'Tax should be 46');
  console.assert(total === 966, 'Total should be 966');
}
testCartTotals();
