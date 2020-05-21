<template>
  <div class="container">
    <div class="card login">
      <div class="card-body">
        <h2 class="card-title text-center">Register</h2>
        <form @submit.prevent="checkStatus" class="text-center">
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
          <button type="submit" class="btn btn-primary">Register</button>
          <a href=""><router-link to="/">Login</router-link></a>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "../firebase/init";
const { firestore } = firebase;

export default {
  name: "Register",
  data() {
    return {
      username: null,
      password: null,
      errorText: null,
      isactive: false
    };
  },
  methods: {
    async checkStatus() {
      var vm = this;
      if (this.username && this.password) {
        console.log(this.username + "#" + this.password);
        await firestore
          .collection("users")
          .where("username", "==", this.username)
          .get()
          .then(function(querySnapshot) {
            if (querySnapshot.empty) {
              console.log("no data");
              vm.isactive = true;
            } else {
              querySnapshot.forEach(function(doc) {
                console.log(doc.id, "=>", doc.data());
              });
            }
          })
          .catch(function(error) {
            console.log("Error getting documents: ", error);
          });

        if (vm.isactive) {
          vm.register();
        }
        this.$router.push({ name: "Login" });
      } else {
        this.errorText = "Please username and password...!";
      }
    },
    register() {
      firestore
        .collection("users")
        .add({
          username: this.username,
          password: this.password
        })
        .catch(err => {
          console.log(err);
        });
      this.username = null;
      this.password = null;
    }
  }
};
</script>

<style scoped></style>
