import Vue from "vue";
import Vuex from "vuex";
import firestore from "./firestore.module";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    firestore
  }
});
