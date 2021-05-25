<template>
  <div>
    <!-- 批发客户 -->
    <el-form
      :inline="true"
      :model="formInline"
      ref="formInline"
      class="demo-form-inline"
    >
      <el-form-item label="店名" prop="store">
        <el-input
          v-model="formInline.store"
          placeholder="请输入需要查找的店名"
        ></el-input>
      </el-form-item>
      <el-form-item label="联系人" prop="name">
        <el-input
          v-model="formInline.name"
          placeholder="请输入需要查找的联系人"
        ></el-input>
      </el-form-item>
      <el-form-item label="电话" prop="phone">
        <el-input
          v-model="formInline.phone"
          placeholder="请输入需要查找的电话"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="searchData('formInline')"
          icon="el-icon-search"
          >搜 索</el-button
        >
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-refresh-right"
          @click="resetForm('formInline')"
          >重 置</el-button
        >
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
        @click="onAdd('formInline')"
          ><i class="el-icon-upload el-icon--right"></i
        >新 增</el-button>
      </el-form-item>
    </el-form>
    <!-- 弹出框 -->
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
  <el-form :model="formList" ref="formList" :rules="rules">
    <el-form-item label="店名" :label-width="formLabelWidth" prop="store">
      <el-input v-model="formList.store" autocomplete="off" style="width:300px"></el-input>
    </el-form-item>
    <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
      <el-input v-model="formList.name" autocomplete="off" style="width:300px"></el-input>
    </el-form-item>
    <el-form-item label="电话号码" :label-width="formLabelWidth" prop="phone">
      <el-input v-model="formList.phone" autocomplete="off" style="width:300px"></el-input>
    </el-form-item>
    <el-form-item label="地址" :label-width="formLabelWidth" prop="address">
      <el-input v-model="formList.address" autocomplete="off" style="width:300px"></el-input>
    </el-form-item>
    <el-form-item label="进货数量" :label-width="formLabelWidth" prop="gross">
      <el-input placeholder=0 v-model="formList.gross" autocomplete="off" style="width:300px"></el-input>
      <el-button v-if="istrue" type="primary" @click="examineData('formList')">查看</el-button>
    </el-form-item>
    <el-form-item label="进货金额" :label-width="formLabelWidth" prop="money">
      <el-input  placeholder=0 v-model="formList.money" autocomplete="off" style="width:300px"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="submitData('formList')">提 交</el-button>
    
        <el-button
          type="primary"
          icon="el-icon-refresh-right"
          @click="resetForm('formList')"
          >重 置</el-button
        >
  </div>
</el-dialog>
      <!-- 数据渲染 -->
      <el-table
        :data="list" 
        style="width: 100%"
        :row-class-name="tableRowClassName"
        max-height="600">
        <el-table-column prop="store" label="店名" width="150">
        </el-table-column>
        <el-table-column label="配送信息">
          <el-table-column prop="name" label="姓名" min-width="80">
          </el-table-column>
          <el-table-column label="地址">
            <el-table-column prop="phone" label="联系电话" min-width="120">
            </el-table-column>
            <el-table-column prop="address" label="地址" min-width="300">
            </el-table-column>
            <el-table-column prop="gross" label="进货总量" min-width="65">
            </el-table-column>
            <el-table-column prop="money" label="进货金额" min-width="100">
            </el-table-column>
            <el-table-column  prop="money1" label="实收金额" min-width="100"></el-table-column>
          </el-table-column>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >查看</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
       <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    </div>
  
</template>

<script>
import { pagingList10 ,pagingList20 } from "@/api/wholesale";
export default {
  
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
      arr1: [],
      istrue:false,
      total:0,
      dialogFormVisible:false,
      pageSize:10,
      currentPage: 1,
      formLabelWidth:"200px",
      formList:{
        store:'',
        name:'',
        phone:'',
        address:'',
        gross:0,
        money:0
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
      formInline: {
        name: "",
        phone: "",
        store: "",
      },
      searchMap:{

      }
    };
  },
  created() {
    // 初始化获取列表数据
    this.fetchData();
    
  },
  watch: {
        arr1: function (newVal, oldVal) {
      console.log(newVal);
      // 处理实收金额
      let arr1 = [];
      newVal.filter((item) => {
        item.money = item.gross * 20;
        let probability = Math.random().toFixed(3);
        if (probability >= 0.1) {
          item.money1 = item.money;
        } else {
          let percentage = Number(probability) + 0.8;
          item.money1 = parseInt(item.money * percentage);
        }
        arr1.push(item);
      });
      // console.log(arr1)
      // 处理应收金额
      this.updateList(arr1);
    },
  },

  methods: {
    // 收款不全警告
     tableRowClassName({row, rowIndex}) {
        if(row.money != row.money1){
          return 'warning-row';
        }
        return '';
      },
    // 处理money
    updateList(data){
      this.list=data
    },
    handleDelete(index,row){
      this.fetchData(this.total)
    },
    examineData(){
      console.log("查询进货数据数据")
    },
    onAdd(formName){
      this.dialogFormVisible=true;
      this.istrue=false;
      console.log(this.formList)
      this.formList={}
      this.$refs[formName].resetFields();
    },
    handleEdit(index,row){
      console.log(index,row)
      this.dialogFormVisible=true
      this.istrue=true
      this.formList=row

    },
    // 新增客户提交按钮
    submitData(from){
      
      
     this.$refs[from].validate(valid => {
       this.list.pop()
       console.log(this.formList)
       this.list.push(this.formList)
        this.dialogFormVisible=false
        this.$refs[from].resetFields();
     })
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
    // 渲染数据
    fetchData(total) {
      
      this.total=total|''
      // 分页=> 当前显示多少数据
      if(this.pageSize==10){
        // 接口
        pagingList10(this.currentPage,this.pageSize,this.formInline).then((response) => {
        getlist(response)
        });
      }else {
        pagingList20(this.currentPage,this.pageSize,this.formInline).then((response) => {
        getlist(response)
        });
      }
      // 处理接口返回的数据
      var _this=this
      function getlist (response){
        const resp = response.data;
        if (resp.flag) {
          _this.list= _this.arr1= resp.data;
          if(_this.total == ''){
            _this.total =Number(resp.total)
          }
          _this.currentPage =Number(resp.page)
          _this.pageSize =Number(resp.size)
          console.log(resp.total)
          if(_this.currentPage-1>_this.total/10){
            _this.total=(_this.currentPage-1)*10+1
          }
        }
      }
    },
    // 搜索提交
    searchData(formInline) {
      // 店名搜索结果
      let searchArr=[];
      // 姓名搜索结果
      let searchArr1=[];
      let searchArr2 = [];
      
      if(this.formInline.store){
        
        this.arr1.filter((item) => {
          if (item.store == this.formInline.store) {
            searchArr.push(item);
          }
        });
        if(searchArr.length==0){
          return this.list = searchArr
        }
      }
      if(this.formInline.name){
        if(searchArr.length == 0){
          this.arr1.filter((item) => {
            if (item.name == this.formInline.name) {
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
        if(searchArr1.length==0){
          return this.list = searchArr1
        }
      }
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
        if(searchArr2.length==0){
          return this.list = searchArr2
        }
      }
      // console.log(searchArr)
      if(searchArr.length){
        console.log(searchArr)
        this.list=searchArr
        
      }
      if(searchArr1.length){
        this.list=searchArr1
        
      }
      if(searchArr2.length){
        this.list=searchArr2
        
      }
      if(searchArr.length==0&&searchArr1.length==0&&searchArr2.length==0){
        console.log(1)
        this.list=this.arr1
      }
      searchArr=[];
        searchArr1=[];
        searchArr2 = [];
      this.$refs[formInline].resetFields();
    },
    // 重置
    resetForm(formName) {
      console.log("12");
      this.$refs[formName].resetFields();
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

</style>