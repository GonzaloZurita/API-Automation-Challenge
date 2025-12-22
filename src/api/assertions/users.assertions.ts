import { expect } from '@playwright/test';
import { GetUsersResponse, UsersListItem } from '../models/users.model';

/**
 * Validates main pagination fields of Get Users response
 */
export function expectValidPagination(response: GetUsersResponse): void {
  expect(response.page).toEqual(expect.any(Number));
  expect(response.per_page).toEqual(expect.any(Number));
  expect(response.total).toEqual(expect.any(Number));
  expect(response.total_pages).toEqual(expect.any(Number));
  expect(Array.isArray(response.data)).toBe(true);
  expect(response.support).toBeDefined();
}

/**
 * Validates each user object structure
 */
export function expectValidUsersData(users: UsersListItem[]): void {
  users.forEach((user, index) => {
    expect(user.id, `User ${index} id should be a positive number`).toBeGreaterThan(0);
    expect(user.email, `User ${index} email should not be empty`).toBeTruthy();
    expect(user.first_name, `User ${index} first name should not be empty`).toBeTruthy();
    expect(user.last_name, `User ${index} last name should not be empty`).toBeTruthy();
    expect(user.avatar, `User ${index} avatar should not be empty`).toBeTruthy();
  });
}

/**
 * Validates pagination logic
 */
export function expectValidPaginationLogic(response: GetUsersResponse): void {
  const expectedPages = Math.ceil(response.total / response.per_page);

  expect(response.page,'Expected default page number to be 1').toBe(1);

  expect(response.total_pages,'Verify total_pages matches total/per_page calculation').toBe(expectedPages);

  expect(response.data.length,'Verify number of users does not exceed per_page').toBeLessThanOrEqual(response.per_page);
}

/**
 * Validates total users count across pages
 */
export async function expectTotalUsersCount(
  fetchPage: (page: number) => Promise<GetUsersResponse>,
  totalPages: number,
  expectedTotal: number
): Promise<void> {
  let totalUsersCount = 0;

  for (let page = 1; page <= totalPages; page++) {
    const pageResponse = await fetchPage(page);
    totalUsersCount += pageResponse.data.length;
  }

  expect(totalUsersCount,'Verify total number of users matches "total" field').toBe(expectedTotal);
}

/**
 * Validates non-existent page returns empty data
 */
export async function expectEmptyPage(
  fetchPage: (page: number) => Promise<GetUsersResponse>,
  nonExistentPage: number
): Promise<void> {
  const pageResponse = await fetchPage(nonExistentPage);

  expect(pageResponse.data.length,'Expected no users on non-existent page').toBe(0);
}

/**
 * Validates unique user IDs across all pages
 */
export async function expectUniqueUserIdsAcrossPages(fetchPage: (page: number) => Promise<GetUsersResponse>,
  totalPages: number,
  expectedTotal: number): Promise<void> {

  let allIds: number[] = [];

  for (let page = 1; page <= totalPages; page++) {
    const pageResponse = await fetchPage(page);
    allIds.push(...pageResponse.data.map(user => user.id));
  }
  //Converting to set to eliminate duplicated ones
  const uniqueIds = new Set(allIds);

  expect(allIds.length,'Verify no duplicated user IDs exist').toBe(uniqueIds.size);
  expect(allIds.length,'Verify total unique IDs matches total users').toBe(expectedTotal);
}
