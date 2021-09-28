<template>
  <header class="header">
    <div class="wrapper">
      <nav class="header__nav">
        <router-link to="/" class="header__nav--item">
          <img src="../assets/static/mosaic.svg" alt="Mosaic" title="Mosaic" />
        </router-link>
        <router-link to="/login" class="header__nav--item" v-if="!loggedIn">
          <img
            src="../assets/static/signup.svg"
            alt="Войти на сайт"
            title="Войти на сайт"
          />
        </router-link>
        <template v-else>
          <router-link to="/create_article" class="header__nav--item">
            <img
              src="../assets/static/pencil.svg"
              alt="написать статью"
              title="Написать статью"
            />
          </router-link>
          <router-link
            :to="{ name: 'profile_id', params: { id: authUser } }"
            class="header__nav--item"
          >
            <img
              src="../assets/static/profile.svg"
              alt="Профиль"
              title="Профиль"
            />
          </router-link>
        </template>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
    authUser() {
      return this.$store.state.auth.user.id;
    }
  }
};
</script>

<style lang="scss">
.header {
  padding: 11px 0;
  border-bottom: 0.5px solid $text-gray;
  .wrapper {
    padding-bottom: 0;
  }
  &__nav {
    display: flex;
    justify-content: space-between;
    &--item {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 48px;
      height: 48px;
      background-color: $white;
      border-radius: 50%;
      img {
        max-width: 100%;
      }
    }
  }
}
</style>
