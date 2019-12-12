// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyDdxDLVYoZBqjimOvPCwE_VaM3Eu8ZwH4g',
    authDomain: 'info-credito.firebaseapp.com',
    databaseURL: 'https://info-credito.firebaseio.com',
    projectId: 'info-credito',
    storageBucket: 'info-credito.appspot.com',
    messagingSenderId: '626105425678',
    appId: '1:626105425678:web:9aa0c6fbcf0dd9a84c415f',
    measurementId: 'G-Y3H940123M'
  },
  endPoints: {
    users: 'https://info-credito.herokuapp.com/v1/'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
