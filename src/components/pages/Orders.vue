<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <!-- <div class="text-right mt-4">
      <button class="btn btn-primary"
        @click="openModal(true)">
        建立新的產品</button>
    </div> -->
    <table class="table mt-4">
      <thead>
        <tr>
          <th>購買時間</th>
          <th>Email</th>
          <th>購買款項</th>
          <th>應付金額</th>
          <th>是否付款</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, key) in sortOrder" :key="key"
          v-if="orders.length"
          :class="{'text-secondary': !item.is_paid}">
          <td>{{ item.create_at | date }}</td>
          <td><span v-text="item.user.email" v-if="item.user"></span></td>
          <td>
            <ul class="list-unstyled">
              <li v-for="(product, i) in item.products" :key="i">
                {{ product.product.title }} 數量：{{ product.qty }}
                {{ product.product.unit }}
              </li>
            </ul>
          </td>
          <td class="text-right">{{ item.total | currency }}</td>
          <td>
            <strong v-if="item.is_paid" class="text-success">已付款</strong>
            <span v-else class="text-muted">尚未起用</span>
          </td>
        </tr>
      </tbody>
    </table>

    <div is="componentsPagination" :pagination="pagination" @getPageProducts="getOrders" ></div>
  </div>
</template>

<script>
import $ from 'jquery';
// add component Pagination New Code
import componentsPagination from './Pagination';
export default {
  data() {
    return {
      orders: [],
      pagination: {},
      tempProduct: {},
      isNew: false,
      isLoading: false,
      // status: {
      //   fileUploading: false,
      // },
    };
  },
  methods: {
    getOrders(currentPage = 1) {
      // const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/products`; // 'http://localhost:3000/api/casper/products';
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/orders?page=${currentPage}`;
      const vm = this;
      // console.log(process.env.APIPATH, process.env.CUSTOMPATH);
      vm.isLoading = true;

      this.$http.get(api).then((response) => {
        console.log(response);
        vm.isLoading = false;
        vm.orders = response.data.orders;
        vm.pagination = response.data.pagination;
      });
    },
  },
  computed: {
    sortOrder() {
      const vm = this;
      let newOrder = [];
      if (vm.orders.length) {
        newOrder = vm.orders.sort((a, b) => {
          const aIsPaid = a.is_paid ? 1 : 0;
          const bIsPaid = b.is_paid ? 1 : 0;
          return bIsPaid - aIsPaid;
        });
      }
      return newOrder;
    },
  },
  created(){
    this.getOrders();
    // this.$bus.$emit('message:push', '這是一段訊息', 'success');
    // console.log('this.$bus.$emit: ', this.$bus.$emit);
  },
  // add component componentsPagination New Code
  components:{
    componentsPagination,
  },
};
</script>