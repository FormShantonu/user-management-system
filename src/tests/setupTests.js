// src/tests/setupTests.js

// Example: If you want to globally mock a module for all tests
jest.mock('module-name', () => ({
    mockFunction: jest.fn(),
  }));
  
  // Or setup global variables
  global.someVariable = 'test value';
  