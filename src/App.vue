<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        /*text-align: center;
        color: #2c3e50;*/
        width: 100%;
    }

    ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    h1, h2, h3, h4 {
        padding: 0;
        margin: 0;
        color: white;
        font-family: 'Open Sans', sans-serif;
    }

    h1 {font-size: 30px;}
    h2 {font-size: 24px;}
    h3 {font-size: 19px;}
    h4 {font-size: 14px;}
    p {font-size: 16px;}
    i {font-size: 13px;}
    * {box-sizing: border-box;}
</style>
