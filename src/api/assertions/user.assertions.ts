import { expect } from '@playwright/test';
import {UserData,UserSupportData,UserMetaData,} from '../models/user.model';

/**
 * Validates user main data object
 */
export function expectValidUserData(user: UserData): void {
  expect(user.id, 'User id should be a positive number').toBeGreaterThan(0);
  expect(user.email, 'User email should not be empty').toBeTruthy();
  expect(user.first_name, 'User first name should not be empty').toBeTruthy();
  expect(user.last_name, 'User last name should not be empty').toBeTruthy();
  expect(user.avatar, 'User avatar should not be empty').toBeTruthy();
}

/**
 * Validates support object structure
 */
export function expectValidSupportData(support: UserSupportData): void {
  expect(support.url, 'Support url should exist').toEqual(expect.any(String));
  expect(support.text, 'Support text should exist').toEqual(expect.any(String));
}

/**
 * Validates meta object structure and content
 */
export function expectValidMetaData(meta: UserMetaData): void {
  expect(meta.powered_by).toEqual(expect.any(String));
  expect(meta.upgrade_url).toEqual(expect.any(String));
  expect(meta.docs_url).toEqual(expect.any(String));
  expect(meta.template_gallery).toEqual(expect.any(String));
  expect(meta.message).toEqual(expect.any(String));
  expect(meta.features).toEqual(expect.any(Array));
  expect(meta.upgrade_cta).toEqual(expect.any(String));
}
