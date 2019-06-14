<template>
  <div>
    <div style="margin: 20px 0 40px;">
      <el-button type="primary" @click="classifySex">按性别统计</el-button>
      <el-button type="primary" @click="classifyAdult">是否成年统计</el-button>
      <el-button type="primary" @click="classifyPosition">位置信息统计</el-button>
      <!-- <el-button type="primary" @click="getAllList">获取英雄列表</el-button> -->
    </div>
    <div id="myChart" :style="{width: '900px', height: '600px',  margin: '0 auto'}"></div>
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations } from "vuex";
export default {
  name: "hello",
  data() {
    return {
      allData: [],
      pieData: [],
      countType: "按性别统计"
    };
  },
  computed: {
    ...mapState(["heroList"])
  },
  mounted() {
    // this.$store.commit("increment");
    this.classifySex();
  },
  methods: {
    getAllList() {
      this.$store.dispatch("getHeroList", {
        requstType: "all"
      });
    },
    classifySex() {
      this.countType = "按性别统计";
      this.$axios.post("/api/getHeroList").then(res => {
        this.allData = res.data.heroList;
        let obj = {};
        let temp = [];
        for (let i = 0; i < this.allData.length; i++) {
          if (obj[this.allData[i].heroSex] == undefined) {
            obj[this.allData[i].heroSex] = 1;
          } else {
            obj[this.allData[i].heroSex] += 1;
          }
        }
        for (let key in obj) {
          temp.push({
            name: key == "man" ? "男" : "女",
            value: obj[key]
          });
        }
        this.pieData = temp;
        this.drawLine();
      });
    },
    classifyAdult() {
      this.countType = "是否成年统计";
      let obj = {};
      let temp = [];
      let a = 0,
        notA = 0;
      for (let i = 0; i < this.allData.length; i++) {
        if (this.allData[i].age >= 18) {
          a++;
          obj["adult"] = a;
        } else {
          notA++;
          obj["teenager"] = notA;
        }
      }
      for (let key in obj) {
        temp.push({
          name: key == "adult" ? "成年" : "未成年",
          value: obj[key]
        });
      }
      this.pieData = temp;
      this.drawLine();
    },
    classifyPosition() {
      this.countType = "位置信息统计";
      let obj = {};
      let temp = [];
      for (let i = 0; i < this.allData.length; i++) {
        for (let j = 0; j < this.allData[i].heroPosition.length; j++) {
          if (obj[this.allData[i].heroPosition[j]] == undefined) {
            obj[this.allData[i].heroPosition[j]] = 1;
          } else {
            obj[this.allData[i].heroPosition[j]] += 1;
          }
        }
      }
      let tempName = {
        mid: "中单",
        miss: "上单",
        support: "辅助",
        ad: "AD-Carry",
        jungle: "打野"
      };
      for (let key in obj) {
        temp.push({
          name: tempName[key],
          value: obj[key]
        });
      }
      this.pieData = temp;
      this.drawLine();
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
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
          y: "bottom",
          data: ["rose1", "rose2"]
        },
        tooltip: {},
        series: [
          {
            name: "统计",
            type: "pie",
            radius: [20, 240],
            center: ["50%", "50%"],
            roseType: "radius",
            data: this.pieData
            //  [
            //   { value: 10, name: "rose1" },
            //   { value: 5, name: "rose2" },
            //   { value: 15, name: "rose3" },
            //   { value: 25, name: "rose4" },
            //   { value: 20, name: "rose5" },
            //   { value: 35, name: "rose6" },
            //   { value: 30, name: "rose7" },
            //   { value: 40, name: "rose8" }
            // ]
          }
        ],
        color: [
          "#FFDB5C",
          "#FB7293",
          "#E7BCF3",
          "#FF9F7F",
          "#8378EA",
          "#37A2DA",
          "#9FE6B8",
          "#7AD9DD"
        ]
      });
    }
  }
};
</script>
