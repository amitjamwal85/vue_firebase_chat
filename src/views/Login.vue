<template>
  <div class="container">
    <div class="card login">
      <div class="card-body">
        <h2 class="card-title text-center">Login</h2>
        <form @submit.prevent="login" class="text-center">
          <div class="form-group">
            <p>
              <input
                type="text"
                class="form-control"
                placeholder="Please username ..."
                name="username"
                v-model="username"
              />
            </p>
            <p>
              <input
                type="password"
                class="form-control"
                placeholder="Please password ..."
                name="password"
                v-model="password"
              />
            </p>
            <p v-if="errorText" class="text-danger">{{ errorText }}</p>
          </div>
          <button type="submit" class="btn btn-primary">Login</button>
           <a href=""><router-link to="/register">Register</router-link></a>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "../firebase/init";
const { messaging, firestore } = firebase;

export default {
  name: "login",
  data() {
    return {
      username: "",
      password: "",
      errorText: null
    };
  },
  methods: {
    async login() {
      var vm = this;
      if (this.username && this.password) {
        console.log(this.username + "#" + this.password);
        await firestore
          .collection("users")
          .where("username", "==", this.username)
          .where("password", "==", this.password)
          .get()
          .then(function(querySnapshot) {
            if (querySnapshot.empty) {
              vm.errorText = "Username/Password incorrect";
            } else {
              vm.askforPermission();
              vm.$router.push({ name: "Chat", params: { name: vm.username } });
            }
          })
          .catch(function(error) {
            console.log("Error getting documents: ", error);
          });
      } else {
        this.errorText = "Please username and password";
      }
    },
    async saveToken(usertoken) {
      await firestore
        .collection("fcm")
        .add({
          username: this.username,
          token: usertoken
        })
        .catch(err => {
          console.log(err);
        });
    },
    async getUserToken(token) {
      var vm = this;
      await firestore
        .collection("fcm")
        .where("username", "==", vm.username)
        .get()
        .then(function(querySnapshot) {
          if (querySnapshot.empty) {
            console.log("no data");
            vm.saveToken(token);
          } else {
            console.log("already token saved");
            return querySnapshot.docs[0].ref.update({
              token: token
            });
          }
        })
        .catch(function(error) {
          console.log("Error getting documents: ", error);
        });
    },
    async askforPermission() {
      await messaging
        .requestPermission()
        .then(() => {
          console.log("Notification permission granted update");
          messaging.getToken().then(async token => {
            console.log("New token created update: ", token);
            this.getUserToken(token);
          });
        })
        .catch(err => {
          console.log("Unable to get permission to notify.", err.code);
        });

      // messaging.onTokenRefresh(function() {
      //   messaging
      //     .getToken()
      //     .then(function(newToken) {
      //       console.log("Token refreshed: ", newToken);
      //     })
      //     .catch(function(err) {
      //       console.log("Unable to retrieve refreshed token ", err);
      //     });
      // });
    }
  },

  mounted() {
    // messaging.usePublicVapidKey("BKMKv7z0t2oGgvEagK_65KPixUaAMC8igPa8VWk_OF0xmYg_QOgBqLwJTlWQvfKTClPm_xnXyXaZZI1kglGW_js");
  }
};
</script>

<style>
.login {
  max-width: 450px;
  margin-top: 50px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>
