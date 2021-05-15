<template>
  <div>
    <h3>{{ option.title }}</h3>
    <avue-crud
      v-if="option.column"
      :page.sync="page"
      :data="data.data"
      :option="option"
      @row-save="create"
      @row-update="update"
      @row-del="remove"
      @sort-change="sortChange"
      @search-change="searchChange"
      @on-load="onLoad"
      @selection-change="selectionChange"
    ></avue-crud>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({})
export default class ResourceList extends Vue {
  @Prop(String) resource!: string;

  data: any = {};
  option: any = {};
  page: any = {
    // pageSize: 2,
    // pageSizes: [2, 5, 10],
    total: 0,
  };
  query: any = {
    // limit: 2,
  };

  async fetch() {
    const res = await this.$http.get(`${this.resource}`, {
      params: {
        query: this.query,
      },
    });
    this.page.total = res.data.total;
    this.data = res.data;
  }

  async fetchOption() {
    const res = await this.$http.get(`${this.resource}/option`);
    this.option = res.data;
  }

  async onLoad({ pageSize, currentPage}) {
    this.query.limit = pageSize;
    this.query.page = currentPage;
    this.fetch();
  }

  async sortChange(val) {
    console.log(val);
    if (val.order == null) {
      this.query.sort = null;
    } else {
      this.query.sort = {
        [val.prop]: val.order === "ascending" ? 1 : -1,
      };
    }
    this.fetch();
  }

  async searchChange(where, done) {
    for (let k in where) {
      const field = this.option.column.find(
        (v: { prop: string }) => v.prop === k
      );
      if (field.regex == true) {
        where[k] = { $regex: where[k] };
      }
    }
    this.query.where = where;
    this.fetch();
    done();
  }

  async selectionChange(list) {
    console.log(list)
  }

  async create(row, done, loading) {
    await this.$http.post(`${this.resource}`, row);
    this.$message.success("保存成功");
    this.fetch();
    done();
  }

  async update(row, index, done, loading) {
    const data = JSON.parse(JSON.stringify(row));
    delete data.$index;
    await this.$http.put(`${this.resource}/${row._id}`, data);
    this.$message.success("更新成功");
    this.fetch();
    done();
  }

  async remove({ _id }) {
    try {
      await this.$confirm("是否确认删除");
    } catch (e) {
      return;
    }
    await this.$http.delete(`${this.resource}/${_id}`);
    this.$message.success("删除成功");
    this.fetch();
  }

  created() {
    this.fetch();
    this.fetchOption();
  }
}
</script>

<style>
</style>