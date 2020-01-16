<template>
    <div class="home">
        <div class="center">
            <h1>Max Lerebourg</h1><br>
            <h2>Développeur Fullstack</h2>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Home",
        created() {
            document.addEventListener("resize", this.myEventHandler);
        },
        destroyed() {
            document.removeEventListener("resize", this.myEventHandler);
        },
        methods: {
            myEventHandler(e) {
                //console.log(e);
                const canvas = document.getElementById('canvas');
                canvas.canvas.height = e.window.innerHeight;
                canvas.canvas.width = e.window.innerWidth;
            },
            rainMatrix() {
                let canvas = document.getElementById('canvas');
                let ctx = canvas.getContext('2d');
                let signs = ['繁','体','字','繁','體','字'];
                let obj = [];
                setInterval(
                    () => {
                        ctx.clearRect(0, 0, canvas.width, canvas.height);
                        obj.push({
                            sign: signs[Math.floor(Math.random() * signs.length)],
                            posX: Math.floor(Math.random() * canvas.width),
                            posY: 0,
                            speed: Math.floor(Math.random() * 20 + 10),
                        });

                        for (let i = 0; i < obj.length; i++) {
                            obj[i].posY += obj[i].speed;
                            ctx.fillStyle = "lightgreen";
                            ctx.fillText(obj[i].sign, obj[i].posX, obj[i].posY);
                            ctx.fillStyle = "green";
                            ctx.fillText(obj[i].sign, obj[i].posX, obj[i].posY - obj[i].speed);
                            ctx.fillText(obj[i].sign, obj[i].posX, obj[i].posY - obj[i].speed * 2);
                            ctx.fillText(obj[i].sign, obj[i].posX, obj[i].posY - obj[i].speed * 3);
                            ctx.fillText(obj[i].sign, obj[i].posX, obj[i].posY - obj[i].speed * 4);
                            ctx.fillText(obj[i].sign, obj[i].posX, obj[i].posY - obj[i].speed * 5);
                            ctx.fillText(obj[i].sign, obj[i].posX, obj[i].posY - obj[i].speed * 6);
                            ctx.fillText(obj[i].sign, obj[i].posX, obj[i].posY - obj[i].speed * 7);
                            if (obj[i].posY > canvas.height + obj[i].speed * 7)
                                obj.splice(i, 1);
                        }
                    }, 100);
            },
        },
        mounted() {
            this.rainMatrix();
            //this.myEventHandler();
        }
    }
</script>

<style scoped>
    .home {
        position: relative;
        z-index: 1;
        display: table-cell;
        width: 100vw;
        height: 100vh;
        vertical-align: middle;
        text-align: center;
        background-color: #1e272e;
        background-image: url('/static/background.jpg');
        background-size: cover;
    }

    .center {
        z-index: 2;
        background-color: #000;
        display: inline-block;
        width: 30vw;
        height: auto;
        border-radius: 5px;
        border: #fff 2px;
        padding: 10px;
    }
    .me{
        position: absolute;
        z-index: 0;
        bottom:0;
        right: 0;
        left: 0;
        width: 40vw;
        height: 100vh;
        object-fit: scale-down;
    }
    @media only screen and (max-width: 600px) {
        .center {
            width: 90vw;
        }
    }
</style>