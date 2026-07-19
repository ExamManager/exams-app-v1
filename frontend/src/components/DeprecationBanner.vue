<script lang="ts">
import { ExclamationTriangleIcon } from "@heroicons/vue/24/outline";

export default {
  name: "DeprecationBanner",
  components: { ExclamationTriangleIcon },
};
</script>

<template>
  <div
    role="status"
    aria-live="polite"
    class="sticky top-0 z-[60] w-full border-b border-amber-800/25 bg-amber-500 text-amber-950"
  >
    <div
      class="mx-auto flex w-full max-w-7xl items-start gap-2.5 px-4 py-2.5 text-left text-sm leading-snug sm:items-center sm:justify-center sm:gap-3 sm:text-center"
    >
      <ExclamationTriangleIcon
        class="mt-0.5 h-4 w-4 shrink-0 sm:mt-0"
        aria-hidden="true"
      />
      <p class="min-w-0 flex-1 sm:flex-none">
        <span class="font-semibold">Deprecated showcase.</span> ExamManager is
        no longer an active product — this site is kept online only to show what
        it once was. Most features no longer work (databases, auth, billing, and
        more).
      </p>
    </div>
  </div>
</template>
