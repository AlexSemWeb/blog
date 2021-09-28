<template>
  <div class="wrapper">
    <div class="profile">
      <router-link
        :to="{ name: 'profile_id', params: { id: user.id } }"
        v-for="user in users"
        :key="user.id"
        class="profile__item"
      >
        <span class="img">
          <img
            :src="usersPhoto(user.user)"
            alt=""
            v-if="usersPhoto(user.user)"
          />
          <img src="../assets/static/profile.svg" alt="" v-else />
        </span>
        <span class="info">
          <span class="info-title">{{ user.username }}</span>
          <span class="info-time"
            >На сайте с: {{ user.date_joined | time }}</span
          >
          <span class="info-article"
            >Статьи: <span class="bold">205</span></span
          >
        </span>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Profiles",
  computed: {
    users() {
      return this.PROFILES();
    }
  },
  methods: {
    ...mapActions(["GET_USERS_FROM_API"]),
    ...mapGetters(["PROFILES"]),
    usersPhoto(user) {
      if (user.length > 0) {
        return user[user.length - 1].avatar;
      } else {
        return false;
      }
    }
  },
  created() {
    this.GET_USERS_FROM_API();
  },
  filters: {
    time(time) {
      return time.slice(0, 10);
    }
  }
};
</script>

<style lang="scss">
.profile {
  margin-top: 30px;
  padding: 50px;
  border-radius: 5px;
  background-color: $white;
  &__item {
    display: flex;
    border-radius: 5px;
    overflow: hidden;
    border: 1px solid $border;
    margin-bottom: 20px;
    color: $text;
    .img {
      position: relative;
      width: 98px;
      height: 98px;
      border-right: 1px solid $border;
      img {
        overflow: hidden;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translateX(-50%) translateY(-50%);
        max-width: 100%;
        max-height: 100%;
      }
    }
    .info {
      display: flex;
      flex-direction: column;
      padding: 15px;
      &-title {
        font-size: 16px;
        font-weight: $font-weight--700;
        margin-bottom: 2px;
      }
      &-time {
        margin-bottom: 10px;
        font-size: 14px;
        color: $dark-gray;
      }
      &-article {
        font-size: 16px;
        .bold {
          font-weight: $font-weight--700;
        }
      }
    }
  }
}
</style>
