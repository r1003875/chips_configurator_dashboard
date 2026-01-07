<script setup>
    import { useRouter } from 'vue-router'
    import { ref } from 'vue';
    
    const CONFIG_URL = import.meta.env.VITE_CONFIG_URL;

    const router = useRouter()

    const logout = () => {
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('userId')

        router.push({ name: 'Login' })
    }
    const token = sessionStorage.getItem('token');
    const configuratorLink = ref(`${CONFIG_URL}?token=${token}`)
</script>
  
<template>
    <nav>
        <h1>Chips Configurator</h1>
        <div class="btn_container">
            <div class="btn secondary_btn"><a id="configurator-link" :href="configuratorLink">Make your own bag</a></div>
            <div @click="logout" class="btn">Log out ></div>
        </div>
    </nav>
</template>

<style scoped>
    .btn_container{
        display: flex;
        gap: 1rem;
    }
    .secondary_btn{
        background-color: #08a155;
        color: #ffffff;
    }
    .secondary_btn:hover{
        background-color: #0c9658;
        color: #ffffff;
    }
    a{
        text-decoration: none;
        color: inherit;
    }
</style>