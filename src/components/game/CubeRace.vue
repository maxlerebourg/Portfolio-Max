<template>
	<div class="center">
		<div id="matterJS">
		</div>
	</div>
</template>

<script>
  import Matter from 'matter-js'

  export default {
    name: "CubeRace",
    mounted() {
      const config = {
        width: 600,
        height: 500,

        player_width: 2,
        player_color: '#FF0',

        sky_color: '#4c4c4a',
        ground_color: '#555',

        pipe_space: 100,
        pipe_width: 100,

        limit: 100,
        vitesse: 1,

        pas: 5,
        category: ['#ED4C67', '#000', '#fff', '#e4ea9b'],

      };

      const Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        Body = Matter.Body,
        Query = Matter.Query,
        Composite = Matter.Composite,
        Events = Matter.Events,
        World = Matter.World,
        Bodies = Matter.Bodies;

// create engine
      const engine = Engine.create(),
        world = engine.world;

// create renderer
      const render = Render.create({
        element: document.getElementById('matterJS'),
        engine: engine,
        options: {
          width: config.width,
          height: config.height,
          wireframes: false,
          showAngleIndicator: false,
          background: config.sky_color,
        }
      });
      setTimeout(function () {
        Render.run(render);
      }, 500);
      Render.lookAt(render, {
        min: {x: 0, y: 0},
        max: {x: config.width, y: config.height}
      });

// create runner
      const runner = Runner.create();
      Runner.run(runner, engine);
      engine.world.gravity.y = 0;


      const group = Body.nextGroup(true);

      const players = [];
      let end;
      const mapAStar = [];
      let list = [], next = {};
      let level = 1;

      const init = () => {
        for (let i = 1; i < 4; i++) {
          players.push(Bodies.circle(10, config.height / 2, config.player_width, {
            id: -i,
            //frictionAir: 0.1,
            collisionFilter: {group: group},
            veloce: config.vitesse,
            render: {
              sprite: {
                texture: '/static/game/flappy' + i + '.png',
                xScale: 3 / 10,
                yScale: 3 / 10,
              }
            }
          }));
        }
        end = Bodies.rectangle(config.width - 30, config.height / 2, 30, 30, {
          id: 0,
          isStatic: true,
          render: {
            sprite: {
              texture: '/static/game/end.png',
            }
          },
        });
      };

      const createLevel = (level) => {
        World.clear(world);
        players.map((el) => {
          Body.setPosition(el, {x: 10, y: config.height / 2});
          Body.setVelocity(el, {x: 0, y: 0});
        });

        const obstacles = [];
        for (let i = 0; i <= Math.sqrt(level) * 6; i++) {
          const type = Math.round(Math.random() * (config.limit * (config.category.length - 1)) + 1);
          obstacles.push(Bodies.rectangle(
            Math.random() * (config.width - 200) + 100,
            Math.random() * config.height,
            Math.random() * config.width / 6 + 50,
            Math.random() * config.height / 6 + 50,
            {
              id: type,
              isStatic: true,
              isSensor: type > config.limit,
              chamfer: {radius: 20},
              render: {
                fillStyle: config.category[(type > config.limit ? type > config.limit * 2 ? 3 : 2 : 1)],
              },
            }
          ));
          Body.rotate(obstacles[obstacles.length - 1], Math.random() * 360)
        }
        obstacles.sort((a, b) => {
          return b.id - a.id;
        });
        World.add(world, obstacles);
        World.add(world, [end, ...players]);
        list = aStar(players[1]);
        next = list.pop();
      };

      Events.on(engine, 'collisionActive', function (e) {
        e.pairs.forEach(pair => {
          const player = players.find(el => pair.bodyA.id === el.id || pair.bodyB.id === el.id);
          if (player) {
            if ((pair.bodyA.id > config.limit && pair.bodyA.id <= config.limit * 2)
              || (pair.bodyB.id > config.limit && pair.bodyB.id <= config.limit * 2)) {
              player.veloce = config.vitesse * 2;
              return;
            }
            if ((pair.bodyA.id > config.limit * 2 && pair.bodyB.id <= config.limit * 3)
              || (pair.bodyB.id > config.limit * 2 && pair.bodyB.id <= config.limit * 3)) {
              player.veloce = config.vitesse / 2;
              return;
            }
          }
        });
      });
      Events.on(engine, 'collisionStart', (e) => {
        e.pairs.forEach(pair => {
          if (pair.bodyB.id === 0 || pair.bodyA.id === 0) {
            console.log('caca');
            level += 1;
            createLevel(level);
          }
        });
      });
      Events.on(engine, 'collisionEnd', function (e) {
        e.pairs.forEach(pair => {
          if (pair.bodyA.id < 0 || pair.bodyB.id < 0) {
            pair.bodyA.veloce = config.vitesse;
            pair.bodyB.veloce = config.vitesse;
          }
        });
      });

//Controle of the player

      const mapKey = {};
      document.onkeydown = document.onkeyup = function (e) {
        e = e || event; // to deal with IE
        mapKey[e.code] = e.type === 'keydown';
      };
      Events.on(engine, 'tick', () => {
        //console.log(e);
        for (let player of players) {
          if (player.position.y > config.height) Body.setPosition(player, {x: player.position.x, y: 0});
          if (player.position.y < 0) Body.setPosition(player, {x: player.position.x, y: config.height});
          if (player.position.x > config.width) Body.setPosition(player, {
            x: config.width,
            y: player.position.y
          });
          if (player.position.x < 0) Body.setPosition(player, {x: 0, y: player.position.y});
          if (mapKey["ArrowLeft"]) Body.translate(players[0], {x: -players[0].veloce, y: players[0].velocity.y});
          if (mapKey["ArrowRight"]) Body.translate(players[0], {x: players[0].veloce, y: players[0].velocity.y});
          if (mapKey["ArrowUp"]) Body.translate(players[0], {x: players[0].velocity.x, y: -players[0].veloce});
          if (mapKey["ArrowDown"]) Body.translate(players[0], {x: players[0].velocity.x, y: players[0].veloce});
          if (mapKey["KeyA"]) Body.translate(players[1], {x: -players[1].veloce, y: players[1].velocity.y});
          if (mapKey["KeyD"]) Body.translate(players[1], {x: players[1].veloce, y: players[1].velocity.y});
          if (mapKey["KeyW"]) Body.translate(players[1], {x: players[1].velocity.x, y: -players[1].veloce});
          if (mapKey["KeyS"]) Body.translate(players[1], {x: players[1].velocity.x, y: players[1].veloce});

          if (list.length > 0 || next) {
            const x2 = next.x - players[2].position.x;
            const y2 = next.y - players[2].position.y;
            const x3 = (x2 > config.pas && players[2].veloce) || (x2 < -config.pas && -players[2].veloce) || 0;
            const y3 = (y2 > config.pas && players[2].veloce) || (y2 < -config.pas && -players[2].veloce) || 0;
            Body.translate(players[2], {x: x3, y: y3});

            if (list.length > 0
              && Math.abs(x2) < config.pas * 3
              && Math.abs(y2) < config.pas * 3) {
              next = list.pop();
              World.add(world, Bodies.circle(next.x, next.y, 1, {
                isStatic: true,
                collisionFilter: {group: group},
                id: 1000,
                render: {
                  fillStyle: '#f00',
                },
              }));
            }
          }
        }


      });

      const initAStar = () => {
        for (let i = 0; i < config.width; i++) {
          const col = [];
          for (let j = 0; j < config.height; j++) {
            col.push({x: i * config.pas, y: j  * config.pas});
          }
          mapAStar.push(col);
        }
      };

      const aStar = bot => {
        const closedList = [];
        const openList = [{
          x: bot.position.x,
          y: bot.position.y,
          dist: 0,
          cost: 0,
          prec: null,
        }];
        while (openList.length > 0) {
          openList.sort((a, b) => b.dist - a.dist);
          const u = openList.pop();
          if (!u || (u.x === end.position.x && u.y === end.position.y)) {
            const path = [{x: end.position.x, y: end.position.y}, u];
            while (path[path.length - 1].prec !== null) {
              path.push(path[path.length - 1].prec);
            }
            return path;
          }
          const ux = u.x / config.pas, uy = u.y / config.pas;
          const hoods = [
            mapAStar[ux + 1][uy],
            mapAStar[ux][uy + 1],
            mapAStar[ux - 1][uy],
            mapAStar[ux][uy - 1],
            // mapAStar[ux + 1][uy + 1],
            // mapAStar[ux - 1][uy + 1],
            // mapAStar[ux - 1][uy - 1],
            // mapAStar[ux + 1][uy - 1],
          ];
          hoods.forEach(hood => {
            const node = {...hood};
            if (hood && !(closedList.find(v => hood.x === v.x && hood.y === v.y)
              || openList.find(v => hood.x === v.x && hood.y === v.y && hood.cost > v.cost))) {
              const test = Query.point(Composite.allBodies(world), {x: hood.x, y: hood.y});
              if (test.findIndex(a => a.id <= config.limit && a.id > 0) !== -1) return;
              node.cost = u.cost + 1;
              node.dist = node.cost + Math.pow(((hood.x - end.position.x) * (hood.x - end.position.x) + (hood.y - end.position.y) * (hood.y - end.position.y)), .5);
              node.prec = u;
              openList.push(node);
            }
          });
          closedList.push(u);
        }
        return [];
      };


      init();
      initAStar();
      createLevel(1);
    }
  }
</script>

<style scoped>
	.center {
		text-align: center;
	}
</style>