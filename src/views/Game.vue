<template>
    <div>
        <div class="navbar">
            <router-link to="/">Home</router-link>
        </div>
        <div class="game" v-if="name === 'flappy_ia'">
            <FlappyIA/>
        </div>
        <div class="game" v-if="name === 'cube_race'">
            <CubeRace/>
        </div>
    </div>
</template>

<script>
    import FlappyIA from "../components/game/FlappyIA";
    import CubeRace from "../components/game/CubeRace";

    export default {
        name: "Game",
        components: {
            CubeRace,
            FlappyIA
        },
        props: {
            name: String
        }
    }
</script>

<style scoped>
    .navbar {
        background-color: #1e272e;
        width: 100%;
        height: auto;
        text-align: center;
    }
    .game {
        background-image: url('/static/blured.jpg');
        background-repeat: no-repeat;
        background-size: cover;
        height: calc(100vh - 38px);
        padding: 5px;
    }
    a {
        display: inline-block;
        color: white;
        text-decoration: none;
        padding: 10px;
        font-weight: bold;
    }
    a:hover {
        background-color: #111;
    }
</style>