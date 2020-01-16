<template>
    <div class="container">
        <canvas id="background">
        </canvas>
        <h2 class="title title_fs">Ce que j'ai utilisé</h2>
        <div class="framework" v-for="item in fw" :key="item.name">
            <div v-if="item.framework">
                <p>
                    <b>{{item.name}}</b><br>
                    <span>{{item.exp / 12 >= 1 ? `${item.exp / 12} ans` : `${item.exp} mois`}} d'experience</span>
                </p>
                <img :src="item.logo" :alt="`${item.name} logo`"/>
            </div>
        </div>
        <br clear="all">
        <h2 class="title title_fs">Les langages utilisés</h2>
        <div class="language" v-for="item in lg" :key="item.name">
            <div v-if="item.language">
                <p>
                    <b>{{item.name}}</b><br>
                    <span>{{item.exp / 12 >= 1 ? `${item.exp / 12} ans` : `${item.exp} mois`}} d'experience</span>
                </p>
                <img :src="item.logo" :alt="`${item.name} logo`"/>
            </div>
        </div>
        <br clear="all">
    </div>
</template>

<script>
    import Particles from 'particlesjs'
    import list from '../assets/TechnoList.js';

    export default {
        name: "Skill",
        data: function () {
            let language = [], framework = [];
            for (let item in list) {
                if (list[item].language) language.push(list[item]);
                if (list[item].framework) framework.push(list[item]);
            }
            return {
                fw: framework.sort((a, b) => a.exp < b.exp),
                lg: language.sort((a, b) => a.exp < b.exp)
            }
        },
        mounted() {
            setTimeout(() => Particles.init({
                selector: '#background',
                color: '#ff5e57',
            }), 1);
        }
    }

</script>

<style scoped>
    h2 {
        color: black;
    }

    .container {
        position: relative;
    }
    #background {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
    }

    .framework, .language {
        float: left;
        width: 20%;
        max-height: 200px;
        text-align: center;
    }

    span {
        font-size: 12px;
    }

    img {
        margin: auto;
        width: 50%;
        max-height: 100px;
        object-fit: contain;
    }

    @media only screen and (max-width: 600px) {
        .framework, .language {
            width: 33%;
        }
    }
</style>