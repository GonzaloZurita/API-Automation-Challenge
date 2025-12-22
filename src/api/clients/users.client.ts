import { APIRequestContext } from '@playwright/test';
import { GetUsersResponse } from '../models/users.model';

/**
 * Fetch users list for a specific page
 * @param request Playwright APIRequestContext
 * @param page page number to fetch
 * @returns GetUsersResponse
 */

export async function fetchUsersPage(
  request: APIRequestContext,
  page: number
): Promise<GetUsersResponse> {
  const response = await request.get(`users?page=${page}`);

  if (response.status() !== 200) {
    throw new Error(`Failed to fetch users page ${page}, status: ${response.status()}`);
  }

  return await response.json() as GetUsersResponse;
}
