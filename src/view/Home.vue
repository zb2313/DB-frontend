<template>
    <div class="about">
        <v-header />
        <v-sidebar />
        <div class="content-box" :class="{ 'content-collapse': collapse }">
            <div class="contents-xzb">
                <router-view v-slot="{ Component }">
                    <transition name="move" mode="out-in">
                        <keep-alive >
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
        tagsList:[],
        collapse:false
      }
    },
    created(){
      // const tagsList =
      //     this.$store.state.tagsList.map((item) => item.name);
    }

};
</script>
