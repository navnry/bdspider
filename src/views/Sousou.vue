<template>
    <div class="sousou">
        <el-container>
            <el-row :gutter="15">
                <el-col :span="10">
                    <el-input
                            placeholder="请输入地区"
                            prefix-icon="el-icon-location-outline"
                            v-model="input_address"
                            ref="input1">
                    </el-input>
                </el-col>
                <el-col :span="11">
                    <el-input
                            placeholder="请输入关键词"
                            prefix-icon="el-icon-search"
                            v-model="input_content"
                            @keyup.enter.native="goTo()"
                            ref="input2">
                    </el-input>
                </el-col>
                <el-col :span="3">
                    <el-button @click="goTo()" type="primary" icon="el-icon-search">搜索</el-button>
                </el-col>

                <el-col :span="24">
                    <el-table
                            :data="resultData"
                            v-loading="loading"
                            border
                            stripe
                            style="width: 100%">
                        <el-table-column
                                prop="id"
                                label="序号"
                                align='center'
                                width="80">
                        </el-table-column>
                        <el-table-column
                                label="行业分类"
                                width="80"
                                align='center'>
                            <template slot-scope="scope">
                                <!--<img :src="scope.row.merger_icon" alt="" style="width: 50px;height: 50px">-->
                                <el-image :src="scope.row.merger_icon">
                                    <div slot="error" class="image-slot">
                                        <i class="el-icon-picture"></i>
                                    </div>
                                </el-image>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                label="名称"
                                width="300">
                        </el-table-column>
                        <el-table-column
                                prop="tel"
                                label="联系方式"
                                :formatter="formatTel"
                                width="280">
                        </el-table-column>
                        <el-table-column
                                prop="tag"
                                label="筛选"
                                align='center'
                                width="90"
                                :filters="[{ text: '手机', value: '手机' }, { text: '座机', value: '座机' }]"
                                :filter-method="filterTag"
                                filter-placement="bottom-end">
                            <template slot-scope="scope">
                                <el-tag
                                        :type="scope.row.tag === '手机' ? 'danger' : 'primary'"
                                        disable-transitions>{{scope.row.tag}}
                                </el-tag>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-col>
            </el-row>
        </el-container>
    </div>
</template>
<style lang="less">
    #app {
        font: 16px/1.5 Helvetica, STHeiti STXihei, Microsoft JhengHei, Microsoft YaHei, sans-serif;
        color: #333;
        margin: 0 auto;
    }

    .main {
        /*width: 1200px;*/
        margin: 0 auto;
    }

    table {
        font-size: 14px;

    }

    .sousou {
        .el-table td, .el-table th {
            padding: 5px 0;
        }
    }

    .el-col {
        margin: 10px auto;
    }

    .el-table {
        .cell {
            white-space: pre-line !important;
        }
    }

    .sousou {
        max-width: 800px;
        margin: 0 auto;
    }

    .el-image {
        [class*=" el-icon-"],
        [class^=el-icon-] {
            font-size: 40px;
        }
    }

</style>
<script>
    // @ is an alias to /src
    import {getResult} from '@/api/getResult'

    export default {
        name: 'Sousou',
        data() {
            return {
                input_content: '',
                input_address: '长沙',
                keywords: '',
                limit: '',
                resultData: [],
                loading: false,
            }
        },
        components: {},
        methods: {
            formatTel(row) {
                var role = []
                for (var i in row.tel) {
                    role.push(row.tel[i])
                }
                return role.join(' \n ')
            },
            filterTag(value, row) {
                return row.tag === value;
            },
            isPhone(value) {
                let state = false
                if (value.length > 1) {
                    value.forEach(function (item) {
                        if ((/^1(3|4|5|6|7|8|9)\d{9}$/.test(item)) && value !== '' && value !== undefined && value !== null) {
                            state = true
                        }
                    })
                } else if ((/^1(3|4|5|6|7|8|9)\d{9}$/.test(value)) && value !== '' && value !== undefined && value !== null) {
                    state = true
                }
                return state
            },
            uniqObjInArray(objarray) {
                let len = objarray.length;
                let tempJson = {};
                let result = [];
                for (let i = 0; i < len; i++) {
                    tempJson[JSON.stringify(objarray[i])] = true;
                }
                let keyItems = Object.keys(tempJson);
                for (let j = 0; j < keyItems.length; j++) {
                    result.push(JSON.parse(keyItems[j]));
                }
                return result;
            },
            isEmpty(obj) {
                let empty = true;
                if (obj.tel) {
                    empty = false;
                }
                return empty
            },
            filterEmpty(array) {
                return array.filter(item => !this.isEmpty(item))
            },
            setLimit(c) {
                var tmp = []
                for (var i = 1; i <= c; i++) {
                    tmp.push(i)
                }
                this.limit = tmp.toString()
            },
            goTo() {
                this.loading = true
                this.input_address = this.$refs.input1.value;
                this.keywords = this.$refs.input2.value;
                this.getDatas();
            },
            getDatas() {
                this.setLimit(10)
                getResult({
                    keyword: this.keywords,
                    cityname: this.input_address,
                    batch: this.limit,
                    _: new Date().getTime(),
                }).then(res => {
                    var ids = 1
                    this.resultData = this.filterEmpty(this.uniqObjInArray(res.data.poi)).map(item => {
                        return {
                            id: ids++,
                            name: item.name,
                            tel: item.tels,
                            merger_icon: item.merger_icon,
                            tag: this.isPhone(item.tels) == true ? "手机" : "座机"
                        }
                    })
                    this.$nextTick(() => {
                        this.loading = false
                    })
                })
            },

        },
        mounted() {
            this.getDatas()
        },
    }
</script>
