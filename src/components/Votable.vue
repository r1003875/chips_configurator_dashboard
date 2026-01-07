<script setup>
    import { defineProps, onMounted, ref } from 'vue';

    const API_URL = import.meta.env.VITE_API_URL

    const props = defineProps({
        submission: {
            type: Object,
            required: true
        },
        hasAlreadyVoted: {
            type: Boolean,
            required: true
        }
    });

    const justVoted = ref(false);
    const emit = defineEmits(['vote']);

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
            <p>Flavours: {{ submission.keyFlavours }}</p>
        </div>
        <div class="votes">
            <p>Votes: {{ votes }}</p>
        </div>
        <button @click.prevent="emit('vote', submission._id); votes++; justVoted = true;" :class="{ voted: hasAlreadyVoted || justVoted }" :disabled="hasAlreadyVoted || justVoted" class="vote_btn" title="Vote for this submission?">{{ hasAlreadyVoted || justVoted ? 'You already voted ✔' : 'Vote' }}</button>
    </div>
</template>

<style scoped>
    .vote_btn {
        background-color: #f8e503;
        border: none;
        padding: 0.5rem 1rem;
        font-size: 0.9rem;
        cursor: pointer;
        border-radius: 4px;
        color: black;
        font-weight: bold;
        margin-top: 1rem;
        text-align: center;
    }

    .vote_btn:hover {
        background-color: #d4b703;
    }

    .vote_btn.voted {
        background-color: #adadad;
        border: none;
        padding: 0.5rem 1rem;
        font-size: 0.9rem;
        cursor: pointer;
        border-radius: 4px;
        color: white;
        font-weight: bold;
        margin-top: 1rem;
        text-align: center;
        cursor: not-allowed;
    }

    .vote_btn.voted:hover {
        background-color: #969696;
    }
</style>