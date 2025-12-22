export interface UsersListItem {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface UsersSupportData {
  url: string;
  text: string;
}

export interface UsersMetaData {
  powered_by: string;
  upgrade_url: string;
  docs_url: string;
  template_gallery: string;
  message: string;
  features: string[];
  upgrade_cta: string;
}

export interface GetUsersResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: UsersListItem[];
  support: UsersSupportData;
  _meta?: UsersMetaData; // optional, since not always present
}
