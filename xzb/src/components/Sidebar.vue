<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157"
            text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template #title>
                            <i :class="item.icon"></i>
                            <span>{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                                <template #title>{{ subItem.title }}</template>
                                <el-menu-item v-for="(threeItem, i) in subItem.subs" :key="i" :index="threeItem.index">
                                    {{ threeItem.title }}</el-menu-item>
                            </el-submenu>
                            <el-menu-item v-else :index="subItem.index" :key="subItem.index">{{ subItem.title }}
                            </el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i>
                        <template #title>{{ item.title }}</template>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
export default {
    data()
    {
       return{
         items:[
           {
             icon: "el-icon-s-custom",
             index: "/dashboard",
             title: "个人信息",
           },
           {
             icon: "el-icon-s-grid",
             index: "/table",
             title: "历史订单",
           },
           {
             icon: "el-icon-s-comment",
             index: "/tabs",
             title: "通知",
           },
           {
             icon: "el-icon-s-promotion",
             index: "3",
             title: "编辑与上传",
             subs: [
               {
                 index: "/form",
                 title: "修改个人信息",
               },
               {
                 index: "/upload",
                 title: "文件上传",
               },
               {
                 index: "4",
                 title: "三级菜单",
                 subs: [
                   {
                     index: "/editor",
                     title: "富文本编辑器",
                   },
                 ],
               },
             ],
           },
           {
             icon: "el-icon-s-management",
             index: "/Favorites",
             title: "收藏",
           },
           {
             icon: "el-icon-lx-global",
             index: "/i18n",
             title: "国际化功能",
           },
           {
             icon: "el-icon-s-check",
             index: "7",
             title: "错误处理",
             subs: [
               {
                 index: "/permission",
                 title: "权限测试",
               },
               {
                 index: "/404",
                 title: "404页面",
               },
             ],
           },
           {
             icon: "el-icon-s-opportunity",
             index: "/donate",
             title: "使用帮助",
           },
           {
             icon:"el-icon-s-home",
             index:"/user",
             title:"个人中心"
           }
         ],
         onRoutes:"",
         collapse:false
       }
    },
    created() {
      this.onRoutes=this.$route.path;
      this.collapse=this.$store.state.collapse;
    },
    setup()
    {
        // const items = [
        //     {
        //         icon: "el-icon-lx-home",
        //         index: "/dashboard",
        //         title: "个人信息",
        //     },
        //     {
        //         icon: "el-icon-lx-cascades",
        //         index: "/table",
        //         title: "历史订单",
        //     },
        //     {
        //         icon: "el-icon-lx-copy",
        //         index: "/tabs",
        //         title: "通知",
        //     },
        //     {
        //         icon: "el-icon-lx-calendar",
        //         index: "3",
        //         title: "表单相关",
        //         subs: [
        //             {
        //                 index: "/form",
        //                 title: "修改个人信息",
        //             },
        //             {
        //                 index: "/upload",
        //                 title: "文件上传",
        //             },
        //             {
        //                 index: "4",
        //                 title: "三级菜单",
        //                 subs: [
        //                     {
        //                         index: "/editor",
        //                         title: "富文本编辑器",
        //                     },
        //                 ],
        //             },
        //         ],
        //     },
        //     {
        //         icon: "el-icon-lx-emoji",
        //         index: "/icon",
        //         title: "自定义图标",
        //     },
        //     {
        //         icon: "el-icon-pie-chart",
        //         index: "/charts",
        //         title: "schart图表",
        //     },
        //     {
        //         icon: "el-icon-lx-global",
        //         index: "/i18n",
        //         title: "国际化功能",
        //     },
        //     {
        //         icon: "el-icon-lx-warn",
        //         index: "7",
        //         title: "错误处理",
        //         subs: [
        //             {
        //                 index: "/permission",
        //                 title: "权限测试",
        //             },
        //             {
        //                 index: "/404",
        //                 title: "404页面",
        //             },
        //         ],
        //     },
        //     {
        //         icon: "el-icon-lx-redpacket_fill",
        //         index: "/donate",
        //         title: "使用帮助",
        //     },
        // ];

        // const route = useRoute();
        //
        // const onRoutes = computed(() => {
        //     return route.path;
        // });
        //
        // const store = useStore();
        // const collapse = computed(() => store.state.collapse);
        //
        // return {
        //     onRoutes,
        //     collapse,
        // };
    },
};
</script>

<style scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
}
.sidebar > ul {
    height: 100%;
}
</style>
