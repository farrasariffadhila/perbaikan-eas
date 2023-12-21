<script setup>
	import { ref } from 'vue';
	import router from '../router';

	const email = ref(null);
	const password = ref(null);
	const loginError = ref(false);

	const login = async (e) => {
		e.preventDefault();
		
		const req = await fetch("http://localhost:3000/api/senders/login/", {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				email: email.value,
				password: password.value
			})
		});

		if (req.status === 200) {
			const res = await req.json();
			await router.push("/chat");
		}
		else {
			loginError.value = true;
		}
	}
</script>

<template>
  <main>
    <h1>Login</h1>
    <form @submit="login">
			<p v-if="loginError" class="error">Invalid email or password</p>
        <input type="email" placeholder="Email" v-model="email">
        <input type="password" placeholder="Password" v-model="password">
				<button class="login" type="submit">Login</button>
    </form>
  </main>
</template>

<style scoped>
  main {
    padding: 1rem;
    color: white;
  }

  h1 {
    margin-bottom: 1rem;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  input {
    width: 400px;
    padding: 0.5rem;
  }

	.error {
		color: red;
	}

	.login {
		width: 100px;
    	background-color: rgb(31, 148, 31);
    	color: white;
    	font-size: 1rem;
    	padding: 0.5rem 1rem;
    	text-decoration: none;
	}
</style>