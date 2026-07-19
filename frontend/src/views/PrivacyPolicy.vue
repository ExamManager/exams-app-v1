<script lang="ts">
import { defineComponent, h } from 'vue'

export default {
  name: 'PrivacyPolicy',
  data() {
    return {
      sections: [
        {
          title: 'About this site',
          body:
            'ExamManager V1 is a deprecated portfolio showcase of an earlier exam timing and planning product. It is not an active commercial service. There are no active customer accounts, paid subscriptions, or production billing on this deployment.',
        },
        {
          title: 'Information we collect',
          body:
            'This demo may use browser storage or session data only to make the UI work while you browse. Do not enter real student records, passwords you use elsewhere, or sensitive personal information. Anything you type in demo forms should be treated as temporary and disposable.',
        },
        {
          title: 'Accounts and billing',
          body:
            'Signup, login, and payment flows may appear as historical UI from the original product, but they are not offered as live services here. We do not process payments or maintain active user billing for this showcase.',
        },
        {
          title: 'Contact',
          body:
            'For questions about this portfolio project, contact the ExamManager organization on GitHub: https://github.com/ExamManager. There is no support email or privacy request portal for this demo.',
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
                Privacy notice
              </p>
              <p class="text-xl text-gray-700">
                A short notice for this ExamManager V1 portfolio demo.
              </p>
            </div>
          </div>
        </div>

        <div class="mt-12 bg-gray-100 pb-16 lg:mt-16 lg:pb-24">
          <div class="relative z-0">
            <div class="absolute inset-0 h-1/4 bg-white" />
            <div class="relative mx-auto max-w-3xl space-y-6 px-4 sm:px-6 lg:px-8">
              <article
                v-for="section in sections"
                :key="section.title"
                class="rounded-lg bg-white p-8 shadow sm:p-10"
              >
                <h2 class="text-xl font-semibold text-gray-900">{{ section.title }}</h2>
                <p class="mt-3 text-base leading-relaxed text-gray-600">{{ section.body }}</p>
              </article>

              <p class="text-center text-sm text-gray-500">
                Last updated for the portfolio showcase.
                <a
                  href="https://github.com/ExamManager"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="font-medium text-orange-600 hover:text-orange-700"
                >github.com/ExamManager</a>
              </p>
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
