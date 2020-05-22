import firebase from "../firebase/init";
const { firestore } = firebase;
import sessionService from "../common/access.token";
import moment from "moment";

const state = {
  messages: []
};

const mutations = {
  SET_MESSAGE(state, messsages) {
    state.messages = messsages;
  }
};

const actions = {
  async LOGIN(context, credentials) {
    console.log(credentials.username + "#" + credentials.password);
    let data = await firestore
      .collection("users")
      .where("username", "==", credentials.username)
      .where("password", "==", credentials.password)
      .get()
      .then(function(querySnapshot) {
        if (querySnapshot.empty) {
          return "failed";
        } else {
          sessionService.saveUser(credentials.username);
          return "success";
        }
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
        return "error";
      });
    return data;
  },

  async ADD_MESSAGE(context, message) {
    await firestore
      .collection("messages")
      .add({
        message: message.msg,
        name: message.name,
        timestamp: Date.now()
      })
      .catch(err => {
        console.log(err);
      });
  },

  async GET_MESSAGE(context) {
    let messsages = [];
    let ref = await firestore.collection("messages").orderBy("timestamp");
    ref.onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        console.log("change.type:", change.type);
        if (change.type === "added") {
          let doc = change.doc;
          messsages.push({
            id: doc.id,
            name: doc.data().name,
            message: doc.data().message,
            timestamp: moment(doc.data().timestamp).format("LTS")
          });
        }
      });
      context.commit("SET_MESSAGE", messsages);
    });
    return "success";
  }
};

const getters = {
  get_messages(state) {
    return state.messages;
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
