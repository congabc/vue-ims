<template>
  <div>
    
    
    <!-- 库存 -->
    <!-- 数据渲染 -->
    <el-table
      :data="list"
      style="width: 100%"
      ref="refTable"
      show-summary
      max-height="600"
    >
      <el-table-column prop="name" label="商品" width="100"> </el-table-column>
      <el-table-column prop="price" label="进货单价" min-width="100"></el-table-column>
      <el-table-column prop="price1" label="出库单价" min-width="100"></el-table-column>
      <el-table-column prop="purchase" label="进货数量" min-width="100"></el-table-column>
      <el-table-column prop="shipment" label="出库数量" min-width="100"></el-table-column>
      <el-table-column prop="repertory" label="库存" min-width="100"></el-table-column>
      <el-table-column prop="money" label="支付金额" min-width="100"></el-table-column>
      <el-table-column  prop="money1"  label="收款金额"  min-width="100"></el-table-column>
      <el-table-column prop="repertory1" label="库存资金" min-width="100"></el-table-column>
      <el-table-column prop="repertory2" label="利润" min-width="100"></el-table-column>
    </el-table>
   
  </div>
</template>

<script>
export default {
  
  data() {
    return {
      list:[
        {name:"白云边",price:100,price1:0,purchase:1200,shipment:895,repertory:0,money:0,money2:0},
        {name:"洋河",price:210,price1:0,purchase:700,shipment:450,repertory:0,money:0,money2:0},
        {name:"泸州老窖",price:80,price1:0,purchase:500,shipment:258,repertory:0,money:0,money2:0},
        {name:"苏烟",price:20,price1:0,purchase:150,shipment:148,repertory:0,money:0,money2:0},
        {name:"芙蓉王",price:30,price1:0,purchase:165,shipment:136,repertory:0,money:0,money2:0},
        {name:"黄鹤楼",price:30,price1:0,purchase:220,shipment:215,repertory:0,money:0,money2:0},
        {name:"红牛",price:58,price1:0,purchase:2500,shipment:1250,repertory:0,money:0,money2:0},
        {name:"营养快线",price:45,price1:0,purchase:3000,shipment:2257,repertory:0,money:0,money2:0},
        {name:"茶π",price:60,price1:0,purchase:1500,shipment:685,repertory:0,money:0,money2:0},
        {name:"怡宝",price:22,price1:0,purchase:8900,shipment:5500,repertory:0,money:0,money2:0},
        {name:"农夫山泉",price:24,price1:0,purchase:9000,shipment:6800,repertory:0,money:0,money2:0},
        {name:"百岁山",price:40,price1:0,purchase:4500,shipment:2550,repertory:0,money:0,money2:0},
        {name:"三只松鼠",price:18,price1:0,purchase:1850,shipment:1150,repertory:0,money:0,money2:0},
        {name:"良品铺子",price:25,price1:0,purchase:1500,shipment:890,repertory:0,money:0,money2:0},
        {name:"蒙牛",price:70,price1:0,purchase:1000,shipment:650,repertory:0,money:0,money2:0},
        {name:"香飘飘",price:66,price1:0,purchase:800,shipment:350,repertory:0,money:0,money2:0},
        {name:"纯牛奶",price:58,price1:0,purchase:1200,shipment:890,repertory:0,money:0,money2:0},
      ]
    };
  },
  created() {
    // 初始化获取列表数据
    this.fetchData();
  },
  methods: {
    fetchData(){
      this.list.map(item=>{
        item.price1=Math.ceil(item.price*1.2)
        item.repertory=item.purchase-item.shipment
        item.money=item.price*item.purchase
        item.money1=item.price1*item.shipment
        item.repertory1=item.repertory*item.price
        item.repertory2=item.money1+item.repertory1-item.money
      })
    }
  },
};
</script>

<style scoped>
.search {
  margin-bottom: 20px;
}
.el-input {
  width: 200px;
  margin-right: 10px;
}
.el-table tr:hover {
  background-color: #e4e7ed !important;
  color: #000 !important;
}
</style>