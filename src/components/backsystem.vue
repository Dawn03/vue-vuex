<template>
  <div style="margin: 50px 0 0 0;">
    <el-form :inline="true" :model="searchForm" class="demo-form-inline">
      <el-form-item label="英雄：">
        <el-input v-model="searchForm.name" placeholder="请输入英雄名称"></el-input>
      </el-form-item>
      <el-form-item label="位置：">
        <el-select v-model="searchForm.position" placeholder="请选择">
          <el-option label="中单" value="mid"></el-option>
          <el-option label="adc" value="ad"></el-option>
          <el-option label="打野" value="jungle"></el-option>
          <el-option label="上单" value="miss"></el-option>
          <el-option label="辅助" value="support"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="性别：">
        <el-select v-model="searchForm.sex" placeholder="请选择">
          <el-option label="男" value="man"></el-option>
          <el-option label="女" value="woman"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchList">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="danger" @click="clearBtn">清空</el-button>
      </el-form-item>
    </el-form>
    <el-divider></el-divider>
    <el-row>
      <el-button type="primary" @click="add">+ 添加</el-button>
      <el-button type="primary" @click="count">重载</el-button>
      <!-- <el-button type="primary" @click="movieAdd">添添</el-button> -->
      <!-- <el-button type="primary" @click="movieLook">看看</el-button> -->
    </el-row>
    <el-divider></el-divider>

    <el-table :data="heroList" border style="width: 100%;">
      <el-table-column prop="heroName" label="英雄" align="center"></el-table-column>
      <el-table-column prop="age" label="年龄" align="center"></el-table-column>
      <el-table-column prop="heroSexChange" label="性别" align="center"></el-table-column>
      <el-table-column prop="address" label="籍贯" align="center"></el-table-column>
      <el-table-column prop="heroPosition" label="位置" align="center">
        <template slot-scope="scope">
          <span v-for="item in scope.row.heroPosition">{{item}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="favourite" label="台词" align="center"></el-table-column>
      <el-table-column prop="explain" label="背景" align="center"></el-table-column>
      <el-table-column label="操作" width="400" align="center">
        <template slot-scope="scope">
          <el-row>
            <el-button type="primary" size="mini">详情</el-button>
            <el-button @click="updataList(scope.row)" type="success" size="mini">修改</el-button>
            <el-button @click="deleteId(scope.row)" type="danger" size="mini">删除</el-button>
            <el-button type="warning" size="mini">添加图片</el-button>
          </el-row>
        </template>
      </el-table-column>
    </el-table>

    <div class="block" style="float:right; margin: 20px 0;">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNumber"
        :page-sizes="[2, 4, 10, 20]"
        :page-size="pageRow"
        layout="total, sizes, prev, pager, next, jumper"
        :total="heroTotal"
      ></el-pagination>
    </div>

    <el-dialog :title="titleName" :visible.sync="dialogFormVisible" width="60%">
      <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline">
        <el-form-item
          label="英雄："
          :label-width="formLabelWidth"
          :rules="[
      { required: true, message: '不能为空'},]"
        >
          <el-input v-model="formInline.heroName" autocomplete="off" placeholder="请输入英雄名称"></el-input>
        </el-form-item>
        <el-form-item
          label="年龄："
          :label-width="formLabelWidth"
          :rules="[
      { required: true, message: '不能为空'},]"
        >
          <el-input v-model="formInline.age" autocomplete="off" placeholder="请输入英雄年龄"></el-input>
        </el-form-item>
        <el-form-item
          label="性别："
          :label-width="formLabelWidth"
          :rules="[
      { required: true, message: '不能为空'},]"
        >
          <el-select v-model="formInline.heroSexChange" placeholder="请选择英雄性别">
            <el-option label="男" value="man"></el-option>
            <el-option label="女" value="woman"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="籍贯："
          :label-width="formLabelWidth"
          :rules="[
      { required: true, message: '不能为空'},]"
        >
          <el-input v-model="formInline.address" autocomplete="off" placeholder="请输入英雄籍贯"></el-input>
        </el-form-item>
        <el-form-item
          label="位置："
          :label-width="formLabelWidth"
          :rules="[
      { required: true, message: '不能为空'},]"
        >
          <el-select
            @change="changePosition"
            v-model="formInline.heroPosition"
            multiple
            placeholder="请选择英雄位置"
          >
            <el-option label="中单" value="mid"></el-option>
            <el-option label="打野" value="jungle"></el-option>
            <el-option label="上单" value="miss"></el-option>
            <el-option label="辅助" value="support"></el-option>
            <el-option label="adc" value="ad"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="台词："
          :label-width="formLabelWidth"
          :rules="[
      { required: true, message: '不能为空'},]"
        >
          <el-input v-model="formInline.favourite" autocomplete="off" placeholder="请输入英雄台词"></el-input>
        </el-form-item>
        <el-form-item
          label="背景："
          :label-width="formLabelWidth"
          :rules="[
      { required: true, message: '不能为空'},]"
        >
          <el-input
            v-model="formInline.explain"
            autocomplete="off"
            placeholder="请输入英雄背景"
            type="textarea"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <div v-if="titleName == '新增'">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addSure">确 定</el-button>
        </div>
        <div v-else>
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="updataBtn">修 改</el-button>
        </div>
        <!-- <el-button @click="test">test</el-button> -->
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      searchForm: {
        name: "",
        sex: "",
        position: ""
      },
      tableData: [],
      total: 0,
      pageNumber: 1,
      pageRow: 2,
      titleName: "新增",
      formInline: {
        heroName: "",
        explain: "",
        age: "",
        heroSex: "",
        address: "",
        heroPosition: [],
        favourite: ""
      },
      dialogFormVisible: false,
      formLabelWidth: "120px"
    };
  },
  mounted() {
    // 初始化页面

    // console.log(200, temp)
    this.initPage(this.pageRow, this.pageNumber, this.searchForm);
  },
  computed: {
    ...mapState(["heroList", "heroTotal"])
  },
  methods: {
    ...mapActions(["getHeroList"]),
    changePosition(val) {
      // console.log(197, val);
    },
    //统计
    count() {
      this.$router.push("/detail");
    },
    movieAdd() {
      this.$axios
        .post("/api/addMovie", {
          chineseName: "String1", //电影中文名称
          englishName: "String1", //电影英文名称
          movieType: ["dd"], //电影类型 动作、剧情
          dType: "String1", //电影放映类型 2d 3d等
          playArea: "String1", // 播放地区
          movieTime: "String1", // 电影时长
          showTime: "String1", // 上映时间
          users: "String1", // 用户人数
          userScore: "String1", // 用户评分
          professors: "String1", // 专业人员人数
          professorScore: "String1", // 专业人员评分
          totalBoxOffice: "String1" // 总票房
        })
        .then(res => {
          console.log(res);
        });
    },
    movieLook() {
      this.$axios
        .post("/api/getMovieList", {
          pageRow: 2,
          pageNumber: 1
        })
        .then(res => {});
    },
    //页面变化调用方法
    initPage(size, page, searchParams) {
      this.getHeroList({
        pageNumber: page, //当前所在页码
        pageRow: size, //每页显示多少条数据
        heroName: searchParams.name,
        heroSex: searchParams.sex,
        heroPosition: searchParams.position
      });
      // this.$axios
      //   .post("/api/getHeroList", {
      //     pageNumber: page, //当前所在页码
      //     pageRow: size, //每页显示多少条数据
      //     heroName: searchParams.name,
      //     heroSex: searchParams.sex,
      //     heroPosition: searchParams.position
      //   })
      //   .then(res => {
      //     let result = res.data.heroList;
      //     for (let i = 0; i < result.length; i++) {
      //       result[i].heroSexChange = result[i].heroSex == "man" ? "男" : "女";
      //       for (let j = 0; j < result[i].heroPosition.length; j++) {
      //         switch (result[i].heroPosition[j]) {
      //           case "mid":
      //             result[i].heroPosition[j] = "中单 ";
      //             break;
      //           case "miss":
      //             result[i].heroPosition[j] = "上单 ";
      //             break;
      //           case "support":
      //             result[i].heroPosition[j] = "辅助 ";
      //             break;
      //           case "ad":
      //             result[i].heroPosition[j] = "AD-Carry ";
      //             break;
      //           case "jungle":
      //             result[i].heroPosition[j] = "打野 ";
      //             break;
      //         }
      //       }
      //     }
      //     this.total = res.data.total;
      //     this.tableData = result;
      //   });
    },
    // 触发添加
    add() {
      this.titleName = "新增";
      this.dialogFormVisible = true;
      this.clearForm();
    },
    // 确定添加
    addSure() {
      this.dialogFormVisible = false;
      this.$axios
        .post("/api/addHero", {
          heroName: "皮卡丘22",
          explain: "sds",
          age: 11,
          heroSex: "woman",
          address: "航天科技",
          heroPosition: ["mid"],
          favourite: "皮卡皮卡"
        })
        .then(res => {
          console.log(res);
        });
    },
    //查询
    searchList() {
      this.initPage(this.pageRow, this.pageNumber, this.searchForm);
    },
    //清空查询条件
    clearBtn() {
      this.searchForm = {
        position: "",
        sex: "",
        name: ""
      };
      this.initPage(this.pageRow, this.pageNumber, this.searchForm);
    },
    //设置每页显示条数
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageRow = val;
      this.pageNumber = 1;
      this.initPage(val, this.pageNumber, this.searchForm);
    },
    // 翻页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageNumber = val;
      this.initPage(this.pageRow, val, this.searchForm);
    },
    // 触发修改
    updataList(row) {
      // console.log(row);
      this.titleName = "修改";
      for (let i = 0; i < row.heroPosition.length; i++) {
        switch (row.heroPosition[i]) {
          case "中单 ":
            row.heroPosition[i] = "mid";
            break;
          case "上单 ":
            row.heroPosition[i] = "miss";
            break;
          case "辅助 ":
            row.heroPosition[i] = "support";
            break;
          case "AD-Carry ":
            row.heroPosition[i] = "ad";
            break;
          case "打野 ":
            row.heroPosition[i] = "jungle";
            break;
        }
      }
      // console.log(351, row);
      this.formInline = row;
      this.dialogFormVisible = true;
    },
    test() {
      console.log(311, this.titleName);
      let url = "";
      let method = "";
      if (this.titleName == "新增") {
        url = "/api/addHero";
        method = "post";
      } else {
        url = `/api/modifyHero/${this.formInline._id}`;
        method = "put";
      }
      console.log(323, url, method);
      // return;
      this.$axios[method](url, {
        heroName: this.formInline.heroName,
        heroSex: this.formInline.sex,
        heroPosition: this.formInline.heroPosition,
        explain: this.formInline.explain,
        age: this.formInline.age,
        favourite: this.formInline.favourite,
        address: this.formInline.address,
        imgArr: this.formInline.imgArr
      }).then(res => {
        this.initPage(this.pageRow, this.pageNumber, this.searchForm);
        this.dialogFormVisible = false;
        this.clearForm();
      });
    },
    // 确定修改
    updataBtn() {
      // console.log(arr);
      this.$axios
        .put(`/api/modifyHero/${this.formInline._id}`, {
          heroName: this.formInline.heroName,
          heroSex: this.formInline.heroSex,
          heroPosition: this.formInline.heroPosition,
          explain: this.formInline.explain,
          age: this.formInline.age,
          favourite: this.formInline.favourite,
          address: this.formInline.address,
          imgArr: this.formInline.imgArr
        })
        .then(res => {
          this.initPage(this.pageRow, this.pageNumber, this.searchForm);
          this.dialogFormVisible = false;
          this.clearForm();
        });
    },
    clearForm() {
      this.formInline = {
        heroName: "",
        explain: "",
        age: "",
        heroSex: "",
        address: "",
        heroPosition: [],
        favourite: ""
      };
    },
    deleteId(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios.delete(`/api/deleteHero/${row._id}`).then(res => {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.initPage(this.pageRow, this.pageNumber, this.searchForm);
            this.clearForm();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
el-table-column {
  text-align: center;
}
</style>
