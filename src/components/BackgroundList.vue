<template>
    <div class="tab">
        <h2 class="title">Mon parcours professionnel</h2>
        <ul>
            <li v-for="item in items" :key="item.title">
                <BackgroundItem v-bind="item" v-item="item"/>
            </li>
        </ul>
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
    .tab {
        width: 100%
    }
</style>