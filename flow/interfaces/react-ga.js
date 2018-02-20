declare module 'react-ga' {
  declare type Event = {
    action?: string,
    category?: string,
    label?: string,
  };

  declare type Options = {
    debug?: boolean,
    titleCase?: boolean,
    gaOptions?: {},
    gaAddress?: string,
  };

  declare class GoogleAnalytics {
    initialize(id: string, options?: Options): void;
    event(event: Event): void;
    pageview(page: string): void;
    set(options: Object): void;
  }

  declare module.exports: GoogleAnalytics;
}
