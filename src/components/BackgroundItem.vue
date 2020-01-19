<template>
    <div class="card">
        <div class="container">
            <p class="header">
                <span class="title_job">{{title}} </span>
                <span class="date">{{period[0]}} - {{period[1]}}</span>
            </p>
            <p class="resume" v-for="prev of preview" :key="prev">{{prev}}</p>
        </div>
        <div class="options">
            <img class="img" :src="img" />
            <a class="link" v-if="report" :href="report">
                <img height="30" width="30" src="/static/report.svg">
            </a>
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
            period: String,
            report: String,
        },
    }
</script>

<style scoped>
    .card {
        max-height: 400px;
        display: flex;
        background-color: white;
        padding: 30px;
    }
    .card:nth-child(odd) {
        flex-direction: row-reverse;
        background-color: #fafafa;
    }
    .container {
        flex: 2;
        transition: flex 250ms;
    }
    .options {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        flex: 1;
    }
    .header {
        padding: 0 0 1px 0;
        border-bottom: 1px solid grey;
    }
    .title_job {
        font-size: 20px;
        font-weight: bold;
    }
    .date {
        font-size: 14px;
        float: right;
    }
    .img {
        height: 100%;
        width: 100%;
        object-fit: contain;
        padding: 30px;
    }
    .link {
        margin-top: 10px;
        float: right;
    }
    .resume {
        font-size: 13px;
    }
    @media only screen and (max-width: 600px) {
        .card {
            flex-direction: column-reverse !important;
            max-height: unset;
        }
    }
</style>