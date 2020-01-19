import tech from './TechnoList'

export default [{
        img: '/static/project/alcodico.png',
        title: 'AlcoDico',
        preview: 'Application mobile qui présente les règles de divers jeux d\'alcool.',
        techno: [tech['rn'], tech['node'], tech['hapi']],
        github: 'https://github.com/maxlerebourg/AlcoloDicoServer',
        link: 'https://play.google.com/store/apps/details?id=com.alcolodico'
    }, {
        img: '/static/project/cuberace.jpg',
        title: 'Cube Race',
        preview: 'Jeu sur navigateur en JavaScript avec une implémentation de l\'algorithme A*.',
        techno: [tech['js'], tech['matter']],
        github: 'https://github.com/maxlerebourg/Cube-Race',
        router: '/cube_race'
    }, {
        img: '/static/project/metro.jpg',
        title: 'Horaires Metro',
        preview: 'Projet personnel pour avoir les horaires en temps réel des metros parisiens grâce au service web de la RATP.',
        techno: [tech['js'], tech['leaflet']],
        github: 'https://github.com/maxlerebourg/HoraireMetro',
        router: '/metro'
    }, {
        img: '/static/project/flappy.png',
        title: 'FlappyIA',
        preview: 'Jeu sur navigateur en JavaScript avec une utilisation de la librarie TensorFlowJs pour y rajouter une IA qui apprend à jouer à FlappyBird.',
        techno: [tech['js'], tech['matter']],
        github: 'https://github.com/maxlerebourg/FlappyAI',
        router: '/flappy_ia',
    }, {
        img: '/static/project/pmm.png',
        title: 'PlayMyMusic',
        preview: 'Application mobile écrite en Java pour permettre de créer des playlist collaboratives.',
        techno: [tech['java'],tech['php']]
    }, {
        img: '/static/project/dtre.png',
        title: 'Oeil de la DTRE',
        preview: "Un projet Domotique qui permet de diffuser un stream et des données de capteurs sur internet via une API." +
            "Ce projet réuni un site web, une application mobile et un serveur sur une raspberry.",
        techno: [tech['java'], tech['symfony'], tech['php'], tech['socket']],
        github: 'https://github.com/mathieuHa/pst3oeildtre',
    }, {
        img: '/static/project/trafficRacer.jpg',
        title: 'Traffic Racer',
        preview: 'Projet de 3eme année à l\'ESIEA utilisant la SDL 1.2 et possède un mode automatique pour aller le plus loin possible.',
        techno: [tech['c'], tech['sdl']],
        github: 'https://github.com/maxlerebourg/TrafficRacer',
    }, {
        img: '/static/project/tower.jpg',
        title: 'Tower Defense',
        preview: 'Projet de 2eme année à l\'ESIEA utilisant la SDL 2.',
        techno: [tech['c'], tech['sdl']],
        link: 'https://drive.google.com/open?id=0B9Aej6aDANqCd05GcTFYQVNKTW8',
    }, {
        img: '/static/project/ocr.jpg',
        title: 'OCR',
        preview: 'Projet scolaire thailandais, fait en une semaine. Un OCR (lecture du texte sur une image) par comparaison de pixel grâce à OpenGL.',
        techno: [tech['java']],
    },
]