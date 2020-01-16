<template>
    <div class="card">
        <div>
            <p class="header_container">
                <span class="title_job">{{title}} </span>
                <span class="date">{{period[0]}} - {{period[1]}}</span>
            </p>
        </div>
        <div class="options">
            <img class="img" :src="img" />
            <a class="link" v-if="report" :href="report">
                <img height="30" width="30" src="/static/report.svg">
            </a>
        </div>
        <p class="resume" v-for="prev of preview" :key="prev">{{prev}}</p>
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
        background-color: white;
        padding: 5px 2%;
        border-radius: 10px;
        margin: 10px auto;
    }
    .header_container {
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
    .options {
        float: right;
        height: 100%;
        width: 30%;
        margin: 10px;
    }
    .img {
        height: 90%;
        width: 100%;
    }
    .link {
        margin-top: 10px;
        float: right;
    }
    .resume {
        font-size: 13px;
    }
    @media only screen and (max-width: 600px) {
        .options {width: 90%;}
    }
</style>