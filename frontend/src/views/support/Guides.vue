<script lang="ts">
import { defineComponent, h } from 'vue'
import { Popover, PopoverButton, PopoverGroup, PopoverPanel } from '@headlessui/vue'
import {
  ArrowPathIcon,
  Bars3Icon,
  BookmarkSquareIcon,
  CalendarIcon,
  ChartBarIcon,
  CheckIcon,
  CursorArrowRaysIcon,
  LifebuoyIcon,
  PhoneIcon,
  PlayIcon,
  ShieldCheckIcon,
  Squares2X2Icon,
  XMarkIcon,
} from '@heroicons/vue/24/outline'
import { ChevronDownIcon } from '@heroicons/vue/20/solid'

export default {
  name: 'Pricing',
  components: {
    Popover,
    PopoverButton,
    PopoverGroup,
    PopoverPanel,
    ArrowPathIcon,
    Bars3Icon,
    BookmarkSquareIcon,
    CalendarIcon,
    ChartBarIcon,
    CheckIcon,
    CursorArrowRaysIcon,
    LifebuoyIcon,
    PhoneIcon,
    PlayIcon,
    ShieldCheckIcon,
    Squares2X2Icon,
    XMarkIcon,
    ChevronDownIcon,

  },
  data() {
    return {
      test: "test",
      hobbyFeatures: hobbyFeatures,
      scaleFeatures: scaleFeatures,
      growthFeatures: growthFeatures,
      faqs: [
        {
          id: 1,
          question: "What's the best thing about Switzerland?",
          answer:
            "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
        },
        // More questions...
      ],
      navigation: [
        {
          name: 'Facebook',
          href: '#',
          icon: defineComponent({
            render: () =>
              h('svg', { fill: 'currentColor', viewBox: '0 0 24 24' }, [
                h('path', {
                  'fill-rule': 'evenodd',
                  d: 'M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z',
                  'clip-rule': 'evenodd',
                }),
              ]),
          }),
        },
        {
          name: 'Instagram',
          href: '#',
          icon: defineComponent({
            render: () =>
              h('svg', { fill: 'currentColor', viewBox: '0 0 24 24' }, [
                h('path', {
                  'fill-rule': 'evenodd',
                  d: 'M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z',
                  'clip-rule': 'evenodd',
                }),
              ]),
          }),
        },
        {
          name: 'Twitter',
          href: '#',
          icon: defineComponent({
            render: () =>
              h('svg', { fill: 'currentColor', viewBox: '0 0 24 24' }, [
                h('path', {
                  d: 'M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84',
                }),
              ]),
          }),
        },
        {
          name: 'GitHub',
          href: '#',
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
        {
          name: 'Dribbble',
          href: '#',
          icon: defineComponent({
            render: () =>
              h('svg', { fill: 'currentColor', viewBox: '0 0 24 24' }, [
                h('path', {
                  'fill-rule': 'evenodd',
                  d: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z',
                  'clip-rule': 'evenodd',
                }),
              ]),
          }),
        },
      ],

    }
  }
}

const hobbyFeatures = ['Pariatur quod similique', 'Sapiente libero doloribus', 'Vel ipsa esse repudiandae']
const scaleFeatures = ['Pariatur quod similique', 'Sapiente libero doloribus', 'Vel ipsa esse repudiandae']
const growthFeatures = [
  'Quia rem est sed impedit magnam',
  'Dolorem vero ratione voluptates',
  'Qui sed ab doloribus voluptatem dolore',
  'Laborum commodi molestiae id et fugiat',
  'Nam ut ipsa nesciunt culpa modi dolor',
]

</script>

<template>
  <div class="bg-gray-100">

    <main>
      <!-- Pricing Section -->
      <section aria-labelledby="pricing-heading">
        <div class="bg-white">
          <div class="pt-12 sm:pt-16 lg:pt-24">
            <div class="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
              <div class="mx-auto max-w-3xl space-y-2 lg:max-w-none">
                <p class="text-3xl font-bold tracking-tight text-black sm:text-4xl lg:text-5xl">Prices that fit every need
                </p>
                <p class="text-xl text-gray-700">Our plans offer everything you need to take your examtiming to the next
                  level.</p>
              </div>
            </div>
          </div>
          <div class="mt-16 bg-gray-100 pb-12 lg:mt-20 lg:pb-20">
            <div class="relative z-0 bg-gray-100">
              <div class="absolute inset-0 h-5/6 bg-white lg:h-2/3" />
              <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div class="relative lg:grid lg:grid-cols-7">
                  <div
                    class="mx-auto max-w-md lg:col-start-1 lg:col-end-3 lg:row-start-2 lg:row-end-3 lg:mx-0 lg:max-w-none">
                    <div
                      class="flex h-full flex-col overflow-hidden rounded-lg shadow-lg lg:rounded-none lg:rounded-l-lg">
                      <div class="flex flex-1 flex-col">
                        <div class="bg-white px-6 py-10">
                          <div>
                            <h3 class="text-center text-2xl font-medium text-gray-900" id="tier-hobby">Standard</h3>
                            <div class="mt-4 flex items-center justify-center">
                              <span class="flex items-start px-3 text-6xl tracking-tight text-gray-900">
                                <span class="mt-2 mr-2 text-4xl font-medium tracking-tight">$</span>
                                <span class="font-bold">0</span>
                              </span>
                              <span class="text-xl font-medium text-gray-500">/month</span>
                            </div>
                          </div>
                        </div>
                        <div
                          class="flex flex-1 flex-col justify-between border-t-2 border-gray-100 bg-gray-50 p-6 sm:p-10 lg:p-6 xl:p-10">
                          <ul role="list" class="space-y-4">
                            <li v-for="feature in hobbyFeatures" :key="feature" class="flex items-start">
                              <div class="flex-shrink-0">
                                <CheckIcon class="h-6 w-6 flex-shrink-0 text-green-500" aria-hidden="true" />
                              </div>
                              <p class="ml-3 text-base font-medium text-gray-500">{{ feature }}</p>
                            </li>
                          </ul>
                          <div class="mt-8">
                            <div class="rounded-lg shadow-md">
                              <a href="#"
                                class="block w-full rounded-lg border border-transparent bg-white px-6 py-3 text-center text-base font-medium text-orange-500 hover:bg-gray-50"
                                aria-describedby="tier-hobby">Create Account</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    class="mx-auto mt-10 max-w-lg lg:col-start-3 lg:col-end-6 lg:row-start-1 lg:row-end-4 lg:mx-0 lg:mt-0 lg:max-w-none">
                    <div class="relative z-10 rounded-lg shadow-xl">
                      <div class="pointer-events-none absolute inset-0 rounded-lg border-2 border-orange-500"
                        aria-hidden="true" />
                      <div class="absolute inset-x-0 top-0 translate-y-px transform">
                        <div class="flex -translate-y-1/2 transform justify-center">
                          <span
                            class="inline-flex rounded-full bg-orange-500 px-4 py-1 text-base font-semibold text-white">Most
                            popular</span>
                        </div>
                      </div>
                      <div class="rounded-t-lg bg-white px-6 pt-12 pb-10">
                        <div>
                          <h3 class="text-center text-3xl font-semibold tracking-tight text-gray-900 sm:-mx-6"
                            id="tier-growth">Professional</h3>
                          <div class="mt-4 flex items-center justify-center">
                            <span class="flex items-start px-3 text-6xl tracking-tight text-gray-900 sm:text-6xl">
                              <span class="mt-2 mr-2 text-4xl font-medium tracking-tight">$</span>
                              <span class="font-bold">29</span>
                            </span>
                            <span class="text-2xl font-medium text-gray-500">/month</span>
                          </div>
                        </div>
                      </div>
                      <div class="rounded-b-lg border-t-2 border-gray-100 bg-gray-50 px-6 pt-10 pb-8 sm:px-10 sm:py-10">
                        <ul role="list" class="space-y-4">
                          <li v-for="feature in growthFeatures" :key="feature" class="flex items-start">
                            <div class="flex-shrink-0">
                              <CheckIcon class="h-6 w-6 flex-shrink-0 text-green-500" aria-hidden="true" />
                            </div>
                            <p class="ml-3 text-base font-medium text-gray-500">{{ feature }}</p>
                          </li>
                        </ul>
                        <div class="mt-10">
                          <div class="rounded-lg shadow-md">
                            <a href="#"
                              class="block w-full rounded-lg border border-transparent bg-orange-500 px-6 py-4 text-center text-xl font-medium leading-6 text-white hover:bg-orange-700"
                              aria-describedby="tier-growth">Subscribe</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    class="mx-auto mt-10 max-w-md lg:col-start-6 lg:col-end-8 lg:row-start-2 lg:row-end-3 lg:m-0 lg:max-w-none">
                    <div
                      class="flex h-full flex-col overflow-hidden rounded-lg shadow-lg lg:rounded-none lg:rounded-r-lg">
                      <div class="flex flex-1 flex-col">
                        <div class="bg-white px-6 py-10">
                          <div>
                            <h3 class="text-center text-2xl font-medium text-gray-900" id="tier-scale">Enterprise</h3>
                            <div class="mt-4 flex items-center justify-center">
                              <span class="flex items-start px-3 text-6xl tracking-tight text-gray-900">
                                <span class="mt-2 mr-2 text-4xl font-medium tracking-tight">$</span>
                                <span class="font-bold">49</span>
                              </span>
                              <span class="text-xl font-medium text-gray-500">/month</span>
                            </div>
                          </div>
                        </div>
                        <div
                          class="flex flex-1 flex-col justify-between border-t-2 border-gray-100 bg-gray-50 p-6 sm:p-10 lg:p-6 xl:p-10">
                          <ul role="list" class="space-y-4">
                            <li v-for="feature in scaleFeatures" :key="feature" class="flex items-start">
                              <div class="flex-shrink-0">
                                <CheckIcon class="h-6 w-6 flex-shrink-0 text-green-500" aria-hidden="true" />
                              </div>
                              <p class="ml-3 text-base font-medium text-gray-500">{{ feature }}</p>
                            </li>
                          </ul>
                          <div class="mt-8">
                            <div class="rounded-lg shadow-md">
                              <a href="#"
                                class="block w-full rounded-lg border border-transparent bg-white px-6 py-3 text-center text-base font-medium text-orange-500 hover:bg-gray-50"
                                aria-describedby="tier-scale">Subscribe</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

              </div>

            </div>
            <div class="relative mx-auto mt-4 max-w-7xl pt-10 px-4 sm:px-6 lg:mt-5 lg:px-8">
              <div class="rounded-lg bg-white px-6 py-8 sm:p-10 lg:flex lg:items-center">
                <div class="flex-1">
                  <div>
                    <h3 class="inline-flex rounded-full bg-gray-200 px-4 py-1 text-base font-semibold text-gray-800">
                      Custom Plan</h3>
                  </div>
                  <div class="mt-4 text-lg text-gray-600">Looking for something bigger? Get in touch to explore our
                    custom plans. We offer tailored solutions for teams of any size starting at
                    <span class="font-semibold text-gray-900">$69</span>/mo
                  </div>
                </div>
                <div class="mt-6 rounded-md shadow lg:mt-0 lg:ml-10 lg:flex-shrink-0">
                  <a href="#"
                    class="flex items-center justify-center rounded-md border border-transparent bg-orange-400 px-5 py-3 text-base font-medium text-white hover:bg-orange-500">Get
                    in contact</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Testimonial -->
      <div class="relative">
        <!-- Decorative background -->
        <div aria-hidden="true" class="absolute inset-x-0 h-1/2 bg-gradient-to-b " />

        <div class="relative mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <div
            class="relative overflow-hidden rounded-xl bg-orange-500 opacity-80 py-24 px-8 shadow-2xl lg:grid lg:grid-cols-2 lg:gap-x-8 lg:px-16">
            <div class="absolute inset-0 opacity-80 mix-blend-multiply saturate-0 filter">
              <img src="https://smapse.com/storage/2016/08/haileybury-college-terrace1.jpg" alt=""
                class="h-full w-full object-cover" />
            </div>
            <div class="relative lg:col-span-1">
              <img class="h-16 w-auto" src="/logo.png" alt="" />
              <blockquote class="mt-6 text-white">
                <p class="text-xl font-medium sm:text-2xl">This app has completely transformed how we
                  interact
                  with customers. We've seen record bookings, higher customer satisfaction, and reduced
                  churn.
                </p>
                <footer class="mt-6">
                  <p class="flex flex-col font-medium">
                    <span>Mr Example</span>
                    <span>CEO, Haileybury</span>
                  </p>
                </footer>
              </blockquote>
            </div>
          </div>
        </div>
      </div>

      <!-- FAQ -->
      <section aria-labelledby="faq-heading"
        class="mx-auto max-w-2xl divide-y divide-gray-200 py-24 px-4 sm:px-6 lg:max-w-7xl lg:py-32 lg:px-8">
        <h2 id="faq-heading" class="text-3xl font-bold tracking-tight text-gray-900">Frequently asked questions</h2>
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

    <!-- Footer -->
    <footer class="bg-gray-100">
      <div class="mx-auto max-w-7xl py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
        <div class="flex justify-center space-x-6 md:order-2">
          <a v-for="item in navigation" :key="item.name" :href="item.href" class="text-gray-400 hover:text-gray-500">
            <span class="sr-only">{{ item.name }}</span>
            <component :is="item.icon" class="h-6 w-6" aria-hidden="true" />
          </a>
        </div>
        <div class="mt-8 md:order-1 md:mt-0">
          <p class="text-center text-base text-gray-400">&copy; 2023 Examtimer, Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>