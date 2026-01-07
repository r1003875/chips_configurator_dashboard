<script setup>
    import { defineProps, ref, onMounted } from 'vue';

    const API_URL = import.meta.env.VITE_API_URL

    const props = defineProps({
        submission: {
            type: Object,
            required: true
        }
    });

    const emit = defineEmits(['removeSubmission']);
    const votes = ref(0);
    onMounted(async() => {
        try {
            const response = await fetch(`${API_URL}/votes?bag=${props.submission._id}`);
            const data = await response.json();

            if (data.status === 'success') {
                votes.value = data.data.votes.length;
            } else {
                console.error('Failed to fetch votes:', data.message);
            }
        }
        catch(error){
            console.error('Error fetching votes:', error);
        }
    });
</script>

<template>
    <div class="submission">
        <div>
            <h3>{{ submission.name }}</h3>
            <h4>Details:</h4>
            <div>
                <p>Image:</p>
                <img :src="submission.image" alt="chips image" width="200" />
            </div>
            <p>Bag Color: {{ submission.color }}<div class="color_display" :style="{ backgroundColor: submission.color }"></div></p>
            <p>Font: {{ submission.font }}</p>
            <p>Flavours: {{ submission.keyFlavours }}</p>
            <p>User_id: {{ submission.user }}</p>
        </div>
            <div class="votes">
            <p>Votes: {{ votes }}</p>
        </div>
        <div @click.prevent="emit('removeSubmission', submission._id)" class="remove_btn" title="Remove submission?">Remove</div>
    </div>
</template>

<style scoped>

</style>