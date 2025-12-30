<script setup>
    import { ref } from 'vue';

    const email = ref('');
    const password = ref('');
    const login = async () => {
        try{
            await fetch('http://localhost:3000/api/v1/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email.value,
                    password: password.value
                })
            })
            .then(response => {return response.json()})
            .then(data => {
                console.log('Login attempt success:', data);
            });
        }
        catch(error){
            console.error('Error during login:', error);
        }
    };
</script>

<template>
    <div class="app">
        <h2 class="title">Log in</h2>
        <div class="alert hidden">
            Here is some feedback
        </div>
        <div class="signup">
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
    </div>
</template>

<style>
    * {box-sizing: border-box;}
    html { height: 100%; display: flex; }

    body
    {
    font-family: Helvetica, sans-serif;
    background-color: #DDDDDD;
    margin: auto;
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