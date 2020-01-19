<template>
    <div class="container">
        <h2 class="title name">Max Lerebourg, {{((new Date() - new Date(1996,7,30)) / 31536000000).toFixed()}} ans</h2>
        <h3 class="title job">Développeur Mobile & Web Full-Stack en region parisienne</h3>
        <p>
            Diplômé de l’<a href="https://www.esiea.fr" title="ESIEA : Ecole d'ingénieurs du monde numérique ">ESIEA</a>,
            je suis passionné d'informatique.
            J’apprécie d’aller toujours plus loin dans les projets que je dois effectuer.
            Depuis le début de ma scolarité, j’ai acquis de nombreuses <a href="#skill"
                                                                          title="Voir mes compétences">
            connaissances</a> en C et en Java pour le développement d'applications et de jeux.
            J'ai travaillé sur plusieurs projets personnels avec des Raspberry Pi, j'ai notamment appris à mettre en
            place des bases de données
            et à administrer un serveur Web.<br>
            <br>

            <br>
            J'ai effectué mon deuxième semestre de 4ème année à
            l'<a href="http://global.kmutt.ac.th/" title="Université KMUTT de Bangkok">Université KMUTT</a> de
            Bangkok en Thailande.
            J'ai suivi des cours de réseaux neuronnaux, de génie logiciel, de datamining, d'imagerie digitale et de
            communication pour démarrer son projet. <br>

            <br>
            Ce portfolio a pour but de présenter les différents projets sur lesquels j'ai travaillé ces dernières
            années. Vous pouvez également visualiser mon CV et le télécharger.<br>
            <br>

            <br><br>
            <a class="cv" href="https://drive.google.com/open?id=1ENBtUurWFjJclOUK1thimSRtGMYa6s6q">Télécharger mon CV</a><br>

        </p>
    </div>
</template>

<script>
    export default {
        name: "Preview"
    }
</script>

<style scoped>
    p {
        color: white;
    }

    a {
        text-decoration: none;
        color: #f6b93b;
        font-weight: bold;
    }
    .container {
        width: 60%;
        padding: 50px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .name {
        font-size: 24px;
        line-height: 30px;
        font-weight: 400;
        margin: 0 0 5px 0;
        width: 100%;
    }

    .job {
        font-size: 24px;
        line-height: 30px;
        font-weight: 600;
        margin: 5px 0 20px;
        width: 100%;
    }

    .cv {
        color: white;
        font-size: 16px;
        font-family: 'Open Sans', sans-serif;
        font-weight: 700;
        background: #808e9b;
        padding: 16px 22px;
        margin: 1px;
        transition: background 250ms, box-shadow 250ms;
    }

    .cv:hover {
        text-decoration: none;
        background: #485460;
        font-weight: bold;
        box-shadow: 1px 1px 5px #485460;
    }

    @media only screen and (max-width: 600px) {
        .container {
            width: 95%;
            padding: 50px 0;
        }
    }
</style>