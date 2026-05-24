import { createApp } from 'vue';
import App from './App.vue';
import '@mdi/font/css/materialdesignicons.css';
import { aliases, mdi } from 'vuetify/iconsets/mdi';
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import router from './src/router';
import archive from './src/icons/archive.vue';
import baza from './src/icons/baza.vue';
import cale from './src/icons/cale.vue';
import doc from './src/icons/doc.vue';
import logaIcon from './src/icons/logaIcon.vue';
import ExitIcon from './src/icons/ExitIcon.vue';
import FireIcon from './src/icons/FireIcon.vue';
import HomeIcon from './src/icons/HomeIcon.vue';
import navbar from './src/icons/navbar.vue';
import port from './src/icons/port.vue';
import SearchIcon from './src/icons/SearchIcon.vue';
import serv from './src/icons/serv.vue';
import SettingsIcon from './src/icons/SettingsIcon.vue';
import sotr from './src/icons/sotr.vue';
import user from './src/icons/user.vue';
import down from './src/icons/down.vue';


import LoginService from './src/plugins/api/services/LoginService';
import UserService from './src/plugins/api/services/UserService';

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light',
  },
  icons: {
    defaultSet: 'mdi',
    aliases:{
      ...aliases,
      archive: archive,
      baza: baza,
      cale: cale,
      doc: doc,
      logaIcon: logaIcon,
      ExitIcon: ExitIcon,
      FireIcon: FireIcon,
      HomeIcon: HomeIcon,
      navbar: navbar,
      serv: serv,
      SearchIcon: SearchIcon,
      port: port,
      SettingsIcon: SettingsIcon,
      sotr: sotr,
      user: user,
      down: down,
    },
    sets: {
      mdi,
    },
  },
});

const app = createApp(App);


app.provide('loginService', LoginService);
app.provide('userService', UserService);

app.use(vuetify);
app.use(router);
app.mount('#app');