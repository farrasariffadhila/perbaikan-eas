<script setup>
  import { onMounted, ref } from "vue";
  import router from "../router";

  const myEmail = ref('');
  const recipientEmail = ref(null);
  const chats = ref([]);
  const msgContent = ref(null);

  onMounted(async () => {
    const req = await fetch("http://localhost:3000/api/senders/me/", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
    });

    const res = await req.json();

    myEmail.value = res.user.email;
  });

  const logout = async() => {
    await fetch("http://localhost:3000/api/senders/logout/", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
    });

    router.replace("/");
  }

  const fetchChats = async() => {
    const req = await fetch(`http://localhost:3000/api/chats?limit=1000&sort=id`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      }
    });

    const res = await req.json();
    chats.value = res.docs.filter(c => 
      (c.senderEmail == myEmail.value && c.recipientEmail == recipientEmail.value) || 
      (c.senderEmail == recipientEmail.value && c.recipientEmail == myEmail.value) )
  }

  const filterChats = async(e) => {
    e.preventDefault();
    fetchChats();
  }

  const sendMessage = async(e) => {
    e.preventDefault();

    await fetch("http://localhost:3000/api/chats/", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        content: msgContent.value,
        recipientEmail: recipientEmail.value
      })
    });

    await fetchChats();
  }

</script>

<template>
  <main class="bg-gray-100 min-h-screen p-4">
    <button class="logout-btn" @click="logout">Log Out</button>

    <div class="chat-container">
      <div class="info-panel">
        <h1 class="text-2xl font-bold mb-2">Hello, {{ myEmail }}</h1>

        <div class="message-form">
          <h2 class="text-lg font-semibold mb-2">Send Message</h2>
          <form @submit="filterChats">
            <input
              type="text"
              placeholder="Recipient Email"
              v-model="recipientEmail"
              class="input"
            />
            <button type="submit" class="btn bg-blue-500 text-white hover:bg-blue-600">
              Open Chats
            </button>
          </form>
        </div>
      </div>

      <div class="chat-panel">
        <h2 class="text-lg font-semibold mb-2">Chats from {{ recipientEmail }}</h2>
        <p v-for="c in chats" :key="c.id">
          > {{ c.senderEmail === myEmail ? 'You' : 'Them' }}: {{ c.content }}
        </p>
      </div>
    </div>

    <form class="message-form" @submit="sendMessage">
      <input type="text" placeholder="Type your chat here" v-model="msgContent" class="input" />
      <button type="submit" class="btn bg-green-500 text-white hover:bg-green-600">
        Send
      </button>
    </form>
  </main>
</template>



<style scoped>
  @import url('https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css');

  .logout-btn {
    @apply absolute top-4 right-4 p-2 text-white text-sm font-medium bg-red-500 hover:bg-red-600 rounded-md cursor-pointer;
  }

  .chat-container {
    @apply flex space-x-4;
  }

  .info-panel {
    @apply flex-1 bg-white p-4 rounded-md shadow-md;
  }

  .message-form {
    @apply mt-4;
  }

  .input {
    @apply p-2 mr-2 w-56 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500;
  }

  .btn {
    @apply p-2 rounded-md cursor-pointer;
  }

  /* Button Colors */
  .btn.bg-blue-500 {
    @apply bg-blue-500;
  }

  .btn.bg-blue-500:hover {
    @apply hover:bg-blue-600;
  }

  .btn.bg-green-500 {
    @apply bg-green-500;
  }

  .btn.bg-green-500:hover {
    @apply hover:bg-green-600;
  }

  .chat-panel {
    @apply flex-1 bg-white p-4 rounded-md shadow-md;
  }

  .chat-panel p {
    @apply mb-2;
  }
</style>