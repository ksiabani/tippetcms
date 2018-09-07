const api = "http://localhost:3000";

export const environment = {
  production: true,
  firebase: {
    apiKey: "AIzaSyBbPrHqSddPAXguuI-AqtXouA4quoW_OUM",
    authDomain: "tippetcms-1.firebaseapp.com",
    databaseURL: "https://tippetcms-1.firebaseio.com",
    projectId: "tippetcms-1",
    storageBucket: "",
    messagingSenderId: "537498593301"
  },
  api: {
    lobby: `${api}/lobby`
  }
};
