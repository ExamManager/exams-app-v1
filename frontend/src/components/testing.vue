<script lang="ts">
 import Notification from './Notification.vue'

 export default {
  name: "Testing Page",
  mixings: [Notification],
  data() {
   return {
    message: "Hello World"
   }
  },
 }
</script>

<template>
 <div class="h-full w-full">
  <p>hi</p>
 </div>


 <Notification 
  
 />
</template>