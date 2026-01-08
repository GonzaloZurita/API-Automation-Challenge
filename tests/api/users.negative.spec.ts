import { test, expect } from '@playwright/test';
import { getRandomInt } from '../../src/utils/random';
import { IncompleteRegisterPayload } from '../../src/api/payloads/register.payload';

// ============================================
// API - NEGATIVE REGISTER USER TESTS
// ============================================
test.describe('Negative Register User API - Register User Error', () => {
  test('Return status code 400 error when registering with email only', async ({ request }) => {

    const requestBody = IncompleteRegisterPayload;

    const response = await request.post('register', {data: requestBody});

    // ============================================
    // NEGATIVE REGISTER USER
    // ============================================
    // STATUS CODE
    // ============================================
    await test.step('Verify POST returns status code 400', async () => {
      expect(response.status(),'Expected status code 400 when registering user without password').toBe(400);
    });

    // ============================================
    // NEGATIVE REGISTER USER
    // ============================================
    // RESPONSE SCHEMA
    // ============================================
    const responseBody = await response.json();

    await test.step('Verify error response has "error" property as string', async () => {
      expect(responseBody).toHaveProperty('error');
      expect(typeof responseBody.error).toBe('string');
    });

  });

});


// ============================================
// API - NEGATIVE GET USER TESTS
// ============================================
test.describe('Negative Get User by ID - Get User by ID Error',()=>{
    test('Return status code 404 with non-existing user ID',async ({request})=>{
        const randomint= getRandomInt(15,50)
        const response = await request.get(`users/${randomint}`);

    // ============================================
    // API - NEGATIVE GET USER
    // ============================================
    // STATUS CODE
    // ============================================
    await test.step('Verify Get by id returns status code 404 for non-existing user id',async()=>{
        expect(response.status(),'Expect status code 404 status code when trying to get non-existing user by user id').toBe(404);
        })
    })
});