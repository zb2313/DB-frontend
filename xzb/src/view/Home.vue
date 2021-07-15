<template>
    <div class="about">
        <v-header />
        <v-sidebar />
        <div class="content-box" :class="{ 'content-collapse': collapse }">
            <div class="content">
                <router-view v-slot="{ Component }">
                    <transition name="move" mode="out-in">
                        <keep-alive :include="tagsList">
                            <component :is="Component" />
                        </keep-alive>
                    </transition>
                </router-view>
                <!-- <el-backtop target=".content"></el-backtop> -->
            </div>
        </div>
    </div>
</template>
<script>

import vHeader from "../components/Header2.vue";
import vSidebar from "../components/Sidebar.vue";
export default {
    components: {
        vHeader,
        vSidebar,
    },
    data(){
      return{
        tageList:[],
        collapse:false
      }
    },

};
</script>
