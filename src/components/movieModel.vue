<template>
  <el-dialog :title="titleName" :visible.sync="movieDailog" width="60%">
    <el-form :inline="true" :model="movieForm" ref="movieForm" class="demo-form-inline">
      <el-form-item
        label="电影中文名称："
        :label-width="formLabelWidth"
        :rules="[
      { required: true, message: '不能为空'},]"
      >
        <el-input
          v-model="movieForm.chineseName"
          autocomplete="off"
          style="width: 280px;"
          placeholder="请输入英雄名称"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="电影英文名称："
        :label-width="formLabelWidth"
        :rules="[
      { required: true, message: '不能为空'},]"
      >
        <el-input
          v-model="movieForm.englishName"
          autocomplete="off"
          placeholder="请输入英雄年龄"
          style="width: 280px;"
        ></el-input>
      </el-form-item>

      <el-form-item
        label="剧情类型："
        :label-width="formLabelWidth"
        :rules="[
      { required: true, message: '不能为空'},]"
      >
        <el-select
          @change="changeMT"
          multiple
          v-model="movieForm.movieType"
          placeholder="请选择剧情类型"
          style="width: 280px;"
        >
          <el-option label="爱情" value="loving"></el-option>
          <el-option label="动作" value="action"></el-option>
          <el-option label="犯罪" value="criminal"></el-option>
          <el-option label="喜剧" value="comedy"></el-option>
          <el-option label="推理" value="inference"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item
        label="电影放映类型："
        :label-width="formLabelWidth"
        :rules="[
      { required: true, message: '不能为空'},]"
      >
        <el-select
          @change="changeDType"
          v-model="movieForm.dType"
          placeholder="请选择电影放映类型"
          style="width: 280px;"
        >
          <el-option label="2D" value="2D"></el-option>
          <el-option label="3D" value="3D"></el-option>
          <el-option label="2DIMAX" value="2DIMAX"></el-option>
          <el-option label="3DMAX" value="3DMAX"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="播放地区："
        :label-width="formLabelWidth"
        :rules="[
      { required: true, message: '不能为空'},]"
      >
        <el-input
          v-model="movieForm.playArea"
          autocomplete="off"
          placeholder="请选输入放地区"
          style="width: 280px;"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="电影时长："
        :label-width="formLabelWidth"
        :rules="[
      { required: true, message: '不能为空'},]"
      >
        <el-input
          v-model="movieForm.movieTime"
          autocomplete="off"
          placeholder="请输入电影时长"
          style="width: 280px;"
        ></el-input>
      </el-form-item>

      <el-form-item
        label="上映时间："
        :label-width="formLabelWidth"
        value-format="yyyy-MM-dd"
        :rules="[
      { required: true, message: '不能为空'},]"
      >
        <el-date-picker
          style="width: 280px;"
          v-model="movieForm.showTime"
          type="date"
          placeholder="请选择上映时间"
        ></el-date-picker>
      </el-form-item>

      <el-form-item
        label="用户人数："
        :label-width="formLabelWidth"
        :rules="[
      { required: true, message: '不能为空'},]"
      >
        <el-input
          v-model="movieForm.users"
          autocomplete="off"
          placeholder="请输入用户人数"
          style="width: 280px;"
        ></el-input>
      </el-form-item>

      <el-form-item
        label="用户评分："
        :label-width="formLabelWidth"
        :rules="[
      { required: true, message: '不能为空'},]"
      >
        <el-input
          v-model="movieForm.userScore"
          autocomplete="off"
          placeholder="请输入用户评分"
          style="width: 280px;"
        ></el-input>
      </el-form-item>

      <el-form-item
        label="专业人员人数："
        :label-width="formLabelWidth"
        :rules="[
      { required: true, message: '不能为空'},]"
      >
        <el-input
          v-model="movieForm.professors"
          autocomplete="off"
          placeholder="请输入专业人员人数"
          style="width: 280px;"
        ></el-input>
      </el-form-item>

      <el-form-item
        label="专业人员评分："
        :label-width="formLabelWidth"
        :rules="[
      { required: true, message: '不能为空'},]"
      >
        <el-input
          v-model="movieForm.professorScore"
          autocomplete="off"
          placeholder="请输入专业人员评分"
          style="width: 280px"
        ></el-input>
      </el-form-item>

      <el-form-item
        label="总票房："
        :label-width="formLabelWidth"
        :rules="[
      { required: true, message: '不能为空'},]"
      >
        <el-input
          v-model="movieForm.totalBoxOffice"
          autocomplete="off"
          placeholder="请输入总票房"
          style="width: 280px;"
        ></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <div v-if="titleName == '新增'">
        <el-button @click="movieDailog = false">取 消</el-button>
        <el-button type="primary" @click="addSure">确 定是</el-button>
      </div>
      <div v-else>
        <el-button @click="movieDailog = false">取 消</el-button>
        <el-button type="primary" @click="updataBtn">修 改</el-button>
      </div>
      <!-- <el-button @click="test">test</el-button> -->
    </div>
  </el-dialog>
</template>
<script>
import { mapActions } from "vuex";
import { updataMovie } from "../http/api";
export default {
  data() {
    return {
      movieDailog: false,
      titleName: "新增",
      movieForm: {
        chineseName: "湄公河行动", //电影中文名称
        englishName: "Mei Gong He", //电影英文名称
        movieType: ["criminal"], //电影类型 动作、剧情  要求用elementui的下拉框 支持多选
        dType: "", //电影放映类型 2d 3d等 要求用elementui的下拉框  只选择一个
        playArea: "中国大陆", // 播放地区
        movieTime: "90", // 电影时长
        showTime: "", // 上映时间  要求用elementui的时间选择器
        users: "1111", // 用户人数
        userScore: "9.2", // 用户评分
        professors: "120", // 专业人员人数
        professorScore: "8.8", // 专业人员评分
        totalBoxOffice: "666666" // 总票房
      },
      formLabelWidth: "180px"
    };
  },
  mounted() {
    // 初始化页面
    // console.log(200, temp)
  },
  methods: {
    //显示弹窗组件
    showAddMovie(row, type) {
      this.titleName = type;
      this.movieForm = JSON.parse(JSON.stringify(row));
      this.movieDailog = true;
    },
    ...mapActions(["addMovies"]),
    changeMT(val) {
      this.movieForm.movieType = val;
    },
    changeDType(val) {
      this.movieForm.dType = val;
    },
    // 确定添加
    addSure() {
      let tempD = Date.parse(this.movieForm.showTime);
      this.movieForm.showTime = this.format(tempD);
      // this.$store.dispatch('addMovies')
      this.addMovies(this.movieForm);
      this.movieDailog = false;
      this.$emit("relaodMovie");
    },
    // 确定修改
    updataBtn() {
      let obj = {
        id: this.movieForm._id,
        form: this.movieForm
      };
      updataMovie(obj).then(res => {
        this.$message({
          message: "修改成功",
          type: "success"
        });
        this.movieDailog = false;
        this.$emit("relaodMovie");
      });
    },
    add0(m) {
      return m < 10 ? "0" + m : m;
    },
    format(timeStamp) {
      //timeStamp是整数，否则要parseInt转换
      var time = new Date(timeStamp);
      var y = time.getFullYear();
      var m = time.getMonth() + 1;
      var d = time.getDate();
      return y + "-" + this.add0(m) + "-" + this.add0(d);
    },

    //清空查询条件
    clearBtn() {}
  }
};
</script>