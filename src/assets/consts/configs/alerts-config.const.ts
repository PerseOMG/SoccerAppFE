import { IAlert } from '../../../app/models/alerts.models';

const ALERT_STYLES = {
  color: '#eae3d2',
  background: '#273748',
  confirmButtonColor: '#607eaa',
  confirmButtonAriaLabel: '"Quicksand", sans-serif;',
};

const ALERT_STYLES_SECONDARY = {
  background: '#eae3d2',
  color: '#273748',
  confirmButtonColor: '#607eaa',
  confirmButtonAriaLabel: '"Quicksand", sans-serif;',
};

export const TOURNAMENT_ALERTS: { [key: string]: IAlert } = {
  success: {
    icon: 'success',
    title: 'Tournament created successfully.',
    ...ALERT_STYLES,
  },
  editSuccess: {
    icon: 'success',
    title: 'Tournament updated successfully.',
    ...ALERT_STYLES,
  },
  error: {
    icon: 'error',
    title: 'An error Ocurred',
    ...ALERT_STYLES,
  },
};

export const TEAMS_ALERTS: { [key: string]: IAlert } = {
  success: {
    icon: 'success',
    title: 'Team created successfully.',
    ...ALERT_STYLES,
  },
  editSuccess: {
    icon: 'success',
    title: 'Team updated successfully.',
    ...ALERT_STYLES,
  },
  error: {
    icon: 'error',
    title: 'An error Ocurred',
    ...ALERT_STYLES,
  },
  delete: {
    icon: 'success',
    title: 'Team deleted successfully.',
    ...ALERT_STYLES,
  },
  favorite: {
    icon: 'success',
    position: 'top-end',
    showConfirmButton: false,
    timer: 1500,
    ...ALERT_STYLES,
  },
  notFound: {
    icon: 'error',
    title: 'No team found.',
    ...ALERT_STYLES,
  },
};

export const FORM_ALERTS: { [key: string]: IAlert } = {
  teamsAmountError: {
    icon: 'error',
    position: 'center',
    title: 'Please select a proper amount of teams.',
    showConfirmButton: false,
    ...ALERT_STYLES,
  },
};

export const NO_TOURNAMENT_ALERT: { [key: string]: IAlert } = {
  error: {
    icon: 'error',
    position: 'center',
    title: 'Something went wrong. Please choose another tournament.',
    showConfirmButton: false,
    ...ALERT_STYLES,
  },
};

export const CHAMPION_ALERT: { [key: string]: IAlert } = {
  success: {
    text: '🏆 NEW CHAMPION! 🏆',
    position: 'center',
    showConfirmButton: true,
    imageHeight: 250,
    imageWidth: 250,
    allowOutsideClick: false,
    ...ALERT_STYLES_SECONDARY,
  },
};

export const AUTH_ALERTS: { [key: string]: IAlert } = {
  error: {
    icon: 'error',
    position: 'center',
    ...ALERT_STYLES,
  },
  success: {
    icon: 'success',
    position: 'center',
    ...ALERT_STYLES,
  },
};
