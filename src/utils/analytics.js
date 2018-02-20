// @flow
import GoogleAnalytics from 'react-ga';

type Event = {
  action: string,
  category: string,
  label: string,
};

const isTest = process.env.NODE_ENV === 'test';

function initialize() {
  const environment = process.env.GA_ENV || 'local';
  const trackingIds = {};

  const userId = sessionStorage.getItem('userId');
  const options = {
    gaOptions: {
      userId: userId || '',
    },
  };

  GoogleAnalytics.initialize(trackingIds[environment] || ' ', options);
}

export const trackEvent = (event: Event) => {
  initialize();

  GoogleAnalytics.event({ ...event });
};

export const trackRoute = (page: string) => {
  if (isTest) return;

  initialize();

  GoogleAnalytics.set({ page });
  GoogleAnalytics.pageview(page);
};
