export interface INavLink {
  label: string;
  link: string;
}

interface IAppName {
  primary: string;
  secondary?: string;
}

export const HEADER_LINKS: INavLink[] = [
  { label: 'My Tournaments', link: '#' },
  { label: 'My Teams', link: '#' },
  { label: 'Global Statistics', link: '#' },
];

export const APP_NAME: IAppName = {
  primary: 'Soccer',
  secondary: 'App',
};
