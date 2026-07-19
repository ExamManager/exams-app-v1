<script lang="ts">
import { defineComponent, h } from 'vue'
import {
  BookOpenIcon,
  BookmarkSquareIcon,
  LifebuoyIcon,
} from '@heroicons/vue/24/outline'

export default {
  name: 'HelpCenter',
  components: {
    BookOpenIcon,
    BookmarkSquareIcon,
    LifebuoyIcon,
  },
  data() {
    return {
      links: [
        {
          name: 'Documentation',
          description: 'Overview of ExamManager V1 features and how the demo works.',
          href: '/docs',
          icon: BookOpenIcon,
        },
        {
          name: 'Guides',
          description: 'Short walkthroughs for the classroom timer, planning, and seating.',
          href: '/support/guides',
          icon: BookmarkSquareIcon,
        },
        {
          name: 'GitHub',
          description: 'Source and project notes for this portfolio showcase.',
          href: 'https://github.com/ExamManager',
          icon: LifebuoyIcon,
          external: true,
        },
      ],
      faqs: [
        {
          id: 1,
          question: 'Is this a live product with support?',
          answer:
            'No. ExamManager V1 is a deprecated portfolio demo. There is no live customer support, account signup, or billing. Use the docs and guides below, or visit the GitHub organization for context.',
        },
        {
          id: 2,
          question: 'Can I create an account or buy a plan?',
          answer:
            'Signup and paid plans are not available on this deployment. The pricing page shows historical plan names for the showcase only. Try the free timer at /free or the premium demo at /demo.',
        },
        {
          id: 3,
          question: 'Where should I go for technical details?',
          answer:
            'Start with Documentation for a product overview, then Guides for classroom workflows. For code and project history, see https://github.com/ExamManager.',
        },
        {
          id: 4,
          question: 'Who do I contact about this project?',
          answer:
            'There is no support inbox for this demo. Contact or follow the ExamManager GitHub organization if you have questions about the portfolio work.',
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
  methods: {
    goTo(link: { href: string; external?: boolean }) {
      if (link.external) {
        window.open(link.href, '_blank', 'noopener,noreferrer')
      } else {
        this.$router.push(link.href)
      }
    },
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
                Help Center
              </p>
              <p class="text-xl text-gray-700">
                ExamManager V1 is a portfolio demo. Use these resources to explore the product — live support and signup are not available.
              </p>
            </div>
          </div>
        </div>

        <div class="mt-12 bg-gray-100 pb-16 lg:mt-16 lg:pb-20">
          <div class="relative z-0">
            <div class="absolute inset-0 h-1/3 bg-white" />
            <div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div class="grid gap-6 md:grid-cols-3">
                <button
                  v-for="link in links"
                  :key="link.name"
                  type="button"
                  class="flex flex-col rounded-lg bg-white p-8 text-left shadow-lg transition hover:shadow-xl"
                  @click="goTo(link)"
                >
                  <component :is="link.icon" class="h-8 w-8 text-orange-500" aria-hidden="true" />
                  <h3 class="mt-4 text-xl font-semibold text-gray-900">{{ link.name }}</h3>
                  <p class="mt-2 text-base text-gray-500">{{ link.description }}</p>
                  <span class="mt-6 text-sm font-medium text-orange-500">
                    {{ link.external ? 'Open GitHub →' : 'View →' }}
                  </span>
                </button>
              </div>

              <div class="mt-10 rounded-lg bg-white px-6 py-8 shadow sm:p-10">
                <h3 class="inline-flex rounded-full bg-orange-100 px-4 py-1 text-sm font-semibold text-orange-800">
                  Demo only
                </h3>
                <p class="mt-4 text-lg text-gray-600">
                  This site showcases an earlier ExamManager build. There is no active support desk, ticket system, or paid onboarding. Try
                  <router-link to="/free" class="font-medium text-orange-600 hover:text-orange-700">/free</router-link>
                  or
                  <router-link to="/demo" class="font-medium text-orange-600 hover:text-orange-700">/demo</router-link>
                  to see the timers in action.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="faq-heading"
        class="mx-auto max-w-2xl divide-y divide-gray-200 py-16 px-4 sm:px-6 lg:max-w-7xl lg:py-24 lg:px-8"
      >
        <h2 id="faq-heading" class="text-3xl font-bold tracking-tight text-gray-900">
          Frequently asked questions
        </h2>
        <div class="mt-8">
          <dl class="divide-y divide-gray-200">
            <div v-for="faq in faqs" :key="faq.id" class="pt-6 pb-8 md:grid md:grid-cols-12 md:gap-8">
              <dt class="text-base font-medium text-gray-900 md:col-span-5">{{ faq.question }}</dt>
              <dd class="mt-2 md:col-span-7 md:mt-0">
                <p class="text-base text-gray-500">{{ faq.answer }}</p>
              </dd>
            </div>
          </dl>
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
