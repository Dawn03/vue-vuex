<template>
  <div style="margin: 30px 0 0 0;">
    <el-form :inline="true" :model="searchForm" class="demo-form-inline">
      <el-form-item label="电影类型：">
        <el-select @change="changeDtype" v-model="searchForm.dType" placeholder="请选择">
          <el-option label="2D" value="2D"></el-option>
          <el-option label="3D" value="3D"></el-option>
          <el-option label="2DIMAX" value="2DIMAX"></el-option>
          <el-option label="3DMAX" value="3DMAX"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="剧情类型：">
        <el-select @change="changeMovietype" v-model="searchForm.movieType" placeholder="请选择">
          <el-option label="爱情" value="loving"></el-option>
          <el-option label="动作" value="action"></el-option>
          <el-option label="犯罪" value="criminal"></el-option>
          <el-option label="喜剧" value="comedy"></el-option>
          <el-option label="推理" value="inference"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchMovie">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="danger" @click="cleatAll">清空</el-button>
      </el-form-item>
    </el-form>
    <el-row>
      <div style="padding: 20px 0; border-bottom: 1px solid #EBEEF5; border-top: 1px solid #EBEEF5;">
        <el-button type="primary" @click="addMovie">+ 添加</el-button>
        <el-button type="primary" @click="relaodMovie(pageRow, 1)">重载</el-button> {{tableH}}
      </div>
    </el-row>
    <el-table height='650' :data="movieListData.movieList" border style="width: 100%;">
      <el-table-column prop="chineseName" label="中文名称" align="center"></el-table-column>
      <el-table-column prop="englishName" label="英文名称" align="center"></el-table-column>
      <el-table-column prop="changeMovieType" label="剧情类型" align="center">
        <template slot-scope="scope">
          <span v-for="item in scope.row.changeMovieType">{{item + ' '}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="dType" label="电影类型" align="center"></el-table-column>
      <el-table-column prop="playArea" label="播放地区" align="center"></el-table-column>
      <el-table-column prop="movieTime" label="电影时长" align="center"></el-table-column>
      <el-table-column prop="showTime" label="上映时间" align="center"></el-table-column>
      <el-table-column prop="users" label="用户人数" align="center"></el-table-column>
      <el-table-column prop="userScore" label="用户评分" align="center"></el-table-column>
      <el-table-column prop="professors" label="专业人数" align="center"></el-table-column>
      <el-table-column prop="professorScore" label="专业评分" align="center"></el-table-column>
      <el-table-column prop="totalBoxOffice" label="总票房" align="center"></el-table-column>
      <el-table-column label="操作" width="300" align="center">
        <template slot-scope="scope">
          <el-row>
            <el-button @click="updataList(scope.row)" type="success" size="mini">修改</el-button>
            <el-button @click="deleteMovieById(scope.row._id)" type="danger" size="mini">删除</el-button>
            <!-- <el-button type="warning" size="mini">添加图片</el-button> -->
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
        :total="movieListData.total"
      ></el-pagination>
    </div>
    <MovieDailog ref="showMovie" @relaodMovie="relaodMovie"></MovieDailog>
  </div>
</template>
<script>
import MovieDailog from "./movieModel";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import { deleteMovie } from "../http/api";
import Vue from "vue";
export default {
  data() {
    return {
      pageRow: 4,
      pageNumber: 1,
      searchForm: {
        movieType: "",
        dType: ""
      }
    };
  },
  components: {
    MovieDailog
  },
  computed: {
    ...mapState(["movieListData"]),
    ...mapGetters(["todoData"]),
    test() {
      return this.$store.state.arr.filter(todo => todo > 2);
    }
  },
  mounted() {
    this.getMovies({
      pageRow: this.pageRow,
      pageNumber: this.pageNumber
    });
  },
  methods: {
    ...mapMutations(["TEST"]),
    ...mapActions(["getMovies"]),
    //修改
    updataList(row) {
      this.$refs.showMovie.showAddMovie(row, "修改");
    },
    //删除
    deleteMovieById(id) {
      let _this = this;

      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteMovie(id).then(res => {
            _this.$message({
              message: "删除成功",
              type: "success"
            });
            _this.getMovies({
              pageRow: this.pageRow,
              pageNumber: this.pageNumber
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //重载列表
    relaodMovie(pageRow = this.pageRow, pageNumber = this.pageNumber) {
      console.log(pageRow, pageNumber);
      this.getMovies({
        pageRow: pageRow,
        pageNumber: pageNumber
      });
      this.pageNumber = pageNumber;
      this.pageRow = pageRow;
    },
    changeDtype(val) {
      this.searchForm.dType = val;
    },
    changeMovietype(val) {
      this.searchForm.movieType = val;
    },
    // 搜索
    searchMovie() {
      let obj = {
        movieType: this.searchForm.movieType,
        dType: this.searchForm.dType,
        pageRow: this.pageRow,
        pageNumber: 1
      };
      this.getMovies(obj);
    },
    //清空
    cleatAll() {
      this.searchForm.dType = "";
      this.searchForm.movieType = "";
      this.pageNumber = 1;
      this.getMovies({
        pageRow: this.pageRow,
        pageNumber: this.pageNumber
      });
    },
    //添加
    addMovie() {
      this.$refs.showMovie.showAddMovie({}, "添加");
    },
    // 设置每页显示条数
    handleSizeChange(val) {
      this.pageRow = val;
      this.getMovies({
        pageRow: this.pageRow,
        pageNumber: this.pageNumber
      });
    },
    //翻页
    handleCurrentChange(val) {
      this.pageNumber = val;
      this.getMovies({
        pageRow: this.pageRow,
        pageNumber: this.pageNumber
      });
    }
  }
};
</script>