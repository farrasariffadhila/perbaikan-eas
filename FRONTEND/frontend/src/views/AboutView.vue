<template>
  <div>
    <h2>Register</h2>
    <form @submit.prevent="handleRegister">
      <label for="email">Email:</label>
      <input type="email" id="email" v-model="email" required />

      <label for="username">Username:</label>
      <input type="text" id="username" v-model="username" required />

      <label for="password">Password:</label>
      <input type="password" id="password" v-model="password" required />

      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      username: "",
      password: "",
    };
  },
  methods: {
    async handleRegister() {
      try {
        const res = await fetch("http://localhost:3000/api/users/register", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: this.email,
            username: this.username,
            password: this.password,
          }),
        });

        if (res.status === 409) {
          console.error("Conflict: User already exists");
        } else {
          const json = await res.json();
          console.log(json);
          // You may want to navigate to the login page after successful registration
          // this.$router.push("/login");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    },
  },
};
</script>