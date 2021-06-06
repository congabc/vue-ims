<template>
  <div class="home">
    <h2>欢迎使用出入库管理系统</h2>
    <h3>目前在线人数: 15人</h3>
    <div
      id="myChart"
      :style="{ width: '80%', height: '300px', left: '30px' }"
    ></div>
    <div
      id="myChart1"
      :style="{ width: '80%', height: '450px', left: '30px' }"
    ></div>
    <div class="yuangong">
      <div
      id="myChart2"
      :style="{ width: '40%', height: '450px', left: '30px' }"
    ></div>
    <div
      id="myChart3"
      :style="{ width: '45%', height: '450px', position:'absolute' ,top:'0' ,right:'200px'}"
    ></div>
    </div>
  </div>
</template>

<script>
import { getList } from "@/api/home";
export default {
  name: "hello",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
    };
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      let myChart1 = this.$echarts.init(document.getElementById("myChart1"));
      let myChart2 = this.$echarts.init(document.getElementById("myChart2"));
      let myChart3 = this.$echarts.init(document.getElementById("myChart3"));
      let option = {
        title: {
          text: "销量对比图",
        },
        grid: {},
        legend: {},
        tooltip: {},
        xAxis: { type: "category" },
        yAxis: {
          type: "value",
          axisLabel: {
            formatter: "{value} 万元",
          },
        },
        series: [{ type: "bar" }, { type: "bar" }, { type: "bar" }],
        dataset: {},
      };
      let option1 = {
        title: {
          text: "成本占比",
        },
        grid: {},
        legend: {},
        
        xAxis: { type: "category" },
        yAxis: {
          type: "value",
          axisLabel: {
            formatter: "{value} 万元",
          },
        },
        series: [
          {
            type: "pie",
            name: "营收额占比",
            radius: "60%",
            center: ["25%", "40%"],
            
            encode: {
                        itemName: 0,//名字为第三列
                        value: 1//值为第四列
                    }
          },
          {
            type: "pie",
            name: "毛利率占比",
            radius: "60%",
            center: ["65%", "40%"],
            
            encode: {
                        itemName: 2,//名字为第三列
                        value: 3//值为第四列
                    }
          },
          
        ],
        dataset: {},
      };
      let option2 = {
        title: {
          text: "业务员业绩占比",
          left: 'center'
        },
        grid: {},
        legend: {
          orient: 'vertical',
          left: 'left',
        },
        tooltip:{},
        xAxis: { type: "category" },
        yAxis: {
          type: "value",
          axisLabel: {
            formatter: "{value} 万元",
          },
        },
        series: [
          {
            type: "pie",
            name: "业务员占比",
            radius: "50%",
            center: ["50%", "40%"],
            encode: {
                        itemName: 0,//名字为第三列
                        value: 1//值为第四列
                    }
          },
          
          
        ],
      }
      let option3 = {
        title: {
          text: "司机配送占比",
          left: 'center'
        },
        grid: {},
        legend: {
          orient: 'vertical',
        left: 'left',
        },
        tooltip:{},
        xAxis: { type: "category" },
        yAxis: {
          type: "value",
          axisLabel: {
            formatter: "{value} 万元",
          },
        },
        series: [
          {
            type: "pie",
            name: "业务员占比",
            radius: "50%",
            center: ["50%", "40%"],
            
            encode: {
                        itemName: 2,//名字为第三列
                        value: 3//值为第四列
                    }
          },
          
          
        ],
      }
      getList().then((response) => {
        if (response.flag) {
          option.dataset = {
            source: response.data,
          }
            option1.dataset = {
              source: response.data1,
            }
            option2.dataset = {
              source: response.data2,
            }
            option3.dataset = {
              source: response.data2,
            }
            option1.tooltip= {
              trigger: 'item',
              formatter: function(data){
                if(data.seriesName=="营收额占比"){
                return data.seriesName + "<br/>"+ data.name+ " : " + data.value[1]+"万元" + " ("+data.percent.toFixed(1)+"%)";
                }else{
                return data.seriesName + "<br/>"+ data.name+ " : " + data.value[3]+"万元" + " ("+data.percent.toFixed(1)+"%)";
                }
              }
            },
            option2.tooltip= {
              trigger: 'item',
              formatter: function(data){
                return data.seriesName + "<br/>"+ data.name+ " : " + data.value[1]+"万元" + " ("+data.percent.toFixed(1)+"%)";
                
              }
            },
            option3.tooltip= {
              trigger: 'item',
              formatter: function(data){
                return data.seriesName + "<br/>"+ data.name+ " : " + data.value[3]+"件" + " ("+data.percent.toFixed(1)+"%)";
                
              }
            },
            
   
            // 绘制图表
            option && myChart.setOption(option);
          option1 && myChart1.setOption(option1);
          option2 && myChart2.setOption(option2);
          option2 && myChart3.setOption(option3);
        }
      });
    },
  },
};
</script>

<style scoped>
div h2 {
  text-align: center;
}
.yuangong{
  position: relative;
}
.myChart3{
  position: absolute;
  left: 50%;
}
</style>