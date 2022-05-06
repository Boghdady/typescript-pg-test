export interface GithubUser {
  id: number;
  name?: string;
  login?: string;
  company?: string;
  type?: string;
  site_admin?: boolean;
  repos_url?: string;
  location?: string;
}
