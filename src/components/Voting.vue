<script setup>
    import Nav from './Nav.vue';
    import { onMounted, reactive, ref } from 'vue';
    import Votable from './Votable.vue';

    let submissions = reactive([]);
    let hasVoted = ref(false);

    onMounted(async() => {
        const response = await fetch('http://localhost:3000/api/v1/bags');
        const data = await response.json();
        submissions.push(...data.data.bags);
        submissions.reverse();
        const voteResponse = await fetch(`http://localhost:3000/api/v1/votes/?user=${sessionStorage.getItem('userId')}`);
        const voteData = await voteResponse.json();
        if (voteData.status === 'success' && voteData.data.votes.length > 0) {
            hasVoted.value = true;
        }
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
            :hasAlreadyVoted="hasVoted"
        />
    </div>
</template>

<style scoped>

</style>