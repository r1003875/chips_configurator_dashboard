<script setup>
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';

    const API_URL = import.meta.env.VITE_API_URL
    const router = useRouter();
    const firstName = ref('');
    const lastName = ref('');
    const email = ref('');
    const password = ref('');
    const login = async () => {
        try {
            const response = await fetch(`${API_URL}/users/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    firstName: firstName.value,
                    lastName: lastName.value,
                    email: email.value,
                    password: password.value
                })
            });

            const json = await response.json();

            if (json.status === 'success') {
                sessionStorage.setItem('token', json.token || 'logged-in');
                if (json.isAdmin) {
                    router.push({ name: 'Dashboard' });
                } else {
                    router.push({ name: 'Voting' });
                }
            } else {
                const alertBox = document.querySelector('.alert');
                alertBox.textContent = json.message || 'Sign up failed';
                alertBox.classList.remove('hidden');
            }
        }
        catch(error){
            console.error('Error during signup:', error);
        }
    };
</script>

<template>
    <div class="body">
        <div class="app">
            <h2 class="title">Log in</h2>
            <div class="alert hidden">
                Here is some feedback
            </div>
            <div class="signup">
                <div>
                <label for="firstName">First name</label>
                <input type="text" v-model="firstName" class="input--text" name="firstName" id="firstName">
                </div>

                <div>
                <label for="lastName">Last name</label>
                <input type="text" v-model="lastName" class="input--text" name="lastName" id="lastName">
                </div>

                <div>
                <label for="email">Email</label>
                <input type="text" v-model="email" class="input--text" name="email" id="email">
                </div>
                
                <div>
                <label for="password">Password</label>
                <input type="password" v-model="password" class="input--text" name="password" id="password">
                </div>
                
                <button @click.prevent="login" class="btn btn--primary">Let's go</button>
            </div>
            <p>Already have an account? <router-link to="/login">Log in here</router-link></p>
        </div>
    </div>
</template>

<style scoped>
    * {box-sizing: border-box;}
    html { height: 100%; display: flex; }

    .body
    {
    font-family: Helvetica, sans-serif;
    background-color: #DDDDDD;
    margin: auto;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    }

    .input--text::placeholder
    {
    color: #ccc;
    }

    .input--text
    {
    font-size: 1em;
    width: 100%;
    padding: 0.4em;
    color: #000;
    margin-bottom: 1em;
    }

    .app
    {
    background-color: white;
    width: 400px;
    box-shadow: 0px 0px 1em #ccc;
    font-size: 1.25em;
    padding: 1em;
    font-family: Helvetica, sans-serif;

    }

    .btn
    {
    font-size: 1em;
    padding: 0.5em;
    font-weight: bold;
    border-radius: 0.2em;
    border: none;
    color: white;
    background-color: #F94D35;
    cursor: pointer;
    }

    .btn:active
    {
    position: relative;
    top: 1px;
    }

    .hidden
    {
    display:none;
    }

    .alert
    {
    background-color: #B4C4E7;
    padding: 0.5em;
    margin-bottom: 1em;
    color: #32549d;
    }
</style>