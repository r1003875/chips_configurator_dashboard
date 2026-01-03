<script setup>
    import { useRouter } from 'vue-router'

    const router = useRouter()

    const logout = () => {

    sessionStorage.removeItem('token')

    router.push({ name: 'Login' })
}
</script>
  
<template>
    <nav>
        <h1>Chips Configurator Dashboard</h1>
        <div @click="logout" class="btn">Log out ></div>
    </nav>
</template>

<style scoped>

</style>