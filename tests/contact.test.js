// Unit tests for contact form email validation
export function testEmailRegex() {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  console.assert(emailRegex.test('kissa@morrowcafe.com'), 'Valid email passes');
  console.assert(!emailRegex.test('invalid-email'), 'Invalid email fails');
}
testEmailRegex();
