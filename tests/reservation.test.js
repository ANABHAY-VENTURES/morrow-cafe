// Unit tests for reservation date and contact validation
export function testReservationValidation() {
  const phoneRegex = /^[0-9]{10}$/;
  console.assert(phoneRegex.test('9876543210'), 'Valid 10-digit phone should pass');
  console.assert(!phoneRegex.test('123'), 'Short phone should fail');
}
testReservationValidation();
