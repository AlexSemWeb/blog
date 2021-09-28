<template>
  <div class="register--container auth">
    <div class="wrapper wrapper--small">
      <div class="auth--container">
        <h1>Регистрация</h1>
        <span class="auth__subheader">
          или
          <router-link to="/login"> войдите</router-link>
        </span>
        <form name="form" class="auth__form" @submit.prevent="handleRegister">
          <template v-if="!successful">
            <label class="auth__group">
              <span class="title">E-mail</span>
              <input
                v-model="user.email"
                v-validate="'required|email|max:50'"
                type="email"
                class="input"
                name="email"
              />
              <span v-if="submitted && errors.has('email')" class="alert">
                {{ errors.first("email") }}
              </span>
            </label>
            <label class="auth__group">
              <span class="title">Логин</span>
              <input
                v-model="user.username"
                v-validate="'required|min:3|max:20'"
                type="text"
                class="input"
                name="username"
              />
              <span v-if="submitted && errors.has('username')" class="alert">
                {{ errors.first("username") }}
              </span>
            </label>
            <label class="auth__group">
              <span class="title">Пароль</span>
              <input
                v-model="user.password"
                v-validate="'required|min:6|max:40'"
                type="password"
                class="input"
                name="password"
                ref="password"
              />
              <span v-if="submitted && errors.has('password')" class="alert">
                {{ errors.first("password") }}
              </span>
            </label>
            <label class="auth__group">
              <span class="title">Пароль</span>
              <input
                v-model="user.password2"
                v-validate="'required|confirmed:password'"
                type="password"
                class="input"
                name="password2"
                data-vv-as="password"
              />
              <span v-if="submitted && errors.has('password2')" class="alert">
                {{ errors.first("password2") }}
              </span>
            </label>
            <button class="btn btn--blue">Зарегистрироваться</button>
          </template>
          <div v-if="message" class="auth__alert">
            <div
              v-for="(item, index) in message"
              :class="successful ? 'access' : 'alert'"
              role="alert"
              :key="index"
            >
              {{ item[0] }}
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
  name: "Register",
  data() {
    return {
      user: new User("", "", "", ""),
      submitted: false,
      successful: false,
      message: ""
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push("/profile");
    }
  },
  methods: {
    handleRegister() {
      this.message = "";
      this.submitted = true;
      this.$validator.validate().then(isValid => {
        if (isValid) {
          this.$store.dispatch("auth/register", this.user).then(
            data => {
              this.message = data.message;
              this.successful = true;
              this.$router.push("/login");
            },
            error => {
              this.message =
                [...Object.values(error.response.data)] ||
                error.message ||
                error.toString();
              this.successful = false;
            }
          );
        }
      });
    }
  }
};
</script>
