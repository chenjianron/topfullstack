<template>
  <v-card class="pa-3" flat tile>
    <v-form @submit.prevent="send">
      <v-text-field
        v-model="content"
        label="说点啥"
        required
        append-icon="mdi-send"
        @click:append="send"
      ></v-text-field>
    </v-form>
    评论列表
    <v-list two-line>
      <v-list-item v-for="(comment, i) in comments" :key="i">
        <v-list-item-avatar color="blue">
          <span class="white--text">{{
            comment.user.username[0].toUpperCase()
          }}</span>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title v-text="comment.content"></v-list-item-title>
          <v-list-item-subtitle>
            <span>{{ comment.user.username }}</span>
            <span>{{ comment.createdAt }}</span>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <p>{{ comments }}</p>
  </v-card>
</template>

<script>
export default {
  props: {
    type: { type: String, required: true },
    object: { type: String, required: true },
  },
  data() {
    return {
      comments: [],
      content: null,
    }
  },
  watch: {
    object: {
      handler: 'fetch',
      immediate: true,
    },
  },
  methods: {
    async fetch() {
      this.comments = await this.$axios.$get('comments', {
        params: {
          query: {
            where: {
              type: this.type,
              object: this.object,
            },
          },
        },
      })
    },
    async send() {
      await this.$axios.post('comments', {
        content: this.content,
        type: this.type,
        object: this.object,
      })
      this.content = null
      this.fetch()
    },
  },
}
</script>

<style></style>
