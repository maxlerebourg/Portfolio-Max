<template>
    <ul class="home">
        <li id="home">
            <Home/>
        </li>
        <li id="navbar">
            <NavBar/>
        </li>
        <li id="preview">
            <Preview class="section"/>
        </li>
        <li id="skill">
            <Skill class="section"/>
        </li>
        <li id="project">
            <ProjectList class="section"/>
        </li>
        <li id="experience">
            <BackgroundList/>
        </li>
    </ul>
</template>

<script>
    // @ is an alias to /src
    import Home from '@/components/Home.vue'
    import NavBar from '@/components/NavBar.vue'
    import Preview from '@/components/Preview.vue'
    import Skill from '@/components/Skill.vue'
    import ProjectList from '@/components/ProjectList.vue'
    import BackgroundList from '@/components/BackgroundList.vue'

    export default {
        name: 'home',
        components: {
            Home,
            NavBar,
            BackgroundList,
            Preview,
            ProjectList,
            Skill,
        }
    }
</script>
<style>
    li {
        position: relative;
    }

    .section {
        padding: 30px;
        margin: auto;
    }

    #navbar {
        background-color: rgba(255, 255, 255, .2);
        margin-top: -38px;
        z-index: 3;
        top: 0;
        position: sticky;
    }
    #preview {
        background-color: #079992;
    }

    #skill {
        background-color: #eee;
    }

    #project {
        background-color: #eee;
        min-height: 100vh;
    }

    #experience {
        background-color: #fff;
    }

    @media only screen and (max-width: 600px) {
        .section {
            padding: 30px 3%;
        }

        .title_fs {
            width: 100%;
            color: black;
        }

        .tab {
            width: 100%;
        }

        #project {
            background-image: none;
        }
        #navbar {
            margin-top: -76px;
        }
    }

    @media only screen and (min-width: 600px) {
        #project {
            background-image: url('/static/blured.jpg');
            background-size: cover;
        }
    }
</style>