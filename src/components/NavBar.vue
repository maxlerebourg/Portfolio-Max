<template>
    <div class="navbar">
        <div class="navbar_items">
            <a href="#preview" title="Présentation">Présentation</a>
            <a href="#skill" title="Compétences">Compétences</a>
            <a href="#project" title="Projets">Projets</a>
            <a href="#experience" title="Experiences Professionnelles">Parcours</a>
            <a href="https://github.com/maxlerebourg" title="GitHub" target="_blank">GitHub</a>
        </div>
    </div>
</template>

<script>
    export default {
        name: "NavBar"
    }
</script>

<style scoped>
    .navbar {
        width: 100%;
        text-align: right;
    }
    a {
        display: inline-block;
        color: black;
        text-decoration: none;
        padding: 10px;
        font-weight: bold;
    }
    a:hover {
        background-color: rgba(255, 255, 255, .5);
        border-radius: 10px;
    }
</style>