<template>
  <div class="container chat">
    <h3 class="text-primary text-center">Real-Time Chat</h3>
    <h5 class="text-secondary text-center">Vue.js & Firebase</h5>
    <div class="card">
      <div class="card-body" v-if="isloaded">
        <p class="text-secondary nomessages" v-if="messages.length == 0">
          [No messages yet!]
        </p>
        <div class="messages" v-chat-scroll="{ always: false, smooth: true }">
          <div v-for="message in messages" :key="message.id">
            <span class="text-info">[{{ message.name }}]: </span>
            <span>{{ message.message }}</span>
            <span class="text-secondary time">{{ message.timestamp }}</span>
          </div>
        </div>
      </div>
      <div class="card-action">
        <CreateMessage :name="name" />
      </div>
    </div>
  </div>
</template>

<script>
import CreateMessage from "../components/CreateMessage";
import firebase from "../firebase/init";
const { firestore } = firebase;
import moment from "moment";

export default {
  name: "Chat",
  props: ["name"],
  components: {
    CreateMessage
  },
  data() {
    return {
      isloaded: false,
      messages: []
    };
  },
  created() {
    let ref = firestore.collection("messages").orderBy("timestamp");
    ref.onSnapshot(snapshot => {
      this.isloaded = true;
      snapshot.docChanges().forEach(change => {
        console.log("change.type:", change.type);
        if (change.type === "added") {
          let doc = change.doc;
          this.messages.push({
            id: doc.id,
            name: doc.data().name,
            message: doc.data().message,
            timestamp: moment(doc.data().timestamp).format("LTS")
          });
        }
      });
    });
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
