<template>
    <div>
        <div class="center">
            <p id="score">Generation: 0 - Average score: 0 - Hightest score: 0</p>
            <div id="matterJS"></div>
        </div>
    </div>
</template>

<script>
    import Matter from 'matter-js'
    import Neataptic from 'neataptic'

    export default {
        name: "FlappyIA",
        components: {},
        mounted() {
            class Player{
                constructor(user, group, brain) {
                    this.user = user;
                    this.brain = {};
                    if (brain) {
                        this.brain = brain;
                    }
                    this.brain.score = 0;
                    this.body = Bodies.circle(150, config.height / 2, config.bird_width, {
                        render: {
                            fillStyle: config.bird_color,
                            sprite: {
                                texture: '/static/game/flappy.png',
                                xScale: .4,
                                yScale: .4,
                            }
                        },
                        id: Math.floor(Math.random() * 1000),
                        alive: true,
                        collisionFilter: {
                            group: group,
                        },
                    });
                }
                jump() {
                    Body.setVelocity(this.body, {x: 0, y: config.jump_force});
                }

                getData() {
                    if (this.body.position.y > config.height || this.body.position.y < 0)
                        this.body.alive = false;
                    if (!this.body.alive && this.user){
                        start();
                        return;
                    }
                    //console.log(this.body.alive + ' ' + this.brain.score);

                    this.brain.score++;

                    let minWidth = 1000;
                    let height = 0;
                    // eslint-disable-next-line no-unused-vars
                    let posY = 0, x, y;
                    pipes.map((pipe) => {
                        if (this.user && pipe.position.x < 100 && pipe.alive){
                            pipe.alive = false;
                            if (this.user){
                                document.getElementById("score").innerHTML = this.brain.score;
                            }
                        }
                        if (pipe.alive && minWidth > pipe.position.x - this.body.position.x && pipe.position.x + config.pipe_width - this.body.position.x > 0){
                            minWidth = pipe.position.x - this.body.position.x;
                            height = config.height - this.body.position.y - pipe.posY;
                            posY = pipe.posY;
                            x = pipe.position.x;
                            y = pipe.position.y;
                        }
                    });
                    return [minWidth, height];//, this.body.position.x, this.body.position.y, x, y, posY];

                }

                ia() {
                    if (this.body.alive) {
                        let output = this.brain.activate(this.getData());
                        if (output > .5) this.jump();
                    }
                }
            }
            let config = {
                width: 600,
                height: 400,

                bird_width: 30,
                bird_height: 30,
                bird_density: 0.06,
                bird_color: '#FF0',

                jump_force: -8,

                sky_color: '#77b5fe',
                ground_color: '#555',
                pipe_color: '#050',

                pipe_space: 100,
                pipe_width: 100,

            };

            let Engine = Matter.Engine,
                Render = Matter.Render,
                Runner = Matter.Runner,
                Body = Matter.Body,
                Events = Matter.Events,
                World = Matter.World,
                Bodies = Matter.Bodies;

// create engine
            let engine = Engine.create(),
                world = engine.world;


// create renderer
            let render = Render.create({
                element: document.getElementById('matterJS'),
                engine: engine,
                options: {
                    width: config.width,
                    height: config.height,
                    wireframes: false,
                    showAngleIndicator: false,
                    background: '/static/game/background.png'
                }
            });
            setTimeout(function () {
                Render.run(render);
            }, 500);


// create runner
            let runner = Runner.create();
            Runner.run(runner, engine);

            let pop = [],
                pipes = [],
                intervalWalls = null,
                intervalGame = null,
                neat = null,
                hightestScore = null;

            let group = Body.nextGroup(true);


            let createWalls = () => {
                const posY = Math.floor(Math.random() * (config.height - 250) + 125);
                //console.log(Math.floor((posY + config.pipe_space / 2) / 2) + ' '+Math.floor((config.height - posY + config.pipe_space / 2) / 2))

                const h1 = config.height - posY - config.pipe_space;
                const h2 = posY  - config.pipe_space;

                const y1 = h1 / 2;
                const y2 = config.height - h2 / 2;

                pipes.push(Bodies.rectangle(
                    config.width,
                    y1,
                    config.pipe_width,
                    h1, {
                        render: {
                            fillStyle: config.pipe_color,
                            sprite: {
                                texture: '/static/game/pipeT.png',
                                yOffset: .35,
                            }
                        },
                        isStatic: true,
                        id: Math.floor(Math.random() * 1000) + 10000,
                        alive: true,
                        posY: posY,
                    }));
                pipes.push(Bodies.rectangle(
                    config.width,
                    y2,
                    config.pipe_width,
                    h2, {
                        render: {
                            fillStyle: config.pipe_color,
                            sprite: {
                                texture: '/static/game/pipeM.png',
                                yOffset: - 0.35,
                            }
                        },
                        isStatic: true,
                        id: Math.floor(Math.random() * 1000) + 10000,
                        alive: false,
                    }));
                World.add(world, pipes);
            };
            let ia = () => {
                let i = false;
                //console.log(pop[1].getData());
                pop.map(el => {
                    el.ia();
                    el.body.alive ? i = true : null;
                });
                if (!i) iaEnd();
            };

            let moveWalls = () => {
                pipes.map((pipe) => {
                    if (pipe.position.x < 0){
                        World.remove(world, pipe);
                    }
                    if (pipe.position.x < -20){
                        pipes.splice(pipe, 1);
                    }
                    Body.translate(pipe, {x: -3, y: 0})
                });
            };
            Events.on(engine, 'tick', moveWalls);
//setInterval(moveWalls,1000);
            Events.on(engine, 'collisionStart', function(e) {
                let pairs = e.pairs;
                for (let pair of pairs) {
                    if (pair.bodyA.id < 1000 && pair.bodyB.id > 10000){
                        pair.bodyA.alive = false;
                    }
                    if (pair.bodyB.id < 1000 && pair.bodyA.id > 10000){
                        pair.bodyB.alive = false;
                    }
                }
            });


            /*let player = () => {
                bird = new Player(true, group, null);

                clearInterval(intervalGame);
                intervalGame = setInterval(() =>{console.log(bird.getData());},10);

                bird.body.isStatic = true;
                setTimeout(() => {bird.body.isStatic = false;}, 4000);

                World.add(world, bird.body);
                document.onkeydown = function (e) {
                    switch (e.code) {
                        case "ArrowUp":
                            bird.jump();
                            break;
                        case "ArrowLeft":
                            Runner.stop(runner);
                            clearInterval(intervalGame);
                            clearInterval(intervalWalls);
                            break;
                        case "ArrowRight":
                            Runner.start(runner, engine);
                            intervalGame = setInterval(() =>{console.log(bird.getData());},10);
                            intervalWalls = setInterval(createWalls, 4500);
                            break;
                    }
                };
            };*/
//Controle of the player
            let running = true;
            document.onkeydown = function (e) {
                switch (e.code) {
                    case "ArrowLeft":
                        if (running){
                            running = !running;
                            Runner.stop(runner);
                            clearTimeout(intervalGame);
                            clearInterval(intervalGame);
                            clearInterval(intervalWalls);
                        } else {
                            running = !running;
                            Runner.start(runner, engine);
                            clearTimeout(intervalGame);
                            clearInterval(intervalGame);
                            clearInterval(intervalWalls);
                            intervalGame = setInterval(ia, 50);
                            intervalWalls = setInterval(createWalls, 2500);
                        }
                        break;
                }
            };

            let start = () => {
                World.clear(world);

                pipes = [];
                clearInterval(intervalWalls);
                intervalWalls = setInterval(createWalls, 2500);


                World.add(world, [
                    //Start Limite du terrain
                    Bodies.rectangle(config.width / 2, -25, config.width, 60, {
                        isStatic: true,
                        id: Math.floor(Math.random() * 1000) + 10000,
                        render: {
                            visible: false,
                            fillStyle: config.ground_color,
                        },
                    }),
                    Bodies.rectangle(config.width / 2, config.height + 25, config.width, 60, {
                        isStatic: true,
                        id: Math.floor(Math.random() * 1000) + 10000,
                        render: {
                            visible: false,
                            fillStyle: config.ground_color,
                        },
                    }),
                    //Fin Limite du terrain
                ]);


                //player();

            };
            let iaInit = () => {
                neat = new Neataptic.Neat(2, 1,
                    {
                        mutation: Neataptic.methods.mutation.ALL,
                        popsize: 10,
                        elitism: Math.round(0.2 * 10),
                        network: new Neataptic.architect.Random(2, 6, 1)
                    }
                );
                iaStart();
            };

            let iaStart = () => {
                start();
                pop = [];
                for(let genome of neat.population){
                    //genome = neat.population[genome];
                    let birdo = new Player(false, group, genome);

                    birdo.body.isStatic = true;
                    setTimeout(() => {
                        birdo.body.isStatic = false;
                        Body.setVelocity(birdo.body, {x: 0, y: Math.random() * - 10 + 5})
                    }, 3000);
                    pop.push(birdo);


                }
                intervalGame = setTimeout(() => {
                    intervalGame = setInterval(ia, 50);
                }, 3000);
                World.add(world, pop.map(el => {return el.body}));

            };
            let iaEnd = () => {
                clearInterval(intervalGame);
                neat.sort();
                pop.map(el => {hightestScore < el.brain.score ? hightestScore = el.brain.score: null;});


                document.getElementById('score').innerHTML = `Generation: ${neat.generation} - Average score: ${neat.getAverage()} - Hightest score: ${hightestScore}`;


                hightestScore = 0;

                pop = [];


                let newPopulation = [];

                // Elitism
                for(let i = 0; i < neat.elitism; i++){
                    newPopulation.push(neat.population[i]);
                }

                // Breed the next individuals
                for(let i = 0; i < neat.popsize - neat.elitism; i++){
                    newPopulation.push(neat.getOffspring());
                }

                // Replace the old population with the new population
                neat.population = newPopulation;
                neat.mutate();

                neat.generation++;
                iaStart();
            };

            start();
            iaInit();
        }
    }
</script>
<style scoped>
    .center {
        text-align: center;
    }
    #score {
        font-weight: bold;
    }
</style>