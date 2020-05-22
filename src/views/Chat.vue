<template>
  <div class="container chat">
    <h3 class="text-primary text-center">Real-Time Chat</h3>
    <h5 class="text-secondary text-center">Vue.js & Firebase <a href="" @click="logout()">Logout</a></h5>
    <div class="card" v-if="isloaded">
      <div class="card-body" >
        <p class="text-secondary nomessages" v-if="get_messages.length === 0">
          [No messages yet!]
        </p>
        <div class="messages" v-chat-scroll="{ always: true, smooth: true }">
          <div
            style="text-align: left"
            v-for="message in get_messages"
            :key="message.id"
          >
            <span class="text-info">[{{ message.name }}]: </span
            >{{ message.message }}
            <span class="text-secondary time">{{ message.timestamp }}</span>
          </div>
        </div>
      </div>
      <div class="card-action">
        <CreateMessage />
      </div>
    </div>
  </div>
</template>

<script>
import CreateMessage from "../components/CreateMessage";
import { mapGetters } from "vuex";
import sessionService from "../common/access.token"

export default {
  name: "Chat",
  //props: ["name"],
  watch: {
      $route: {
          immediate: true,
          handler(to) {
              document.title = to.meta.title || 'Chat';
          }
      },
  },
  components: {
    CreateMessage
  },
  data() {
    return {
      isloaded: false
    };
  },
  methods: {

      logout(){
            sessionService.destroyUser();
            this.$router.push({
                name: "/"
            });
      }

  },
  created() {
    this.$store.dispatch("GET_MESSAGE").then(() => {
      this.isloaded = true;
    });
  },
  computed: {
    ...mapGetters(["get_messages"])
  }
};
</script>

<style>
.chat h2 {
  font-size: 2.6em;
  margin-bottom: 0px;
}
.chat h5 {
  margin-top: 0px;
  margin-bottom: 40px;
}
.chat span {
  font-size: 1.2em;
}
.chat .time {
  display: block;
  font-size: 0.7em;
}
.messages {
  max-height: 300px;
  overflow: auto;
}
</style>
