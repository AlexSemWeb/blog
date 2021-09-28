<template>
  <div class="wrapper">
    <div class="profile">
      <div class="profile--container">
        <div class="profile__description">
          <h1>{{ currentUser.username }}</h1>
          <span class="time"
            >На сайте с:
            {{ (currentUser.date_joined || "") | timeNormalize }}</span
          >
        </div>
        <div class="profile__img">
          <div class="profile__img--wrapper">
            <img
              :src="usersPhoto(currentUser.user)"
              alt=""
              v-if="usersPhoto(currentUser.user)"
            />
            <img src="../assets/static/profile.svg" alt="" v-else />
          </div>

          <form
            v-if="authUser === currentUser.username"
            class="profile__img--form"
            enctype="multipart/form-data"
            @submit.prevent="handleUpload"
          >
            <input type="hidden" :value="authUser" />
            <label class="label">
              <span class="label__title">Загрузить фото</span>
              <input
                type="image"
                v-validate="'image'"
                data-vv-as="image"
                name="image_field"
                @change="onFileChange"
              />
            </label>
            <span v-if="errors.has('image_field')" class="error">{{
              errors.first("image_field")
            }}</span>
            <button v-if="valid" class="btn btn--blue">
              Обновить фото
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Profile",
  data() {
    return {
      userPhoto: {
        avatar: null,
        user: null
      },
      valid: false
    };
  },
  computed: {
    currentUser() {
      return this.USER();
    },
    userID() {
      return this.$route.params.id;
    },
    authUser() {
      return this.$store.state.auth.user.username;
    }
  },
  methods: {
    ...mapActions(["GET_CURRENT_USER"]),
    ...mapGetters(["USER"]),
    usersPhoto(user = "") {
      if (user.length > 0) {
        return user[user.length - 1].avatar;
      } else {
        return false;
      }
    },
    onFileChange(e) {
      let vm = this;
      this.$validator.validate().then(isValid => {
        if (isValid) {
          vm.valid = true;
          vm.userPhoto.avatar = e.target.files[0];
          vm.userPhoto.user = vm.$store.state.auth.user.id;
        }
      });
    },
    handleUpload() {
      let vm = this;
      this.message = "";
      this.submitted = true;
      this.$validator.validate().then(isValid => {
        if (isValid) {
          console.log(vm.userPhoto);
          this.$store.dispatch("UPDATE_PHOTO", this.userPhoto).then(
            data => {
              console.log(data);
            },
            error => {
              console.log(error);
            }
          );
        }
      });
    }
  },
  created() {
    this.GET_CURRENT_USER(this.userID);
  },
  mounted() {
    // if (!this.currentUser) {
    //   this.$router.push("/login");
    // }
  },
  filters: {
    timeNormalize(time) {
      let newTime = time
        .split("")
        .slice(0, 10)
        .join("");
      return newTime;
    }
  }
};
</script>

<style lang="scss">
.profile {
  &--container {
    display: flex;
    justify-content: space-between;
  }
  &__description {
    h1 {
      font-size: 33px;
      font-weight: $font-weight--700;
      margin-bottom: 5px;
    }
    .time {
      font-size: 20px;
      color: $dark-gray;
    }
  }
  &__img {
    position: relative;
    border: 1px solid $border;
    border-radius: 5px;
    img {
      overflow: hidden;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translateX(-50%) translateY(-50%);
      max-width: 100%;
      max-height: 100%;
    }
    &--wrapper {
      position: relative;
      width: 240px;
      height: 240px;
      overflow: hidden;
      border-radius: 5px;
    }
    &--form {
      position: absolute;
      top: calc(100% - 29px);
      width: 100%;
      .label {
        display: flex;
        justify-content: center;
        width: 100%;
        padding: 6px;
        background-color: rgba(0, 0, 0, 0.6);
        cursor: pointer;
        transition: all 0.2s;
        &:hover {
          background-color: rgba(0, 0, 0, 0.8);
        }
        input {
          position: absolute;
          z-index: 0;
          visibility: hidden;
        }
        &__title {
          font-size: 14px;
          color: $white;
        }
      }
      .error {
        font-size: 11px;
        color: $red;
      }
    }
  }
}
</style>
