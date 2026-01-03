<script setup>
    import Submission from './Submission.vue';
    import {onMounted, reactive, ref} from 'vue';

    let submissions = reactive([]);

    onMounted(async() => {
    // Fetch initial chat messages or perform setup
    const response = await fetch('http://localhost:3000/api/v1/bags');
    const data = await response.json();
    console.log(data.data.bags);
    submissions.push(...data.data.bags);
    submissions.reverse();
    console.log(submissions);
    });
</script>

<template>
    <h2>Submissions</h2>
    <div class="submissions">
        <!-- Submission items will go here -->
        <Submission 
            v-for="submission in submissions"
            :key="submission.id"
            :submission="submission"
        />
    </div>
</template>

<style scoped>

</style>