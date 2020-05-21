<template>
  <div class="container" style="margin-bottom: 30px">
    <form @submit.prevent="createMessage">
      <div class="form-group">
        <input
          type="text"
          name="message"
          class="form-control"
          placeholder="Enter message ..."
          v-model="newMessage"
        />
        <p class="text-danger" v-if="errorText">{{ errorText }}</p>
      </div>
      <button class="btn btn-primary" type="submit" name="action">
        Submit
      </button>
    </form>
  </div>
</template>

<script>
import sessionService from "../common/access.token";
import apiService from "../common/api.service";

export default {
  name: "CreateMessage",
  // props: ["name"],
  data() {
    return {
      newMessage: null,
      errorText: null,
      name: sessionService.getUser()
    };
  },
  methods: {
    createMessage() {
      if (this.newMessage) {
        this.$store
          .dispatch("ADD_MESSAGE", { name: this.name, msg: this.newMessage })
          .then(() => {
            this.sendNotification();
          });
      } else {
        this.errorText = "A message must be entered first!";
      }
    },

    sendNotification() {
      let api_url = "https://fcm.googleapis.com/fcm/send";
      console.log("sending notification...");
      let headers = {
        headers: {
          Authorization: "key=" + process.env.VUE_APP_FCM_SERVER_KEY,
          "Content-Type": "application/json"
        }
      };

      let body = {
        to: "/topics/vue_chat",
        data: {
          notification: {
            body: this.newMessage,
            title: this.name
          }
        }
      };

      apiService
        .post(api_url, body, headers)
        .then(data => {
          console.log(data);
        })
        .catch(error => {
          console.log(error);
        });

      this.newMessage = null;
      this.errorText = null;
    }
  }
};
</script>
