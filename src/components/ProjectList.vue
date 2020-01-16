<template>
    <div>
        <h2 class="title title_fs">Mes projets</h2>
        <div class="projectGrid">
            <ProjectItem v-for="item in items" :key="item.title" v-bind="item" />
        </div>
        <br clear="all"/>
    </div>
</template>

<script>
    import list from "../assets/ProjectList.js";
    import ProjectItem from "./ProjectItem";

    export default {
        name: "ProjectList",
        components: {
            ProjectItem,
        },
        data() {
            return {
                items: list,
                game: {},
            }
        },
        methods: {
            toggle(title) {
                this.game[title] = !this.game[title];
                for (const project of list) {
                    if (project.router && project.title !== title) this.game[project.title] = false;
                }
            }
        },
        mounted() {
            const game = {};
            for (const project of list) {
                if (project.router) game[project.title] = false;
            }
            this.game = game;
        }
    }
</script>

<style scoped>
    button {
        border:none;
        padding: 0;
        border-radius: 5px;
    }
    .projectGrid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 1rem;
        grid-auto-flow: dense;
        grid-auto-rows: 30vh;
    }
    .title {
        margin-bottom: 10px;
    }
    @media only screen and (max-width: 600px) {
        .projectGrid {
            grid-template-columns: 1fr;
        }
    }
</style>