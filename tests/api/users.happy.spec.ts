import { test, expect, APIRequestContext } from '@playwright/test';

//Importing interfaces
import { RegisterResponse } from '../../src/api/models/register.model';
import { GetUserResponse } from '../../src/api/models/user.model';
import { GetUsersResponse} from '../../src/api/models/users.model';

//Importing methods
import { fetchUsersPage } from '../../src/api/clients/users.client';

//Importing assertions
import { expectValidUserData,expectValidMetaData,expectValidSupportData } from '../../src/api/assertions/user.assertions';
import { expectTotalUsersCount, expectUniqueUserIdsAcrossPages, expectValidPagination, expectValidPaginationLogic, expectValidUsersData, expectEmptyPage } from '../../src/api/assertions/users.assertions';

//Importing payloads
import { CompleteRegisterPayload } from '../../src/api/payloads/register.payload';

//Debugging
//let temp=1
//process.env.NEW_USER_ID = temp.toString()

// ============================================
// API - REGISTER USER TESTS
// ============================================
test.describe('Register User API', () => {
  test('Register user and return valid data', async ({ request }) => {
    const requestBody = CompleteRegisterPayload;
    const response = await request.post('register', {data: requestBody});

    const responseBody = await response.json() as RegisterResponse;

    // ============================================
    // REGISTER USER
    // ============================================
    // STATUS CODE VALIDATION
    // ============================================
    await test.step('Verify register user returns HTTP 200', async () => {
      expect(response.status(),'Expected status code 200 when registering a valid user').toBe(200);
    });

    // ============================================
    // REGISTER USER
    // ============================================
    // SCHEMA & STRUCTURE VALIDATION
    // ============================================
    await test.step('Verify response schema contains id and token', async () => {
      expect(responseBody.id,'Verify "id" is present and is a number').toEqual(expect.any(Number));
      expect(responseBody.token,'Verify "token" is present and is a string').toEqual(expect.any(String));
    });

    // ============================================
    // REGISTER USER
    // ============================================
    // DATA INTEGRITY VALIDATION
    // ============================================
    await test.step('Verify id is a positive integer', async () => {
      expect(responseBody.id,'Verify user id is greater than zero').toBeGreaterThan(0);
      expect(Number.isInteger(responseBody.id),'Verify user id is an integer').toBe(true);
    });

    await test.step('Verify token is generated and not empty', async () => {
      expect(responseBody.token.length,'Verify token is generated and not empty').toBeGreaterThan(0);
    });

    // ============================================
    // REGISTER USER
    // ============================================
    // DATA STORAGE FOR NEXT TESTS
    // ============================================
    // Saving this information to double check information when doing the get user by ID. Won't focus on this since reqres.in is
    // a mock api, and data is not really changing when registering a user
    await test.step('Store registered user data for future tests', async () => {
      process.env.NEW_USER_EMAIL = requestBody.email;
      process.env.NEW_USER_PASSWORD = requestBody.password;
      process.env.NEW_USER_FIRST_NAME = requestBody.first_name;

      process.env.NEW_USER_ID = responseBody.id.toString();
      process.env.NEW_USER_TOKEN = responseBody.token;

      expect(process.env.NEW_USER_TOKEN,'Verify token was successfully stored').toBeDefined();
    });
  });
})

// ============================================
// API - GET USER BY ID TESTS
// ============================================
test.describe('Get User by ID API', () => {
  test('Return user details when using a valid user ID', async ({ request }) => {
    //Checking that env variable is existing
    let userId = process.env.NEW_USER_ID;
    
    if (!userId) {
        //Necessary if when running this test isolated
        let temp=1
        process.env.NEW_USER_ID = temp.toString()
        userId = process.env.NEW_USER_ID
    }
    
    const response = await request.get(`users/${userId}`);

    const responseBody = await response.json() as GetUserResponse;

    // ============================================
    // GET USER BY ID
    // ============================================
    // STATUS CODE VALIDATION
    // ============================================
    await test.step('Verify query user by ID returns HTTP 200', async () => {
      expect(response.status(),'Expected status code 200 when querying an existing user').toBe(200);
    });

    // ============================================
    // GET USER BY ID
    // ============================================
    // RESPONSE ROOT STRUCTURE
    // ============================================
    await test.step('Verify response contains data, support and _meta objects', async () => {
      expect(responseBody,'Verify response root object structure').toHaveProperty('data');
      expect(responseBody).toHaveProperty('support');
      expect(responseBody).toHaveProperty('_meta');
    });

    // ============================================
    // GET USER BY ID
    // ============================================
    // DATA OBJECT VALIDATION
    // ============================================
    await test.step('Verify user data object contains fields with correct types', async () => {
        expectValidUserData(responseBody.data)
    });

    // ============================================
    // GET USER BY ID
    // ============================================
    // SUPPORT OBJECT VALIDATION
    // ============================================
    await test.step('Verify support object structure', async () => {
      expectValidSupportData(responseBody.support)
    });

    // ============================================
    // GET USER BY ID
    // ============================================
    // META OBJECT VALIDATION
    // ============================================
    await test.step('Verify _meta object structure and content', async () => {
      expectValidMetaData(responseBody._meta)
    });

    // ============================================
    // GET USER BY ID
    // ============================================
    // DATA CONSISTENCY (DOCUMENTED BUT SKIPPED)
    // ============================================
    await test.step('Data consistency check (skipped due to mock API limitations)', async () => {
      /**
       *Skipping this on purpose
       *reqres.in is a mock API and does not guarantee real data consistency 
       *between create and query, please head to README.md Limitations section
       *expect(responseBody.data.first_name).toBe(process.env.NEW_USER_FIRST_NAME);
       */
      expect(true).toBe(true);
    });
  });
});

// ============================================
// API - GET USERS TESTS
// ============================================
test.describe('Get Users API', () => {
  test('Return paginated users with correct structure and data integrity', async ({ request }) => {

    // Should be default page (page 1)
    const response = await request.get('users');
    const responseBody = await response.json() as GetUsersResponse;

    // ============================================
    // GET USERS
    // ============================================
    // STATUS CODE
    // ============================================
    await test.step('Verify get users returns status code 200', async () => {
      expect(response.status(),'Expected status code 200 when fetching users').toBe(200);
    });

    // ============================================
    // GET USERS
    // ============================================
    // SCHEMA VALIDATION
    // ============================================
    await test.step('Verify response structure', async () => {
        expectValidPagination(responseBody);
    });

    // ============================================
    // GET USERS
    // ============================================
    // USER OBJECT STRUCTURE
    // ============================================
    await test.step('Verify each user object has mandatory fields', async () => {
        expectValidUsersData(responseBody.data);
    });

    // ============================================
    // GET USERS
    // ============================================
    // PAGINATION LOGIC
    // ============================================
    await test.step('Verify pagination logic', async () => {
        expectValidPaginationLogic(responseBody);
    });

    // ============================================
    // GET USERS
    // ============================================
    // TOTAL USERS COUNT ACROSS PAGES
    // ============================================
    await test.step('Verify total users count across all pages', async () => {
      await expectTotalUsersCount((page) => fetchUsersPage(request, page),responseBody.total_pages,responseBody.total);
    });

    // ============================================
    // GET USERS
    // ============================================
    // NON-EXISTENT PAGE
    // ============================================
    await test.step('Verify non-existent page returns empty data array', async () => {
      await expectEmptyPage((page) => fetchUsersPage(request, page),responseBody.total_pages + 1);
    });

    // ============================================
    // GET USERS
    // ============================================
    // DATA INTEGRITY - UNIQUE USER IDS
    // ============================================
    await test.step('Verify all user IDs are unique across pages', async () => {
      await expectUniqueUserIdsAcrossPages((page) => fetchUsersPage(request, page),responseBody.total_pages,
        responseBody.total);
    });
  });
});

// ============================================
// API - DELETE USER BY ID TESTS
// ============================================
test.describe('User API - Delete User', () => {
  test('Delete a user by ID and return 204 status', async ({ request }) => {
    let userId = process.env.NEW_USER_ID;
    if (!userId) {
        //Necessary if when running this test isolated
        let temp=1
        process.env.NEW_USER_ID = temp.toString()
        userId = process.env.NEW_USER_ID
    }
    
    const response = await request.delete('users/${userId}');

    // ============================================
    // DELETE USER BY ID
    // ============================================
    // STATUS CODE
    // ============================================
    await test.step(`Verify DELETE users/${userId} returns HTTP 204`, async () => {
      expect(response.status(),`Expected status code 204 when deleting user with ID ${userId}`).toBe(204);
    });

  });

});

;