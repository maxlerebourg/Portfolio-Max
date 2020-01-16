<template>
    <div class="card" :style="`background-image: url(${img})`">
        <div class="container">
            <div class="header_container">
                <h3>{{title}}</h3>
            </div>
            <div class="body_container">
                <p>{{preview}}</p>
            </div>
            <div class="footer_container">
                <i v-for="tech in techno" :key="tech.name">{{tech.name}} </i>
                <div class="icons">
                    <a class="link" v-if="github" :href="github">
                        <img src="/static/github.svg" height="20px" width="20px"/>
                    </a>
                    <a class="link" v-if="link" :href="link">
                        <img src="/static/link.svg" height="20px" width="20px"/>
                    </a>
                    <router-link class="link" :to="router" v-if="router">
                        <img src="/static/link.svg" height="20px" width="20px"/>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ProjectItem",
        props: {
            img: String,
            title: String,
            preview: String,
            techno: String,
            github: String,
            link: String,
            router: String,
        }
    }
</script>

<style scoped>
    a, p, i {
        color: lightgrey;
        margin: 0;
    }

    h3 {
        color: white;
        margin: 0;
    }

    .card {
        position: relative;
        overflow: hidden;
        text-align: left;
        width: 100%;
        border-radius: 4px;
        background-size: cover;
        background-position: center;
        padding-top: 22vh;
        box-shadow: 1px 1px 5px #222;
        transition: padding-top 250ms;
    }

    .card:hover {
        padding-top: 0;
    }

    .container {
        background-color: rgba(0, 0, 0, .6);
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        position: absolute;
    }

    .header_container {
        padding: 10px;
    }

    .body_container {
        flex: 1;
        padding: 0 10px;
    }

    .footer_container {
        font-size: 11px;
        font-weight: bold;
        padding: 10px;
    }

    .icons {
        float: right;
        margin: -5px 15px 0 0;
    }

    .link {
        text-align: end;
        margin: 0 5px;
    }

    @media only screen and (max-width: 600px) {
        .card {
            padding-top: 0;
        }
    }
</style>