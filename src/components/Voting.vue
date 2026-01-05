<script setup>
    import Nav from './Nav.vue';
    import { onMounted, reactive } from 'vue';
    import Votable from './Votable.vue';

    let submissions = reactive([]);

    onMounted(async() => {
        const response = await fetch('http://localhost:3000/api/v1/bags');
        const data = await response.json();
        submissions.push(...data.data.bags);
        submissions.reverse();
    });

    async function handleVote(bag_id) {
        try {
            const response = await fetch(`http://localhost:3000/api/v1/votes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ user: sessionStorage.getItem('userId'), bag: bag_id })
            });

            const json = await response.json();

            if (json.status === 'success') {
                console.log('Vote cast successfully');
            } else {
                console.error('Failed to cast vote:', json.message);
            }
        }
        catch(error){
            console.error('Error during voting:', error);
        }
    }
/*
    const hasVoted = ref(false)
    const votedBagId = ref(null)

    onMounted(async () => {
    const res = await fetch('http://localhost:3000/api/v1/votes/me', {
        headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
    const data = await res.json()

    hasVoted.value = data.hasVoted
    votedBagId.value = data.bagId
    })*/
</script>

<template>
    <Nav />
    <h2>Voting Page</h2>
    <p>Welcome to the voting page. Here you can cast your vote!</p>
    <div class="submissions">
        <Votable 
            v-for="submission in submissions"
            :key="submission.id"
            :submission="submission"
            @vote="handleVote"
        />
    </div>
</template>

<style scoped>

</style>