<template>
  <div class="min-h-screen bg-slate-50 p-8">
    <h1 class="text-2xl font-semibold text-slate-900">Dashboard</h1>
    <p class="mt-2 text-slate-600">
      Exam planner lives at
      <router-link class="text-indigo-600 underline" to="/dashboard/planner">
        /dashboard/planner
      </router-link>
      .
    </p>
  </div>
</template>

<script lang="ts">
export default {
  name: "Dashboard",
}
</script>
