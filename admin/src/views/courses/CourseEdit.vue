<template>
  <div>
    <h3>{{ isEdit ? "编辑" : "创建" }}课程</h3>
    <ele-form v-model="data" :form-desc="fields"  :request-fn="submit"> </ele-form>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({})
export default class CourseList extends Vue {
  @Prop(String) id!: string;
  data = {};

  fields = {
    name: { label: "课程名称", type: "input" },
    cover: { label: "课程封面图", type: "input" },
  };

  async fetch() {
    const res = await this.$http.get(`courses/${this.id}`);
    this.data = res.data;
  }

  async submit(data){
    const url = this.isEdit ? `courses/${this.id}` : `courses`
    const method = this.isEdit ? 'put': 'post'
    await this.$http[method](url, data)
    this.$message.success('保存成功')
    this.data = {}
    this.$router.go(-1)

  }

  get isEdit() {
    return this.id;
  }

  created() {
    this.isEdit && this.fetch();
  }
}
</script>

<style>
</style>