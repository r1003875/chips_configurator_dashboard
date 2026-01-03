<script setup>
    import { defineProps } from 'vue';

    const props = defineProps({
        submission: {
            type: Object,
            required: true
        }
    });

    const emit = defineEmits(['removeSubmission']);
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
            <p>Bag Color: <span :style="{ color: submission.color }">{{ submission.color }}</span></p>
            <p>Font: {{ submission.font }}</p>
            <p>Flavours: {{ submission.keyFlavours }}</p>
            <p>User_id: {{ submission.user }}</p>
        </div>
        <div @click.prevent="emit('removeSubmission', submission._id)" class="remove_btn" title="Remove submission?">Remove</div>
    </div>
</template>

<style scoped>

</style>