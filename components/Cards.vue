<template>
    <el-row class="cards-container">
        <el-col :xs="24" :sm="12" :md="8" v-for="(item, index) in pages" :index="index">
            <div class="cards-item-wrapper">
                <el-card class="cards-item" shadow="always" :body-style="{ padding: '0px' }">
                    <div class="cards-item-cover" :style="`background-image: url(${item.cover});`"></div>
                    <div class="cards-item-desc">{{item.desc}}</div>
                    <div class="cards-item-pined" v-if="item.pined">
                        <i class="el-icon-s-flag" />
                    </div>
                    <router-link :to="item.path">
                        <div class="cards-item-title">
                            {{item.title}}
                        </div>
                        <div class="cards-item-meta">
                            <div class="cards-item-date">
                                <i class="el-icon-edit-outline" />
                                {{item.date}}
                            </div>
                            <div class="cards-item-tag">
                                <i class="el-icon-paperclip" />
                                {{item.tag}}
                            </div>
                        </div>
                    </router-link>
                </el-card>
            </div>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        name: "Cards",
        props: ['pages']
    }
</script>

