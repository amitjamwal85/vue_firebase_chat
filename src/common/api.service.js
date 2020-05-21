import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";

Vue.use(VueAxios, axios);

const ApiService = {
  get(resource) {
    console.log("resource:" + resource);
    return axios.get(`${resource}`).catch(error => {
      throw new Error(`[RWV] ApiService ${error}`);
    });
  },

  post(resource, params, header) {
    return axios.post(`${resource}`, params, header);
  }
};

export default ApiService;
