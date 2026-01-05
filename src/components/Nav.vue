<script setup>
    import { useRouter } from 'vue-router'

    const router = useRouter()

    const logout = () => {

    sessionStorage.removeItem('token')
    sessionStorage.removeItem('userId')

    router.push({ name: 'Login' })
}
</script>
  
<template>
    <nav>
        <h1>Chips Configurator</h1>
        <div @click="logout" class="btn">Log out ></div>
    </nav>
</template>

<style scoped>

</style>