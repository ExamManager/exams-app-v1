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
    class="border-b border-amber-800/25 bg-amber-500 text-amber-950"
  >
    <div
      class="mx-auto flex max-w-7xl items-start gap-2.5 px-4 py-2.5 text-left text-sm leading-snug sm:items-center sm:justify-center sm:text-center"
    >
      <ExclamationTriangleIcon
        class="mt-0.5 h-4 w-4 shrink-0 sm:mt-0"
        aria-hidden="true"
      />
      <p>
        <span class="font-semibold">Deprecated showcase.</span> ExamManager is
        no longer an active product — this site is kept online only to show what
        it once was. Most features no longer work (databases, auth, billing, and
        more).
      </p>
    </div>
  </div>
</template>
