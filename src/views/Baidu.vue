<template>
    <div class="baidu">
        <div class="demo-image__error">
            大萨达
            <div class="block" style="font-size: 0">
                <el-image
                        v-for="item in imgSrc"
                        :src="item"
                        :preview-src-list="imgSrc"
                        fit="cover"
                        lazy
                        style="width: 600px;height: 500px">
                    <div slot="error" class="image-slot">
                        <i class="el-icon-picture-outline"></i>
                    </div>
                </el-image>
            </div>
        </div>
    </div>
</template>
<style lang="less">
</style>
<script>
    // @ is an alias to /src
    import {getBaiduResult} from '@/api/getBaiduResult'

    export default {
        name: 'Baidu',
        data() {
            return {
                imgSrc: []
            }
        },
        components: {},
        methods: {
            getData() {
                this.$axios({
                    method: 'get',
                    url: 'api/api.php',
                    params: {
                        op: 'autoload_jk',
                        catid: 29,
                        page: 1,
                    }
                }).then(res => {
                    var arr = []
                    res.data.forEach(item => {
                        arr.push(item.thumb)
                    })
                    this.imgSrc = arr
                    console.log(arr);
                })
            }
        },
        mounted() {
            this.getData();
        },
    }
</script>
