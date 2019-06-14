<template>
  <div>
    <div style="margin: 20px auto; ">
      <el-button type="primary" @click="classifyDtype">按电影类型</el-button>
      <el-button type="primary" @click="classifyMovie">按剧情类型</el-button>
    </div>
    <div id="myChartMovie" :style="{width: '900px', height: '600px',  margin: '0 auto'}"></div>
  </div>
</template>
<script>
import { mapMutations, mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      countType: "电影类型",
      //   barData: [10, 52, 200, 334, 390, 330, 220],
      xData: ["2D", "3D", "2DIMAX", "3DMAX"]
    };
  },
  mounted() {
    this.initPage();
  },
  computed: {
    ...mapState(["movieTypeCount"]),
    testStrReslut: {
      get() {
        return this.$store.state.testStr;
      },
      set(value) {
        this.$store.commit("updateStr", value);
      }
    }
  },
  methods: {
    ...mapActions(["getALLMovie"]),
    ...mapMutations(["getDtype", "getMovieType"]),
    initPage() {
      this.getALLMovie({
        pageRow: 22,
        pageNumber: 1
      }).then(res => {
        this.getDtype();
        this.drawLine();
      });
    },
    classifyDtype() {
      this.getDtype();
      this.drawLine();
    },
    classifyMovie() {
      this.getMovieType();
      this.drawLine();
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChartMovie = this.$echarts.init(
        document.getElementById("myChartMovie")
      );
      // 绘制图表
      myChartMovie.setOption({
        title: {
          text: this.countType,
          subtext: "",
          x: "center",
          textStyle: {
            // color: "#32C5E9"
          }
        },
        legend: {
          x: "center",
          y: "bottom"
          //   data: ["rose1", "rose2"]
        },
        tooltip: {},
        //调整距离画布的位置
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: this.movieTypeCount.arrType,
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            type: "bar",
            barWidth: "60%",
            data: this.movieTypeCount.arrCount //[10, 52, 200, 1000]
          }
        ],
        color: ["#FFDB5C"]
      });
    }
  }
};
</script>
