import { get } from "./client";
import { API_ENDPOINTS } from "./config";

export function getHealth() {
  return get(API_ENDPOINTS.health);
}

export function getSummary() {
  return get(API_ENDPOINTS.summary);
}

export function getUsersActivity() {
  return get(API_ENDPOINTS.usersActivity);
}

export function getTopCommentedPosts(limit = 10) {
  return get(`${API_ENDPOINTS.topCommentedPosts}?limit=${limit}`);
}
