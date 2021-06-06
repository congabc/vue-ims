<template>
  <div>
    <!-- 供应商酒类 -->
    <el-form
      :inline="true"
      :model="formInline"
      ref="formInline"
      class="demo-form-inline">
      <el-form-item label="店名" prop="store">
        <el-input v-model="formInline.store" placeholder="请输入需要查找的店名"></el-input>
      </el-form-item>
      <el-form-item label="联系人" prop="name">
        <el-input v-model="formInline.name" placeholder="请输入需要查找的联系人"></el-input>
      </el-form-item>
      <el-form-item label="电话" prop="phone">
        <el-input v-model="formInline.phone" placeholder="请输入需要查找的电话"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchData('formInline')" icon="el-icon-search">搜 索</el-button>
      </el-form-item>
      <el-form-item>
        <el-button  type="primary"  icon="el-icon-refresh-right"  @click="resetForm('formInline')"  >重 置</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onAdd('formInline')" :disabled="$store.state.iftrue==='admin'?false:true">
          <i class="el-icon-upload el-icon--right"></i>
          <span>新 增</span> 
        </el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="undistributed('formInline')">
          <i class="el-icon-upload el-icon--right"></i>
          <span>未分配</span> 
        </el-button>
      </el-form-item>
    </el-form>
    <!-- 新增用户 -->
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
      <el-form :rules="rules" :model="formList" ref="form">
        <el-form-item label="店名" :label-width="formLabelWidth" prop="store">
          <el-input  v-model="formList.store"  autocomplete="off"  style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth" prop="remark">
          <el-input  value="0"  v-model="formList.remark"  autocomplete="off"  style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
          <el-input  v-model="formList.name"  autocomplete="off"  style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item  label="电话号码"  :label-width="formLabelWidth"  prop="phone">
          <el-input  v-model="formList.phone"  autocomplete="off"  style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item label="地址" :label-width="formLabelWidth" prop="address">
          <el-input  v-model="formList.address"  autocomplete="off"  style="width: 300px"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitData('form')">提 交</el-button>
        <el-button  type="primary"  icon="el-icon-refresh-right"  @click="resetForm('form')"  >重 置</el-button>
      </div>
    </el-dialog>
    <!-- 品项 -->
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible1">
      <el-form :model="gridData" ref="Data">
        <el-form-item label="产品名称" :label-width="formLabelWidth" prop="remark">
          <el-input v-model="gridData.remark" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="单价" :label-width="formLabelWidth" prop="price">
          <el-input v-model="gridData.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="进货数量" :label-width="formLabelWidth" prop="amount">
          <el-input v-model="gridData.amount" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="实付金额" :label-width="formLabelWidth" prop="money1">
          <el-input v-model="gridData.money1" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="addOrderForm('Data')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 数据渲染 -->
    <el-table
      :data="list"
      :key="symbolKey"
      style="width: 100%"
      ref="refTable"
      :summary-method="getTotal"
      show-summary
      :row-class-name="tableRowClassName"
      @row-click="clickTable"
      max-height="800"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-table
            :key="symbolKey"
            :default-sort="{ prop: 'date', order: 'ascending' }"
            :data="props.row.data"
            show-summary
            style="width: 100%"
          >
            <el-table-column type="expand">
        <template slot-scope="props">
          <el-table
            :key="symbolKey"
            :default-sort="{ prop: 'date', order: 'ascending' }"
            :data="props.row.data"
            :summary-method="getTotal"
            show-summary
            style="width: 100%"
          >
            <el-table-column property="remark" label="产品" width="150"></el-table-column>
            <el-table-column property="price" label="单价" width="200"></el-table-column>
            <el-table-column property="amount" label="数量"></el-table-column>
            <el-table-column property="money" label="金额"></el-table-column>
            <el-table-column label="操作" width="180">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="danger"
                  @click="childrenHandleDelete(scope.$index, scope.row)"
                  :disabled="$store.state.iftrue==='admin'?false:true"
                  >删除</el-button>
                
              </template>
            </el-table-column>
            </el-table>
        </template>
      </el-table-column>
            <el-table-column sortable prop="date" label="日期" width="180">
            </el-table-column>
            <el-table-column prop="totalAmount" label="进货数量"> </el-table-column>
            <el-table-column prop="totalMoney" label="进货金额"> </el-table-column>
            <el-table-column prop="proceedsMoney" label="收款金额"> </el-table-column>
            <el-table-column  prop="status"  label="状态"  min-width="80">
              <template slot-scope="scope">
              {{scope.row.status?"已配送":"未配送"}}
              </template>
            </el-table-column>
            <el-table-column label="操作" width="180">
              <template slot-scope="scope">
                  <el-button  type="primary"  size="mini"  @click="handleEdit(scope.$index, scope.row)" :disabled="$store.state.iftrue==='admin'?false:true">添加品项</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="childrenHandleDelete(scope.$index, scope.row)"
                  >删除</el-button>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="180">
              <template slot-scope="scope">
                  <el-button  type="primary"  size="mini" @click="fenpeiOrder(scope.$index, scope.row)"  v-if="scope.row.status==false" :disabled="$store.state.iftrue==='admin'?false:true">分配</el-button>
              </template>
            </el-table-column>
            
          </el-table>
        </template>
      </el-table-column>
      <el-table-column prop="store" label="店名" width="150"> </el-table-column>
      <el-table-column label="配送信息">
        <el-table-column prop="name" label="姓名" min-width="80"></el-table-column>
        <el-table-column label="地址">
          <el-table-column prop="phone" label="联系电话" min-width="120"></el-table-column>
          <el-table-column prop="address" label="地址" min-width="200"></el-table-column>
          <el-table-column prop="gross" label="进货总量" min-width="65"></el-table-column>
          <el-table-column prop="money" label="应付金额" min-width="80"></el-table-column>
          <el-table-column  prop="payment"  label="实付金额"  min-width="80"></el-table-column>
          <el-table-column  prop="arrearage"  label="待付金额"  min-width="80"></el-table-column>
        </el-table-column>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button  type="primary"  size="mini"  @click="handleEdit1(scope.$index, scope.row)" >添加订单</el-button>
          <el-button  size="mini"  type="danger"  @click="handleDelete(scope.$index, scope.row)"  :disabled="$store.state.iftrue==='admin'?false:true">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分配 -->
    <el-dialog title="分配" :visible.sync="dialogFormAllocation" width="600px">
      <motorman @option-motorman="optionMotorman" :isDialog="true"></motorman>
    </el-dialog>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
import { pagingList10 ,pagingList20 ,fenpei} from "@/api/terminal";
import Motorman from "@/views/staff/motorman";
export default {
  components: {Motorman},
  data() {
    var isNum = (rule, value, callback) => {
      const age= /^[0-9]*$/
      if (!age.test(value)) {
        callback(new Error('手机号只能为数字'))
      }else{
        callback()
      }
    }
    return {
      list: [],
      listChildren:[],
      arr1: [],
      gridData:{
        date:"2021-5-23",
        name:'',
        amount:'',
        price:'',
        money1:null
      },
      dialogFormVisible1:false,
      dialogTableVisible:false,
      dialogFormAllocation:false,
      total:0,
      dialogFormVisible:false,
      pageSize:10,
      currentPage: 1,
      formLabelWidth:"200px",
      row:null,
      formList:{
        store:'',
        remark: '',
        name:'',
        phone:'',
        amount:'',
      },
      rules:{
        store:[
          {required: true, message: '请输入店名', trigger: 'blur'}
        ],
        name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 1, max: 8, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
        phone:[
          { required: true, message: '请输入电话', trigger: 'blur' },
          { validator: isNum, trigger: 'blur' },
          { min: 8, max: 11, message: '请输入手机号', trigger: 'blur' }
        ],
        address:[
          {required: true, message: '请输入地址', trigger: 'blur'}
        ],
      },
      symbolKey:null,
      formInline: {
        name: "",
        phone: "",
        store: "",
      }
    };
  },
  created() {
    // 初始化获取列表数据
    this.fetchData();
  },
  methods: {
    fenpeiOrder(index,row){
      this.gridData=row
      this.dialogFormAllocation=true
    },
    optionMotorman(currentRow){
      let data= {
        store:this.gridData,
        metoman:currentRow
      }
      fenpei(data).then(response=>{
        if(response.flag){
          this.$message({
              showClose: true,
              message: '订单分配成功',
              type: 'success'
            });
        }
      })
      this.dialogFormAllocation=false

    },
    // 未分配
    undistributed(){
      let list =this.list
      list.map(item=>{
        // 倒叙遍历
        for (let i = item.data.length - 1; i >= 0; i--) {
          if(item.data[i].status){
            let index = item.data.indexOf(item.data[i])
            item.data.splice(index,1)
          }
        }
      })
      // 重新赋值，激活刷新视图
      this.list=list
      this.symbolKey = Symbol(new Date().toString())
    },
    // 添加订单
    handleEdit1(index){
      let id = Math.floor(Math.random() * 10000);
      let userId=this.list[index].id
      let order= {
        date:"2021-05-26",
        totalAmount:0,
        totalMoney:0,
        proceedsMoney:0,
        id:id,
        userId:userId,
        status:false,
        data:[]
      }
      this.list[index].data.push(order)
    },
    childrenList(){
      this.dialogFormVisible1=true
    },
    // 计算总数返回结果
    getTotal(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
        sums[index] = '合计';
        return;
        }
        const values = data.map(item => Number(item[column.property]));
        switch (column.property){
          case 'gross':
            this.totalCount(sums,values,index)
          break;
          case 'money':
            this.totalCount(sums,values,index)
          break;
          case 'money1':
            this.totalCount(sums,values,index)
          break;
          case 'amount':
            this.totalCount(sums,values,index)
          break;
          default:
            break
        }
      });
      return sums;
    },
    // 合计计算总数函数逻辑
    totalCount(sums,values,index){
      sums[index] = values.reduce((prev, curr) => {
        const value = Number(curr);
        if (!isNaN(value)) {
          return prev + curr;
        } else {
          return prev;
        }
      }, 0);
    },
    // 点击行展开
    clickTable(row,index,e){
      this.$refs.refTable.toggleRowExpansion(row)
      if(e.path[1].tagName.toLowerCase()=="button"){
        this.$refs.refTable.toggleRowExpansion(row,false)
      }
    },
    // 收款不全警告
    tableRowClassName({row, rowIndex}) {
      if(row.money != row.payment){
        return 'warning-row';
      }
      return '';
    },
    // 处理money
    updateList(data){
      this.list=data
    },
    // 删除客户
    handleDelete(index,row){
      this.fetchData(this.total)
    },
    // 删除订单
    childrenHandleDelete(index,row){
      this.list.filter(item=>{
        // 找到点击的那条数据
        if(item.id == row.userId){
          // 删除数据
          if(row.orderId){
            item.data.filter(item=>{
              if(item.id==row.orderId){
                let index =item.data.indexOf(row)
                item.data.splice(index,1)
                this.symbolKey = Symbol(new Date().toString())
                let hejiAmount =this.getTotalData(item.orderId,item,"amount")
                let hejiMoney =this.getTotalData(item.orderId,item,"money")
                item.totalAmount=hejiAmount
                item.totalMoney=hejiMoney
                item.proceedsMoney =(item.proceedsMoney-0)- (row.money-0)
              }
            })
          }else{
            let index =item.data.indexOf(row)
          // 刷新界面让修改的数据生效
          this.symbolKey = Symbol(new Date().toString())
          // 修改主表格数据
          item.data.splice(index,1)
          }
          let proceedsMoney =this.getTotalData(item.userId,item,"proceedsMoney")
          let totalAmount =this.getTotalData(item.userId,item,"totalAmount")
          let totalMoney =this.getTotalData(item.userId,item,"totalMoney")
          item.gross=totalAmount
          item.money=totalMoney
          item.payment=proceedsMoney
          item.arrearage =(item.money-0)- (item.payment-0)
        }
      })
    },
    // 新增客户
    onAdd(formName){
      this.$refs[formName].validate(valid => {
        this.dialogFormVisible=true;
        this.formList={}
        this.$refs[formName].resetFields();
      })
    },
    // 新增客户提交按钮
    submitData(from){
     this.$refs[from].validate(valid => {
      //  删除最后一行
       this.list.pop()
       this.formList.gross=0
       this.formList.money=0
       this.formList.payment=null
       this.formList.data=[]
       this.formList.arrearage=0
       this.formList.status=false
       this.list.push(this.formList)
        this.dialogFormVisible=false
     })
    },
    // 添加订单确认
    addOrderForm(){
      // 点击添加订单的时候保存了所点数据的下标this.index
      this.gridData.userId= this.row.userId
      this.gridData.orderId =this.row.id
      // 计算应付款
      this.list.map(item=>{
        if(item.id==this.gridData.userId){
          item.data.map(item=>{
            if(item.id==this.gridData.orderId){
              item.proceedsMoney=(item.proceedsMoney-0)+(this.gridData.money1-0)
              item.data.push(this.gridData)
              var total1 = this. getTotalData(item.id,item,"money")
           var total = this. getTotalData(item.id,item,"amount")
           item.totalMoney=total1
          item.totalAmount=total
            }
          })
          var total1 = this. getTotalData(item.id,item,"totalMoney")
           var total = this. getTotalData(item.id,item,"totalAmount")
           let total2 = this. getTotalData(item.id,item,"proceedsMoney")
           item.money=total1
          item.gross=total
          item.payment = total2
          item.arrearage=item.money-item.payment
          this.symbolKey = Symbol(new Date().toString())
        }
      })
      this.dialogFormVisible1=false
    },
    // 添加品项
    handleEdit(index,row){
      this.dialogFormVisible1=true
      this.row =row 
      this.gridData={
      }
    },
    // 分页监听当前显示多少条数据
    handleSizeChange(val){
      this.pageSize=val
      this.fetchData(this.total)
    },
    // 分页监听当前页码
    handleCurrentChange(val){
      this.currentPage=val
      this.fetchData(this.total)
    },
    // 合计中计算总数
    getTotalData(item,resp,name){
      const sums =[]
      const values = resp.data.map(item => {
        if(name=='money'){
          item.money=item.amount*item.price
        }
        return Number(item[name])});
      sums[item] = values.reduce((prev, curr) => {
      const value = Number(curr);
      if (!isNaN(value)) {
        return prev + curr;
      } else {
        return prev;
      }
      }, 0);
      return sums[item]
    },
    // 渲染数据
    fetchData(total) {
      this.total=total|''
      // 分页=> 当前显示多少数据
      if(this.pageSize==10){
        // 接口获取客户信息
        pagingList10(this.currentPage,this.pageSize,this.formInline).then((response) => {
          
          // 赋值list，分页处理
          this.getlist(response)
          // 通过请求的数据，获取每个客户的订单，并处理总进货量，应付金额，实付金额，待付金额
          this.setList()
        });
      }else {
        pagingList20(this.currentPage,this.pageSize,this.formInline).then((response) => {
         
          this.getlist(response)
          this.setList()
        });
      }
    },
    // 通过请求的数据，获取每个客户的订单，并处理总进货量，应付金额，实付金额，待付金额
    setList(){
      this.list.map(item=>{
           let id=item.id
        if(item.data){
          item.data.map(item=>{
           item.userId=id
           let orderId=item.id
           var total1 = this. getTotalData(id,item,"money")
           var total = this. getTotalData(id,item,"amount")
           item.totalMoney=total1
          item.totalAmount=total
          item.data.map(item=>{
            item.userId=id
            item.orderId=orderId
           item.money=item.amount*item.price
          })
          item.proceedsMoney= this.probability(item.totalMoney)
        })
        }else{
          return
        }
        var total1 = this. getTotalData(id,item,"totalAmount")
        var total = this. getTotalData(id,item,"totalMoney")
        var tota2 = this. getTotalData(id,item,"money4")
        item.money1=tota2
        item.gross=total1
        item.money= total
        item.payment= this.probability(item.money)
        item.arrearage =item.money -item.payment
            // 显示欠款金额
            item.money2=item.money-item.money1
            if(item.money2==0){
              item.money2=null
            }
      })
    },
    probability(data){
      // 通过金额总数来生成随机实际付款数 概率9:1欠款
          let probability = Math.random().toFixed(3);
            if (probability >= 0.05) {
              return data;
            } else {
              let percentage = Number(probability) + 0.7;
              return parseInt(data * percentage);
            }
    },
    // 赋值list，分页处理
    getlist (resp){
      // 赋值list
      this.list= this.arr1= resp.data
      // 分页总条数处理
      if(this.total == ''){
        this.total =Number(resp.total)
      }
      // 请求数据的时候要求传入当前页，当前每页传入的条数
      this.currentPage =Number(resp.page)
      this.pageSize =Number(resp.size)
      // 最后一页处理算法
      if(this.currentPage-1>this.total/10){
        this.total=(this.currentPage-1)*10+1
      }
    },
    // 搜索提交
    searchData(formInline) {
      // 店名搜索结果
      let searchArr=[];
      // 姓名搜索结果
      let searchArr1=[];
      // 电话搜索
      let searchArr2 = [];
      // 第一个判断，有数据放入searchArr中
      if(this.formInline.store){
        this.arr1.filter((item) => {
          if (item.store.indexOf(this.formInline.store) != -1) {
            searchArr.push(item);
          }
        });
      }
      // 第二个判断，searchArr没数据就从arr1中查询，有数据就从searchArr中查询，查询结果放在searchArr1中
      if(this.formInline.name){
        if(searchArr.length == 0){
          this.arr1.filter((item) => {
            if (item.name.indexOf(this.formInline.name) != -1) {
            searchArr1.push(item);
            }
          });
        }else {
          searchArr.filter((item) => {
            if (item.name == this.formInline.name) {
            searchArr1.push(item);
            }
          });
        }
      }
      // 第三个判断，searchArr和searchArr1没数据就从arr1中查询，有数据就从searchArr1中查询，查询结果放在searchArr2中
      if(this.formInline.phone){
        if(searchArr1.length != 0){
          this.arr1.filter((item) => {
            if (item.phone == this.formInline.phone) {
            searchArr2.push(item);
            }
          });
        }else if(searchArr.length != 0){
          searchArr.filter((item) => {
            if (item.phone == this.formInline.phone) {
            searchArr2.push(item);
            }
          });
        }else{
          this.arr1.filter((item) => {
            if (item.phone == this.formInline.phone) {
            searchArr2.push(item);
            }
          });
        }
      }
      // 保存数据到视图绑定的数据中
      if(searchArr.length){
        this.list=searchArr
      }
      if(searchArr1.length){
        this.list=searchArr1
      }
      if(searchArr2.length){
        this.list=searchArr2
      }
      // 全部没数据重置表单
      if(searchArr.length==0&&searchArr1.length==0&&searchArr2.length==0){
        this.list=this.arr1
      }
        searchArr=[];
        searchArr1=[];
        searchArr2 = [];
      this.$refs[formInline].resetFields();
    },
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.list=this.arr1
    },
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