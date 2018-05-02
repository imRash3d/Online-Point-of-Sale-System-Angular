// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase:{
    apiKey: "AIzaSyBTuCSBURGx_-pxkAxMre-05DQCpIeubZU",
    authDomain: "possystemdemo.firebaseapp.com",
    databaseURL: "https://possystemdemo.firebaseio.com",
    projectId: "possystemdemo",
    storageBucket: "possystemdemo.appspot.com",
    messagingSenderId: "179118178800"
  }
};
