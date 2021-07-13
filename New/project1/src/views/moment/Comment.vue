<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-card :body-style="{ padding: '0px' }">
          <div v-for="(item, i) in author" :key="i" class="author-title">
            <el-avatar
              class="header-img"
              :size="60"
              :src="myHeader"
            ></el-avatar>
            <div class="author-info">
              <span class="author-name">{{ item.name }}</span>
              <span class="author-time">{{ item.time }}</span>
            </div>
            <div class="talk-box">
              <p>
                <span class="reply">{{ item.comment }}</span>
              </p>
            </div>
            <div class="icon-btn">
              <span @click="showReplyInput(i, item.name, item.id)"
                ><i class="iconfont el-icon-s-comment"></i
                >{{ item.commentNum }}</span
              >
              <i class="iconfont el-icon-caret-top"></i>{{ item.like }}
            </div>
          </div>
          <div style="padding: 14px">
            <!-- 评论部分 -->
            <div
              v-for="(item, i) in comments"
              :key="i"
              class="author-title reply-father"
            >
              <el-avatar
                class="header-img"
                :size="40"
                :src="item.headImg"
              ></el-avatar>
              <div class="author-info">
                <span class="author-name">{{ item.name }}</span>
                <span class="author-time">{{ item.time }}</span>
              </div>
              <div class="talk-box">
                <p>
                  <span class="reply">{{ item.comment }}</span>
                </p>
              </div>
              <div class="reply-box">
                <div
                  v-for="(reply, j) in item.reply"
                  :key="j"
                  class="author-title"
                >
                  <el-avatar
                    class="header-img"
                    :size="40"
                    :src="reply.fromHeadImg"
                  ></el-avatar>
                  <div class="author-info">
                    <span class="author-name">{{ reply.from }}</span>
                    <span class="author-time">{{ reply.time }}</span>
                  </div>
                  <div class="icon-btn">
                    <span @click="showReplyInput(i, reply.from, reply.id)"
                      ><i class="iconfont el-icon-s-comment"></i
                      >{{ reply.commentNum }}</span
                    >
                    <i class="iconfont el-icon-caret-top"></i>{{ reply.like }}
                  </div>
                  <div class="talk-box">
                    <p>
                      <span>回复 {{ reply.to }}:</span>
                      <span class="reply">{{ reply.comment }}</span>
                    </p>
                  </div>
                  <div class="reply-box"></div>
                </div>
              </div>
              <div v-show="_inputShow(i)" class="my-reply my-comment-reply">
                <el-avatar
                  class="header-img"
                  :size="40"
                  :src="myHeader"
                ></el-avatar>
                <div class="reply-info">
                  <div
                    tabindex="0"
                    contenteditable="true"
                    spellcheck="false"
                    placeholder="输入评论..."
                    @input="onDivInput($event)"
                    class="reply-input reply-comment-input"
                  ></div>
                </div>
                <div class="reply-btn-box">
                  <el-button
                    class="reply-btn"
                    size="medium"
                    @click="sendCommentReply(i, j)"
                    type="primary"
                    >发表评论</el-button
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="bottom clearfix">
            <time class="time">{{ currentDate }}</time>
            <el-button type="text" class="button">展开</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
        <el-card :body-style="{ padding: '0px' }">
          <img src="../../assets/dongtai.png" class="image" />
          <div style="padding: 14px">
            <span>动态列表</span>
            <div class="bottom clearfix">
              <time class="time">{{ currentDate }}</time>
              <el-button type="text" class="button">展开</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-card :body-style="{ padding: '0px' }">
          <img src="../../assets/dongtai.png" class="image" />
          <div style="padding: 14px">
            <span>动态列表</span>
            <div class="bottom clearfix">
              <time class="time">{{ currentDate }}</time>
              <el-button type="text" class="button">展开</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-card :body-style="{ padding: '0px' }">
          <img src="../../assets/dongtai.png" class="image" />
          <div style="padding: 14px">
            <span>动态列表</span>
            <div class="bottom clearfix">
              <time class="time">{{ currentDate }}</time>
              <el-button type="text" class="button">展开</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-card :body-style="{ padding: '0px' }">
          <img src="../../assets/dongtai.png" class="image" />
          <div style="padding: 14px">
            <span>动态列表</span>
            <div class="bottom clearfix">
              <time class="time">{{ currentDate }}</time>
              <el-button type="text" class="button">展开</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>


<style scoped>
.time {
  font-size: 13px;
  color: #999;
}
.el-card {
  height: 100%;
  min-width: 480px;
  margin-right: 20px;
  transition: all 0.5s;
  border-radius: 30px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 1.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.author-name {
  float: left;
  justify-content: flex-start;
  font-size: 20px;
}
.author-time {
  float: right;
}
.bottom {
  margin-top: 13px;
  line-height: 22px;
}

.button {
  padding: 0;
  float: right;
}

.header-img {
  display: block;
  justify-content: flex-end;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>

<script>
const clickoutside = {
  // 初始化指令
  bind(el, binding, vnode) {
    function documentHandler(e) {
      // 这里判断点击的元素是否是本身，是本身，则返回
      if (el.contains(e.target)) {
        return false;
      }
      // 判断指令中是否绑定了函数
      if (binding.expression) {
        // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
        binding.value(e);
      }
    }
    // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
    el.vueClickOutside = documentHandler;
    document.addEventListener("click", documentHandler);
  },
  update() {},
  unbind(el, binding) {
    // 解除事件监听
    document.removeEventListener("click", el.vueClickOutside);
    delete el.vueClickOutside;
  },
};
export default {
  name: "ArticleComment",
  data() {
    return {
      currentDate: new Date(),
      author: [
        {
          name: "Lana Del Rey",
          id: 19870621,
          time: "2019年9月16日 18:43",
          commentNum: 2,
          like: 15,
          comment: "我发布一张新专辑Norman Fucking Rockwell,大家快来听啊",
        },
      ],
      btnShow: false,
      index: "0",
      replyComment: "",
      myName: "Lana Del Rey",
      myHeader:
        "https://ae01.alicdn.com/kf/Hd60a3f7c06fd47ae85624badd32ce54dv.jpg",
      myId: 19870621,
      to: "",
      toId: -1,
      comments: [
        {
          name: "Lana Del Rey",
          id: 19870621,
          headImg:
            "https://ae01.alicdn.com/kf/Hd60a3f7c06fd47ae85624badd32ce54dv.jpg",
          comment: "我发布一张新专辑Norman Fucking Rockwell,大家快来听啊",
          time: "2019年9月16日 18:43",
          commentNum: 2,
          like: 15,
          inputShow: false,
          reply: [
            {
              from: "Taylor Swift",
              fromId: 19891221,
              fromHeadImg:
                "https://ae01.alicdn.com/kf/H94c78935ffa64e7e977544d19ecebf06L.jpg",
              to: "Lana Del Rey",
              toId: 19870621,
              comment: "我很喜欢你的新专辑！！",
              time: 22,
              commentNum: 1,
              like: 15,
              inputShow: false,
            },
          ],
        },
        {
          name: "Taylor Swift",
          id: 19891221,
          headImg:
            "https://ae01.alicdn.com/kf/H94c78935ffa64e7e977544d19ecebf06L.jpg",
          comment: "我发行了我的新专辑Lover",
          time: "2019年9月16日 18:43",
          commentNum: 1,
          like: 5,
          inputShow: false,
          reply: [],
        },
        {
          name: "Norman Fucking Rockwell",
          id: 20190830,
          headImg:
            "https://ae01.alicdn.com/kf/Hdd856ae4c81545d2b51fa0c209f7aa28Z.jpg",
          comment: "Plz buy Norman Fucking Rockwell on everywhere",
          time: "2019年9月16日 18:43",
          commentNum: 0,
          like: 5,
          inputShow: false,
          reply: [],
        },
      ],
    };
  },
  directives: { clickoutside },
  setup() {},
  methods: {
    inputFocus() {
      var replyInput = document.getElementById("replyInput");
      replyInput.style.padding = "8px 8px";
      replyInput.style.border = "2px solid blue";
      replyInput.focus();
    },
    showReplyBtn() {
      this.btnShow = true;
    },
    hideReplyBtn() {
      this.btnShow = false;
      replyInput.style.padding = "10px";
      replyInput.style.border = "none";
    },
    showReplyInput(i, name, id) {
      this.comments[this.index].inputShow = false;
      this.index = i;
      this.comments[i].inputShow = true;
      this.to = name;
      this.toId = id;
    },
    _inputShow(i) {
      return this.comments[i].inputShow;
    },
    sendComment() {
      if (!this.replyComment) {
        this.$message({
          showClose: true,
          type: "warning",
          message: "评论不能为空",
        });
      } else {
        let a = {};
        let input = document.getElementById("replyInput");
        let timeNow = new Date().getTime();
        let time = this.dateStr(timeNow);
        a.name = this.myName;
        a.comment = this.replyComment;
        a.headImg = this.myHeader;
        a.time = time;
        a.commentNum = 0;
        a.like = 0;
        this.comments.push(a);
        this.replyComment = "";
        input.innerHTML = "";
      }
    },
    sendCommentReply(i, j) {
      if (!this.replyComment) {
        this.$message({
          showClose: true,
          type: "warning",
          message: "评论不能为空",
        });
      } else {
        let a = {};
        let timeNow = new Date().getTime();
        let time = this.dateStr(timeNow);
        a.from = this.myName;
        a.to = this.to;
        a.fromHeadImg = this.myHeader;
        a.comment = this.replyComment;
        a.time = time;
        a.commentNum = 0;
        a.like = 0;
        this.comments[i].reply.push(a);
        this.replyComment = "";
        document.getElementsByClassName("reply-comment-input")[i].innerHTML =
          "";
      }
    },
    onDivInput: function (e) {
      this.replyComment = e.target.innerHTML;
    },
    dateStr(date) {
      //获取js 时间戳
      var time = new Date().getTime();
      //去掉 js 时间戳后三位，与php 时间戳保持一致
      time = parseInt((time - date) / 1000);
      //存储转换值
      var s;
      if (time < 60 * 10) {
        //十分钟内
        return "刚刚";
      } else if (time < 60 * 60 && time >= 60 * 10) {
        //超过十分钟少于1小时
        s = Math.floor(time / 60);
        return s + "分钟前";
      } else if (time < 60 * 60 * 24 && time >= 60 * 60) {
        //超过1小时少于24小时
        s = Math.floor(time / 60 / 60);
        return s + "小时前";
      } else if (time < 60 * 60 * 24 * 30 && time >= 60 * 60 * 24) {
        //超过1天少于30天内
        s = Math.floor(time / 60 / 60 / 24);
        return s + "天前";
      } else {
        //超过30天ddd
        var date = new Date(parseInt(date));
        return (
          date.getFullYear() +
          "/" +
          (date.getMonth() + 1) +
          "/" +
          date.getDate()
        );
      }
    },
  },
};
</script>
<style scoped>
.my-reply {
  padding: 10px;
  background-color: #fafbfc;
}
.header-img {
  display: inline-block;
  vertical-align: top;
}
.reply-info {
  display: inline-block;
  margin-left: 5px;
  width: 90%;
  @media screen and (max-width: 1200px) {
    width: 80%;
  }
}
.reply-input {
  min-height: 10px;
  line-height: 12px;
  padding: 10px 10px;
  color: #ccc;
  background-color: #ffc;
  border-radius: 5px;
  &:empty:before {
    content: attr(placeholder);
  }
  &:focus:before {
    content: none;
  }
  &:focus {
    padding: 8px 8px;
    border: 2px solid blue;
    box-shadow: none;
    outline: none;
  }
}
.reply-btn-box {
  height: 25px;
  margin: 10px 0;
}
.reply-btn {
  position: relative;
  float: right;
  margin-right: 15px;
}
.my-comment-reply {
  margin-left: 50px;
}
.reply-input {
  width: flex;
}
.author-title:not(:last-child) {
  border-bottom: 1px solid rgba(178, 186, 194, 0.3);
}
.author-title {
  padding: 10px;
}
.header-img {
  display: inline-block;
  vertical-align: top;
}
.author-info {
  display: inline-block;
  margin-left: 15px;
  width: 60%;
  height: 40px;
  line-height: 20px;
}
.author-info span {
  display: block;
  cursor: pointer;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.author-name {
  color: #000;
  font-size: 10px;
  font-weight: bold;
}
.author-time {
  font-size: 10px;
}
.icon-btn {
  width: 30%;
  padding: 0 !important;
  float: right;
  @media screen and (max-width: 1200px) {
    width: 20%;
    padding: 7px;
  }
}
.icon-btn span {
  cursor: pointer;
}
.iconfont {
  margin: 0 5px;
}
.talk-box {
  margin: 0 50px;
}
.talk-box p {
  margin: 0;
}
.reply {
  font-size: 16px;
  color: #000;
}
.reply-box {
  margin: 10px 0 0 50px;
  background-color: #efefef;
}
</style>
