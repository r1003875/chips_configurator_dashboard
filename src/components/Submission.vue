<script setup>
    import { defineProps } from 'vue';

    const props = defineProps({
        submission: {
            type: Object,
            required: true
        }
    });
</script>

<template>
    <div class="submission">
        <div>
            <h3>{{ submission.name }}</h3>
            <h4>Details:</h4>
            <p>Image: {{ submission.image }}</p>
            <p>Color: {{ submission.color }}</p>
            <p>Font: {{ submission.font }}</p>
            <p>Image_URL: {{ submission.image }}</p>
            <p>Flavours: {{ submission.keyFlavours }}</p>
        </div>
        <div class="remove_btn">Remove</div>
    </div>
</template>

<style scoped>

</style>