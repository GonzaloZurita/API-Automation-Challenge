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

//We need to create a new interface for cta in response, because is another Json parameter, with other 2 attributes inside
export interface UserMetaDataCta{
  label: string;
  url: string;
}

export interface UserMetaData {
  powered_by: string;
  upgrade_url: string;
  docs_url: string;
  example_url: string;
  //Template Gallery, features and upgrade_cta are not on the response anymore, we have now variant, cta, example_url and context
  //template_gallery: string;
  variant: string;
  message: string;
  //features: string[];
  cta: UserMetaDataCta;
  //upgrade_cta: string;
  context: string;
}

export interface GetUserResponse {
  data: UserData;
  support: UserSupportData;
  _meta: UserMetaData;
}