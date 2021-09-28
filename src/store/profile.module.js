import axios from "axios";
const API = "http://127.0.0.1:8000/auth/";
const API_URL = API + "users/";
const API_URL_PHOTO = API + "photoupdate/";

export const profile = {
  state: {
    profiles: [],
    user: {}
  },
  getters: {
    PROFILES(state) {
      return state.profiles;
    },
    USER(state) {
      return state.user;
    }
  },
  actions: {
    GET_USERS_FROM_API({ commit }) {
      return axios(API_URL, {
        method: "GET"
      })
        .then(users => {
          commit("SET_USERS_TO_STATE", users.data);
          return users;
        })
        .catch(error => {
          return error;
        });
    },
    GET_CURRENT_USER({ commit }, id) {
      return axios(API_URL + id, {
        method: "GET"
      })
        .then(user => {
          commit("SET_USER_PROFILE", user.data);
          return user;
        })
        .catch(error => {
          return error;
        });
    },
    UPDATE_PHOTO(_, photo) {
      console.log(photo);
      return axios
        .post(API_URL_PHOTO, {
          avatar: photo.avatar,
          user: photo.user
        })
        .then(
          response => {
            return Promise.resolve(response.data);
          },
          error => {
            console.log(photo.avatar);
            return Promise.reject(error);
          }
        );
    }
  },
  mutations: {
    SET_USERS_TO_STATE: (state, users) => {
      state.profiles = users;
    },
    SET_USER_PROFILE: (state, user) => {
      state.user = user;
    }
  }
};
