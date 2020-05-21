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
import apiService from "../common/api.service";

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
      if (this.username && this.password) {
        this.$store
          .dispatch("LOGIN", {
            username: this.username,
            password: this.password
          })
          .then(resp => {
            console.log("resp:", resp);
            if (resp === "success") {
              this.askforPermission();
              this.$router.push({
                name: "Chat" /*, params: { name: this.username }*/
              });
            } else if (resp === "failed") {
              this.errorText = "Username/Password incorrect";
            } else {
              this.errorText = "System error, Please try again later.";
            }
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
      let vm = this;
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

    async subscribeTopic(token) {
      let topic = "vue_chat";
      let api_url =
        "https://iid.googleapis.com/iid/v1/" + token + "/rel/topics/" + topic;
      console.log("subscribing to topic : " + topic);
      let headers = {
        headers: {
          Authorization: "key=" + process.env.VUE_APP_FCM_SERVER_KEY,
          "Content-Type": "application/json"
        }
      };
      await apiService
        .post(api_url, {}, headers)
        .then(data => {
          console.log(data);
        })
        .catch(error => {
          console.log(error);
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
            this.subscribeTopic(token);
          });
        })
        .catch(err => {
          console.log("Unable to get permission to notify.", err.code);
        });
    }
  },

  mounted() {}
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
