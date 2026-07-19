<script lang="ts">
import { defineComponent, h } from 'vue'
import {
  CalendarDaysIcon,
  ClockIcon,
  Squares2X2Icon,
  TableCellsIcon,
} from '@heroicons/vue/24/outline'

export default {
  name: 'DocumentationHome',
  components: {
    CalendarDaysIcon,
    ClockIcon,
    Squares2X2Icon,
    TableCellsIcon,
  },
  data() {
    return {
      features: [
        {
          name: 'Classroom exam timer',
          description:
            'Run clear countdowns for invigilators and students, with pause and extra-time controls suited to exam halls.',
          icon: ClockIcon,
        },
        {
          name: 'Multi-exam timing',
          description:
            'Time several papers at once when rooms share a session but exams start or finish at different times.',
          icon: Squares2X2Icon,
        },
        {
          name: 'Exam planning',
          description:
            'Prepare exam entries ahead of the day so staff can launch the right timer without retyping details under pressure.',
          icon: CalendarDaysIcon,
        },
        {
          name: 'Timetables & seating',
          description:
            'Build exam day schedules and seating layouts so candidates know where to sit before the timer starts.',
          icon: TableCellsIcon,
        },
      ],
      navigation: [
        {
          name: 'GitHub',
          href: 'https://github.com/ExamManager',
          icon: defineComponent({
            render: () =>
              h('svg', { fill: 'currentColor', viewBox: '0 0 24 24' }, [
                h('path', {
                  'fill-rule': 'evenodd',
                  d: 'M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z',
                  'clip-rule': 'evenodd',
                }),
              ]),
          }),
        },
      ],
    }
  },
}
</script>

<template>
  <div class="bg-gray-100">
    <main>
      <section class="bg-white">
        <div class="pt-12 sm:pt-16 lg:pt-24">
          <div class="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <div class="mx-auto max-w-3xl space-y-4">
              <p class="text-3xl font-bold tracking-tight text-black sm:text-4xl lg:text-5xl">
                Documentation
              </p>
              <p class="text-xl text-gray-700">
                Product overview for ExamManager V1 — a school exam timing and planning toolkit kept online as a portfolio demo.
              </p>
            </div>
          </div>
        </div>

        <div class="mt-12 bg-gray-100 pb-16 lg:mt-16 lg:pb-20">
          <div class="relative z-0">
            <div class="absolute inset-0 h-1/3 bg-white" />
            <div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div class="rounded-lg bg-white p-8 shadow-lg sm:p-10">
                <h2 class="text-2xl font-semibold text-gray-900">What is ExamManager V1?</h2>
                <p class="mt-4 text-base leading-relaxed text-gray-600">
                  ExamManager V1 helps schools run exam days: classroom timers for invigilators and students, multi-exam sessions,
                  planning ahead of the day, and timetable or seating helpers. This deployment is a deprecated showcase of that product —
                  not a live SaaS with active accounts or billing.
                </p>
              </div>

              <div class="mt-10">
                <h2 class="text-2xl font-bold tracking-tight text-gray-900">Features</h2>
                <div class="mt-6 grid gap-6 sm:grid-cols-2">
                  <div
                    v-for="feature in features"
                    :key="feature.name"
                    class="rounded-lg bg-white p-6 shadow"
                  >
                    <component :is="feature.icon" class="h-7 w-7 text-orange-500" aria-hidden="true" />
                    <h3 class="mt-3 text-lg font-semibold text-gray-900">{{ feature.name }}</h3>
                    <p class="mt-2 text-base text-gray-500">{{ feature.description }}</p>
                  </div>
                </div>
              </div>

              <div class="mt-10 rounded-lg bg-white p-8 shadow-lg sm:p-10">
                <h2 class="text-2xl font-semibold text-gray-900">How the demo works</h2>
                <ul class="mt-4 list-disc space-y-3 pl-5 text-base text-gray-600">
                  <li>
                    <router-link to="/free" class="font-medium text-orange-600 hover:text-orange-700">/free</router-link>
                    — free-tier classroom timer for trying the core countdown experience.
                  </li>
                  <li>
                    <router-link to="/demo" class="font-medium text-orange-600 hover:text-orange-700">/demo</router-link>
                    — premium-style demo with richer multi-exam timing flows.
                  </li>
                  <li>
                    Management and planning screens illustrate how schools would prepare exams; they are not connected to production data.
                  </li>
                </ul>
                <p class="mt-6 text-base text-gray-600">
                  Historical plan names and prices are listed on
                  <router-link to="/pricing" class="font-medium text-orange-600 hover:text-orange-700">Pricing</router-link>
                  for context only. Signup and subscriptions are unavailable on this site.
                </p>
              </div>

              <div class="mt-10 flex flex-wrap justify-center gap-4">
                <router-link
                  to="/support"
                  class="rounded-md bg-orange-500 px-5 py-3 text-base font-medium text-white shadow hover:bg-orange-600"
                >
                  Help Center
                </router-link>
                <router-link
                  to="/support/guides"
                  class="rounded-md border border-transparent bg-white px-5 py-3 text-base font-medium text-orange-500 shadow hover:bg-gray-50"
                >
                  Guides
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <footer class="bg-gray-100">
      <div class="mx-auto max-w-7xl py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
        <div class="flex justify-center space-x-6 md:order-2">
          <a
            v-for="item in navigation"
            :key="item.name"
            :href="item.href"
            target="_blank"
            rel="noopener noreferrer"
            class="text-gray-400 hover:text-gray-500"
          >
            <span class="sr-only">{{ item.name }}</span>
            <component :is="item.icon" class="h-6 w-6" aria-hidden="true" />
          </a>
        </div>
        <div class="mt-8 md:order-1 md:mt-0">
          <p class="text-center text-base text-gray-400">
            &copy; ExamManager V1 — portfolio showcase. Not an active service.
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>
