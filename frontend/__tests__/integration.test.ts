import { spawn, ChildProcess } from 'child_process';
import { promisify } from 'util';

const sleep = promisify(setTimeout);

/**
 * Integration Test for Backend API
 * This test starts the backend server and makes real HTTP requests to test the API endpoints
 */
describe('Backend Integration Tests', () => {
  let serverProcess: ChildProcess;
  const baseUrl = 'http://localhost:3001';

  beforeAll(async () => {
    // Start the backend server
    serverProcess = spawn('npm', ['run', 'start:dev'], {
      cwd: process.cwd() + '/../backend',
      stdio: 'pipe'
    });

    // Wait for server to start
    await sleep(5000);
  }, 30000);

  afterAll(async () => {
    if (serverProcess) {
      serverProcess.kill();
    }
  });

  it('should respond to health check', async () => {
    const response = await fetch(`${baseUrl}/`);
    const text = await response.text();
    
    expect(response.status).toBe(200);
    expect(text).toBe('Hello World!');
  });

  it('should handle test CRUD operations', async () => {
    const testId = 'integration-test-' + Date.now();

    // Create test
    const createResponse = await fetch(`${baseUrl}/test`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: testId }),
    });
    
    expect(createResponse.status).toBe(201);
    const createdTest = await createResponse.json();
    expect(createdTest.id).toBe(testId);

    // Get all tests
    const getAllResponse = await fetch(`${baseUrl}/test`);
    expect(getAllResponse.status).toBe(200);
    const allTests = await getAllResponse.json();
    expect(Array.isArray(allTests)).toBe(true);
    expect(allTests.some(test => test.id === testId)).toBe(true);

    // Get specific test
    const getResponse = await fetch(`${baseUrl}/test/${testId}`);
    expect(getResponse.status).toBe(200);
    const retrievedTest = await getResponse.json();
    expect(retrievedTest.id).toBe(testId);

    // Delete test
    const deleteResponse = await fetch(`${baseUrl}/test/${testId}`, {
      method: 'DELETE',
    });
    expect(deleteResponse.status).toBe(200);
    const deletedTest = await deleteResponse.json();
    expect(deletedTest.id).toBe(testId);

    // Verify deletion
    const getDeletedResponse = await fetch(`${baseUrl}/test/${testId}`);
    expect(getDeletedResponse.status).toBe(404);
  });
});