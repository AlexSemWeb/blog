import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login";
import Register from "../views/Register";
import Profiles from "../views/Profiles";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/register",
    component: Register
  },
  {
    path: "/profile/",
    name: "profile",
    // lazy-loaded
    component: Profiles
  },
  {
    path: "/profile/:id",
    name: "profile_id",
    // lazy-loaded
    component: () => import("../views/Profile.vue")
  }
];

const router = new VueRouter({
  routes,
  mode: "history"
});

export default router;
