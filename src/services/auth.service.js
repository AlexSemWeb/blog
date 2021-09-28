import axios from "axios";

const API_URL = "http://127.0.0.1:8000/auth/";

class AuthService {
  login(user) {
    return axios
      .post(API_URL + "login/", {
        username: user.username,
        password: user.password
      })
      .then(response => {
        if (response.data.access) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(user) {
    return axios.post(API_URL + "register/", {
      username: user.username,
      email: user.email,
      password: user.password,
      password2: user.password2
    });
  }
}

export default new AuthService();
