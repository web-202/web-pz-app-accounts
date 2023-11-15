<template>
  <h1>name {{ name }}</h1>
  <h1>account_name {{ account_name }}</h1>
  <h1>email {{ email }}</h1>
  <h1>status {{ status }}</h1>
  <h1>start_date {{ start_date }}</h1>
  <h1>expiration_date {{ expiration_date }}</h1>
</template>

<script lang="ts">
import axios from "axios";

export default {
  name: "Account",
  data() {
    return {
      account: null,
      name : String,
      account_name: String,
      email: String,
      status: String,
      start_date: Number,
      expiration_date: Number,
    }
  },
  async mounted() {
    this.account = (await axios.get('http://localhost:3000/accounts/' + this.$route.params.id)).data;
      this.name  = this.account.name;
      this.account_name = this.account.account_name;1
      this.email = this.account.email;
      this.status = this.account.status;
      this.start_date = this.account.start_date;
      this.expiration_date = this.account.expiration_date;
    console.log(this.account)
  }
}
</script>

<style scoped>

</style>
