  <!-- HomePage.vue -->

  <template>
    <div class="home-container">
      <div class="header">
        <h2>Welcome</h2>
        <button @click="logout">Logout</button>
      </div>
      <form @submit.prevent="CreateGroup">
        <label for="groupname">Group name:</label>
        <input type="text" id="groupname" v-model="groupname" required />
        <button type="submit">Create group</button>
      </form>
      <h2>Go to an existing group? <router-link to="/JoinGroup">Here!!!</router-link></h2>

      <!-- Tambahkan tombol untuk memulai obrolan antara dua pengguna -->
      <button @click="startPrivateChat">Start Private Chat</button>
    </div>
  </template>

  <script>
  export default {
    data() {
      return {
        groupname: "",
        userID: "",
      };
    },
    mounted() {
      // Fetch the data for the username, group name, and members
      this.getuserid();
    },
    methods: {
      async getuserid() {
        try {
          // Assuming you have the groupId available as a prop
          const groupId = this.groupId;

          // Fetch the group data from the API
          const response = await fetch(`http://localhost:3000/api/users/me`, {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (response.status === 401) {
            console.error("Unauthorized: Invalid credentials");
          } else if (response.ok) {
            const Data = await response.json();
            this.userID = Data.user.id;
            // Log the received data for verification
            console.log("User Id:", this.userID);
          } else {
            console.error("Error fetching group data");
          }
        } catch (error) {
          console.error("Error:", error);
        }
      },
      async logout() {
        try {
          const res = await fetch("http://localhost:3000/api/users/logout", {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (res.status === 401) {
            console.error("Unauthorized: Invalid credentials");
          } else {
            const json = await res.json();
            console.log(json);
            // Use Vue Router to navigate to the dashboard route
            this.$router.push("/logout");
          }
        } catch (error) {
          console.error("Error:", error);
        }
      },
      async CreateGroup() {
        try {
          const res = await fetch("http://localhost:3000/api/group", {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              groupName: this.groupname,
              members: [
                {
                  member: this.userID,
                },
              ],
            }),
          });

          if (res.status === 401) {
            console.error("Unauthorized: Invalid credentials");
          } else {
            const json = await res.json();
            console.log(json);

            const groupId = json.doc.id;
            this.$router.push(`/chat/${groupId}`);
          }
        } catch (error) {
          console.error("Error:", error);
        }
      },
      async startPrivateChat() {
        try {
          // Mendapatkan ID pengguna yang akan diajak bicara
          const otherUserId = "657683c575d2a4e4ce99ced7"; // Gantilah dengan ID pengguna yang sesuai

          // Buat obrolan pribadi antara pengguna saat ini dan pengguna lain
          const res = await fetch("http://localhost:3000/api/private-chat", {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              participants: [this.userID, otherUserId],
            }),
          });

          if (res.status === 401) {
            console.error("Unauthorized: Invalid credentials");
          } else {
            const json = await res.json();
            console.log(json);

            // Navigasi ke halaman PrivateChat.vue dengan menyertakan ID percakapan pribadi
            this.$router.push("/privatechat/:privateChatId?");
          }
        } catch (error) {
          console.error("Error:", error);
        }
      },
    },
  };
  </script>

  <style scoped>
  .home-container {
    max-width: 800px;
    margin: 50px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  button {
    padding: 8px;
    background-color: #14a472;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  .chat-list {
    display: flex;
    flex-direction: column;
  }

  div {
    box-sizing: border-box;
  }

  .avatar {
    width: 40px;
    height: 40px;
    background-color: #007bff;
    color: #fff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    margin-right: 10px;
  }

  </style>