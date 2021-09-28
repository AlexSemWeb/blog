<template>
  <div class="login--container auth">
    <div class="wrapper wrapper--small">
      <div class="auth--container">
        <h1>Войти</h1>
        <span class="auth__subheader">
          или
          <router-link to="/register"> регистрация</router-link>
        </span>
        <form
          name="auth--form"
          class="auth__form"
          @submit.prevent="handleLogin"
        >
          <label class="auth__group">
            <span class="title">Логин</span>
            <input
              v-model="user.username"
              v-validate="'required'"
              type="text"
              class="input"
              name="username"
            />
            <span v-if="errors.has('username')" class="alert" role="alert">
              Заполните логин!
            </span>
          </label>
          <label class="auth__group">
            <span class="title">Пароль</span>
            <input
              v-model="user.password"
              v-validate="'required'"
              type="password"
              class="input"
              name="password"
            />
            <span v-if="errors.has('password')" class="alert" role="alert">
              Заполните пароль!
            </span>
          </label>
          <button class="btn btn--blue" :disabled="loading">
            <span>Войти</span>
          </button>
          <div v-if="message" class="auth__alert">
            <div class="alert" role="alert">
              {{ message }}
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import User from "../models/user";

export default {
  name: "Login",
  data() {
    return {
      user: new User("", ""),
      loading: false,
      message: ""
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/profile");
    }
  },
  methods: {
    handleLogin() {
      this.loading = true;
      this.$validator.validateAll().then(isValid => {
        if (!isValid) {
          this.loading = false;
          return;
        }

        if (this.user.username && this.user.password) {
          this.$store.dispatch("auth/login", this.user).then(
            () => {
              this.$router.push("/profile");
            },
            error => {
              this.loading = false;
              this.message =
                error.response.status === 401
                  ? "Вы ввели неправильный логин или пароль"
                  : (error.response && error.response.data) ||
                    error.message ||
                    error.toString();
            }
          );
        }
      });
    }
  }
};
</script>

<style lang="scss"></style>
