<template>
    <div>
        <div class="navbar">
            <router-link to="/">Home</router-link>
        </div>
        <div class="about">
            <h1>This is an about page</h1>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'about',
        mounted() {
            console.log('mounted')
        }
    }
</script>
<style scoped>
    .about {
        background-color: #079992;
        height: 100vh;
    }
    .navbar {
         background-color: #1e272e;
         width: 100%;
         height: auto;
         text-align: center;
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