// Import Chai assertion library
const chai = require('chai');

// Use Chai's expect function
const expect = chai.expect;

// Your function or module to be tested
function addNumbers(a, b) {
  return a + b;
}

// Describe your test suite
describe('addNumbers function', () => {
  // Write a test case
  it('should add two numbers correctly', () => {
    // Call your function and use Chai's expect to make assertions
    const result = addNumbers(2, 3);
    expect(result).to.equal(5); // Check if the result is equal to 5
  });
});
