<template>
  <div class="pa-3">
    <v-row>
      <v-col :md="8">
        <h3>{{ courses.name }}</h3>
        <v-select
          v-model="currentIndex"
          :items="
            courses.episodes.map((v, k) => ({
              text: v.name,
              value: k,
            }))
          "
        ></v-select>
        <video :src="episode.file" width="100%" controls></video>
        <like-btn type="Course" :object="courses._id"></like-btn>
      </v-col>
      <v-col :md="4">
        <comment-list type="Episode" :object="episode._id"></comment-list>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import LikeBtn from '../../components/LikeBtn.vue'
import CommentList from '../../components/CommentList.vue'

export default {
  components: {
    LikeBtn,
    CommentList,
  },
  async asyncData({ params, $axios }) {
    const { id } = params
    const courses = await $axios.$get(`courses/${id}`, {
      params: {
        query: { populate: 'episodes' },
      },
    })
    return {
      id,
      courses,
    }
  },
  data() {
    return {
      currentIndex: 0,
    }
  },
  computed: {
    episode() {
      return this.courses.episodes[this.currentIndex]
    },
  },
}
</script>

<style></style>
