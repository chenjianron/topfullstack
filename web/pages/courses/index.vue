<template>
  <div class="pa-3">
    <h3>热门视频</h3>
    <v-row>
      <v-col v-for="item in courses" :key="item._id" md="4">
        <v-card class="mx-auto" max-width="344">
          <router-link :to="`/courses/${item._id}`">
            <v-img :src="item.cover" height="200px"></v-img>
          </router-link>
          <router-link :to="`/courses/${item._id}`"
            ><v-card-title> {{ item.name }} </v-card-title></router-link
          >

          <v-card-subtitle> {{ item.createdAt }} </v-card-subtitle>

          <v-card-actions>
            <like-btn type="Course" :object="item._id"></like-btn>

            <v-spacer></v-spacer>

            <v-btn icon>
              <v-icon>{{
                show ? 'mdi-chevron-up' : 'mdi-chevron-down'
              }}</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import LikeBtn from '../../components/LikeBtn.vue'

export default {
  components: { LikeBtn },
  async asyncData({ $axios }) {
    const data = await $axios.$get('courses')
    return {
      courses: data.data,
    }
  },
  data() {
    return {
      show: true,
    }
  },
}
</script>

<style></style>
