// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import {Environment} from "./interface";

export const environment: Environment = {
  production: false,
  firebase: {
    projectId: 'ng-complete-guide-b4e7f',
    appId: '1:598503473592:web:4c2d00123210c297fb4f4d',
    databaseURL: 'https://ng-complete-guide-b4e7f-default-rtdb.firebaseio.com',
    storageBucket: 'ng-complete-guide-b4e7f.appspot.com',
    locationId: 'us-central',
    apiKey: 'AIzaSyD-MSQ7tfZBWSEzlGhtlKmalrxCVH5GhFQ',
    authDomain: 'ng-complete-guide-b4e7f.firebaseapp.com',
    messagingSenderId: '598503473592',
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
