<template>
    <div class="page" >

        <el-table
    :data="tableData.filter(data => !search || data.question.toLowerCase().includes(search.toLowerCase()))"
    style="width: 1000px">
    <el-table-column
      label="问题"
      prop="question">
    </el-table-column>
    <el-table-column
      label="解答"
      prop="answer">
    </el-table-column>
    <el-table-column>
        <template slot="header">
             <router-link to="/uploadQA">
    <el-button icon="el-icon-plus" size="small">增加常见问题</el-button>
    </router-link>
        </template>
    </el-table-column>
    <el-table-column
      align="right">
      <template slot="header">
        <el-input
          v-model="search"
          size="mini"
          placeholder="输入关键字搜索"/>
      </template>
      <template slot-scope="scope">
        <el-button icon="el-icon-edit"
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">更改</el-button>
        <el-button icon="el-icon-delete"
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

    </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [{
          question: '这是一个问题',
          answer: '这是一个回答'
        },
        {
          question: '这是第二个问题',
          answer: '这是第二个回答'
        },
        {
          question: '这是第三个问题',
          answer: '这是第三个回答'
        }],
        search: ''
      }
    },
    methods: {
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      }
    },
  }
</script>