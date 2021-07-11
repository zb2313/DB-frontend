<template>
  <el-container direction="vertical">
    <content-list-item />
  </el-container>
</template>

<script>
import contentListItem from "@/components/contentListItem.vue";
import ContentListItem from "../components/contentListItem.vue";

export default {
  components: {
    contentListItem,

    ContentListItem,
  },
};
</script>
