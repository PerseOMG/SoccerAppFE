export interface INavLink {
  label: string;
  link: string;
}

interface IAppName {
  primary: string;
  secondary?: string;
}

export const HEADER_LINKS: INavLink[] = [
  { label: 'My Tournaments', link: 'tournaments' },
  { label: 'My Teams', link: 'teams' },
  { label: 'Global Statistics', link: 'statistics' },
  { label: 'My Profile', link: 'profile' },
];

export const HEADER_BUTTONS_OPTIONS = {
  LOGIN: { label: 'Signup', link: '/signup' },
  SIGNUP: { label: 'Login', link: '/login' },
  LOGOUT: { label: 'Logout', link: '' },
};

export const APP_NAME: IAppName = {
  primary: 'Soccer',
  secondary: 'App',
};
