<script setup>
    import Submission from './Submission.vue';
    import {onMounted, reactive, ref} from 'vue';

    let submissions = reactive([]);
    const API_URL = import.meta.env.VITE_API_URL

    onMounted(async() => {
    // Fetch initial chat messages or perform setup
    const response = await fetch(`${API_URL}/bags`);
    const data = await response.json();
    submissions.push(...data.data.bags);
    submissions.reverse();
    });

    async function removeSubmission(id) {
        try {
            const response = await fetch(`${API_URL}/bags/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const json = await response.json();

            if (json.status === 'success') {
                console.log('Submission removed successfully');
                // Update local submissions array
                const index = submissions.findIndex(submission => submission._id === id);
                if (index !== -1) {
                    submissions.splice(index, 1);
                }
            } else {
                console.error('Failed to remove submission:', json.message);
            }
        }
        catch(error){
            console.error('Error during submission removal:', error);
        }
    }
</script>

<template>
    <h2>Admin Dashboard</h2>
    <div class="submissions">
        <!-- Submission items will go here -->
        <Submission 
            v-for="submission in submissions"
            :key="submission.id"
            :submission="submission"
            @removeSubmission="removeSubmission"
        />
    </div>
</template>

<style scoped>

</style>