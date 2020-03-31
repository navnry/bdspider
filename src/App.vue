<template>
    <div id="app">
        <!--<div id="nav">-->
            <!--<router-link to="/">Sousou</router-link> |-->
            <!--<router-link to="/baidu">Baidu</router-link>-->
        <!--</div>-->
        <keep-alive>
            <router-view/>
        </keep-alive>
    </div>
</template>

<style lang="less">
    #app {
        font: 16px/1.5 Helvetica, STHeiti STXihei, Microsoft JhengHei, Microsoft YaHei, sans-serif;
        color: #333;
        /*width: 600px;*/
        margin: 0 auto;
    }

    .main {
        /*width: 1200px;*/
        margin: 0 auto;
    }

    table {
        font-size: 14px;
    }

    .el-col {
        margin: 10px auto;
    }

    .el-table {
        .cell {
            white-space: pre-line !important;
        }
    }
</style>
