export interface UserData {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface UserSupportData {
  url: string;
  text: string;
}

export interface UserMetaData {
  powered_by: string;
  upgrade_url: string;
  docs_url: string;
  template_gallery: string;
  message: string;
  features: string[];
  upgrade_cta: string;
}

export interface GetUserResponse {
  data: UserData;
  support: UserSupportData;
  _meta: UserMetaData;
}