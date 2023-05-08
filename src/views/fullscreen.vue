<script lang="ts">

export default {
  data() {
    return {
      fullscreen: false,
    };
  },
  methods: {
    toggleFullscreen() {
      this.fullscreen = !this.fullscreen;
    },
  },
};
</script>

<template>
    <div>
        <h1>Fullscreen</h1>
        <button @click="toggleFullscreen">Toggle fullscreen</button>
        <div v-if="fullscreen" class="fullscreen">
            <h2>Fullscreen</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.</p>
        </div>
    </div>
</template>