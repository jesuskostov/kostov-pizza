import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import axios from 'axios'
import { BootstrapVue } from 'bootstrap-vue'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import VueSweetalert2 from 'vue-sweetalert2'
import { fb } from './firebase'
import Vue2TouchEvents from 'vue2-touch-events'
import VueTouch from 'vue-touch';

Vue.use(Vue2TouchEvents)
Vue.use(BootstrapVue)
Vue.use(axios)
Vue.use(VueTouch);
Vue.use(VueSweetalert2)

export const eventBus = new Vue(); // added line

let app;

fb.auth().onAuthStateChanged(() => {
  if (!app) {
    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
});