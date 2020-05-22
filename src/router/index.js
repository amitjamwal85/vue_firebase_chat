import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import Chat from "../views/Chat.vue";
import Register from "../views/Register.vue";
import sessionService from "../common/access.token";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login
  },
  {
    path: "/register",
    name: "Register",
    component: Register
  },
  {
    path: "/chat",
    name: "Chat",
    component: Chat,
    props: true,
    beforeEnter: (to, from, next) => {
      if (sessionService.getUser()) {
        next();
      } else {
        next({ name: "Login" });
      }
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

// const DEFAULT_TITLE = 'Login';
// router.afterEach((to, from) => {
//     console.log(from)
//     Vue.nextTick(() => {
//         document.title = to.meta.title || DEFAULT_TITLE;
//     });
// });

export default router;
