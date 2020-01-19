<template>
    <div>
        <h2 class="title">Mon parcours professionnel</h2>
        <BackgroundItem v-for="item in items" :key="item.title" v-bind="item" v-item="item"/>
    </div>
</template>

<script>
    import list from "../assets/BackgroundList.js";
    import BackgroundItem from "./BackgroundItem";

    export default {
        name: "BackgroundList",
        components: {BackgroundItem},
        data() {
            return {
                items: list
            }
        }
    }
</script>

<style scoped>
    .title {
        color: black;
        padding: 30px 30px 0;
    }
</style>