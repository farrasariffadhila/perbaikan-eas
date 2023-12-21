<template>
    <div>
      <h2>Create Channel</h2>
      <form @submit.prevent="createChannel">
        <label for="channelName">Channel Name:</label>
        <input v-model="channelName" type="text" id="channelName" required />
        <button type="submit">Create Channel</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        channelName: "",
      };
    },
    methods: {
      createChannel() {
        // Implement create channel logic here (e.g., send request to backend)
        console.log("Creating channel:", this.channelName);
  
        // After successful channel creation, you might want to redirect to another page
        // For example, using Vue Router:
        // this.$router.push("/dashboard");
      },
    },
  };
  </script>