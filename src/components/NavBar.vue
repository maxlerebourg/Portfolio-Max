<template>
    <div class="navbar">
        <div class="navbar_items">
            <a href="#preview" title="Présentation">Présentation</a>
            <a href="#skill" title="Compétences">Compétences</a>
            <a href="#project" title="Projets">Projets</a>
            <a href="#experience" title="Experiences Professionnelles">Experiences Professionnelles</a>
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