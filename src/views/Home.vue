<script lang="ts">
import {
    ChevronRightIcon,
    StarIcon
} from '@heroicons/vue/20/solid'

import {
    BoltIcon,
    ChatBubbleBottomCenterTextIcon,
    EnvelopeIcon,
    ScaleIcon,
    CheckCircleIcon,
    CalendarDaysIcon,
    AcademicCapIcon,
    ClockIcon,
    BookOpenIcon,
} from '@heroicons/vue/24/outline'

import { defineComponent, h } from 'vue'
import authenticate from '../functions/authenticate'
export default {
    name: "Home",
    mixins: [authenticate],
    components: {
        AcademicCapIcon,
        ChevronRightIcon,
        StarIcon,
        ClockIcon,
        BookOpenIcon,
        CheckCircleIcon,
        BoltIcon,
        ChatBubbleBottomCenterTextIcon,
        EnvelopeIcon,
        CalendarDaysIcon,
        ScaleIcon,
    },
    created() {
        window.addEventListener('scroll', this.handleScroll);
    },
    data() {
        return {
            show1: false,
            show2: false,
            show3: false,
            show4: false,
            show5: false,
            show6: false,
            test: "test",
            includedFeatures: [
                'Private forum access',
                'Member resources',
                'Entry to annual conference',
                'Official member t-shirt',
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
            transferFeatures: [
                {
                    id: 1,
                    name: 'Enhanced Exam Scheduling',
                    description:
                        'Simplify your exam calendar with ExamTimer. Easily add and manage multiple exams, ensuring a well-organized and structured schedule for administrators and students alike.',
                    icon: CalendarDaysIcon,
                },
                {
                    id: 2,
                    name: 'Seamless Exam Initiation',
                    description:
                        "Start exams with ease using ExamTimer's user-friendly interface. Say goodbye to manual setup and enjoy a hassle-free process for prompt and seamless exam sessions.",
                    icon: EnvelopeIcon,
                },
                {
                    id: 3,
                    name: 'Student-Focused Experience',
                    description:
                        'Prioritizing students, ExamTimer offers a dedicated student view feature. With clear exam duration visibility, students can manage their time effectively, reduce stress, and stay focused on their performance.',
                    icon: AcademicCapIcon,
                },
            ],
            communicationFeatures: [
                {
                    id: 1,
                    name: 'Customizable Extra Time',
                    description:
                        'Provide equal opportunities for students with diverse needs by allocating customizable extra time for exams. ExamTimer allows you to easily assign additional time to specific students, accommodating various requirements and ensuring a fair and inclusive exam environment.',
                    icon: ClockIcon,
                },
                {
                    id: 2,
                    name: 'Pre-Exam Reading Time',
                    description:
                        'Offer students valuable pre-exam reading time to review instructions, analyze questions, and plan their approach. With ExamTimer, you can include a dedicated period, such as 5 minutes, before the exam starts to give students a head start and reduce last-minute stress.',
                    icon: BookOpenIcon,
                },
            ]
        }
    },
    unmounted() {
        window.removeEventListener('scroll', this.handleScroll);
    },
    methods: {
        handleScroll() {
            console.log('scrolling');
            console.log(window.scrollY);
            if (window.scrollY > 1550) {
                this.show1 = true;
                setTimeout(() => {
                    this.show3 = true;
                }, 100);
                setTimeout(() => {
                    this.show2 = true;
                }, 200);
                setTimeout(() => {
                    this.show4 = true;
                }, 300);
            }
            if (window.scrollY > 800) {
                this.show5 = true;
            }

        },
    },
    watch: {
        show1() {
            setTimeout(() => {
                this.show1 = true
            }, 2345)
        },
        show2() {
            setTimeout(() => {
                this.show2 = true
            }, 1283)
        },
        show3() {
            setTimeout(() => {
                this.show3 = true
            }, 2373)
        },
        show4() {
            setTimeout(() => {
                this.show4 = true
            }, 1233)
        },
    },
    mounted() {
        this.show6 = true;
    }
        
}
</script>

<template>
    <div class="bg-white pb-8 sm:pb-12 lg:pb-12 -mt-8 z-0 ">
        <div class="overflow-hidden pt-8 sm:pt-12 lg:relative lg:py-48">
            <div class="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-24 lg:px-8">
                <div>
                    <div class="mt-16">
                        <div>
                            <a href="#" class="inline-flex space-x-4">
                                <span class="rounded bg-orange-50 px-2.5 py-1 text-sm font-semibold text-orange-400">What's
                                    new</span>
                                <span class="inline-flex items-center space-x-1 text-sm font-medium text-orange-400">
                                    <span>Just shipped version 0.1.0</span>
                                    <ChevronRightIcon class="h-5 w-5" aria-hidden="true" />
                                </span>
                            </a>
                        </div>
                        <div class="mt-6 sm:max-w-xl">
                            <transition enter-active-class=" ease-in-out duration-700 transition" enter-from-class="opacity-0 " enter-to-class=" opacity-100">
                                <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">Exam management for
                                Schools</h1>
                            </transition>
                            <p class="mt-6 text-xl text-gray-500">Anim aute id magna aliqua ad ad non deserunt sunt. Qui
                                irure qui lorem cupidatat commodo.</p>
                        </div>
                        <form action="#" class="mt-12 sm:flex sm:w-full sm:max-w-lg">
                            <div class="min-w-0 flex-1">
                                <label for="hero-email" class="sr-only">Email address</label>
                                <input id="hero-email" type="email"
                                    class="block w-full rounded-md border border-gray-300 px-5 py-3 text-base text-gray-900 placeholder-gray-500 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                                    placeholder="Enter your email" />
                            </div>
                            <div class="mt-4 sm:mt-0 sm:ml-3">
                                <button type="submit"
                                    class="block w-full rounded-md border border-transparent bg-orange-500 px-5 py-3 text-base font-medium text-white shadow hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 sm:px-10">Sign
                                    Up</button>
                            </div>
                        </form>
                        <div class="mt-6">
                            <div class="inline-flex items-center divide-x divide-gray-300">
                                <div class="flex flex-shrink-0 pr-5">
                                    <StarIcon class="h-5 w-5 text-yellow-400" aria-hidden="true" />
                                    <StarIcon class="h-5 w-5 text-yellow-400" aria-hidden="true" />
                                    <StarIcon class="h-5 w-5 text-yellow-400" aria-hidden="true" />
                                    <StarIcon class="h-5 w-5 text-yellow-400" aria-hidden="true" />
                                    <StarIcon class="h-5 w-5  text-yellow-400" aria-hidden="true" />
                                </div>
                                <div class="min-w-0 flex-1 py-1 pl-5 text-sm text-gray-500 sm:py-3"><span
                                        class="font-medium text-gray-900">Rated 4.8 Starts</span> by over <span
                                        class="font-medium text-orange-600">200 Schools</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="sm:mx-auto sm:max-w-3xl sm:px-6">
                <div class="py-12 sm:relative sm:mt-12 sm:py-16 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
                    <div class="hidden sm:block">
                        <div
                            class="absolute inset-y-0 left-1/2 w-screen rounded-l-3xl bg-gray-50 lg:left-80 lg:right-0 lg:w-full" />
                        <svg class="absolute top-8 right-1/2 -mr-3 lg:left-0 lg:m-0" width="404" height="392" fill="none"
                            viewBox="0 0 404 392">
                            <defs>
                                <pattern id="837c3e70-6c3a-44e6-8854-cc48c737b659" x="0" y="0" width="20" height="20"
                                    patternUnits="userSpaceOnUse">
                                    <rect x="0" y="0" width="4" height="4" class="text-gray-200" fill="currentColor" />
                                </pattern>
                            </defs>
                            <rect width="404" height="392" fill="url(#837c3e70-6c3a-44e6-8854-cc48c737b659)" />
                        </svg>
                    </div>
                    <div class="relative -mr-40 pl-4 sm:mx-auto sm:max-w-3xl sm:px-0 lg:h-full lg:max-w-none lg:pl-12">
                        <transition enter-active-class="transform ease-out duration-1000 transition"
                                enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-20"
                                enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
                                leave-active-class="transition ease-in duration-300" leave-from-class="opacity-100"
                                leave-to-class="opacity-0">
                        <img v-if="show6" class="w-full rounded-md shadow-xl ring-1 ring-black ring-opacity-5 lg:h-full lg:w-auto lg:max-w-none"
                            src="https://i.vgy.me/6HTgKc.png" alt="" />
                        </transition>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="overflow-hidden bg-white py-12 lg:py-20">
        <div class="relative mx-auto max-w-xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <svg class="absolute left-full hidden -translate-x-1/2 -translate-y-1/4 transform lg:block" width="404"
                height="784" fill="none" viewBox="0 0 404 784" aria-hidden="true">
                <defs>
                    <pattern id="b1e6e422-73f8-40a6-b5d9-c8586e37e0e7" x="0" y="0" width="20" height="20"
                        patternUnits="userSpaceOnUse">
                        <rect x="0" y="0" width="4" height="4" class="text-gray-200" fill="currentColor" />
                    </pattern>
                </defs>
                <rect width="404" height="784" fill="url(#b1e6e422-73f8-40a6-b5d9-c8586e37e0e7)" />
            </svg>

            <div class="relative">
                <h2 class="text-center text-3xl font-bold leading-8 tracking-tight text-gray-900 sm:text-4xl">A better way
                    to manage exams</h2>
                <p class="mx-auto mt-4 max-w-3xl text-center text-xl text-gray-500">Give students a non distractive way to
                    keep track of their time during exams. See how much time you have left in your exam at a glance.</p>
            </div>

            <div class="relative mt-12 lg:mt-24 lg:grid lg:grid-cols-2 lg:items-center lg:gap-8">
                <div class="relative">
                    <h3 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Give students a clearer view
                    </h3>
                    <p class="mt-3 text-lg text-gray-500">Say goodbye to the complexities of manual exam management. With
                        ExamTimer, you can streamline your exam processes, enhance efficiency, and create a seamless
                        experience for teachers, examiners, and students alike.</p>

                    <dl class="mt-10 space-y-10">
                        <div v-for="item in transferFeatures" :key="item.id" class="relative">
                            <dt>
                                <div
                                    class="absolute flex h-12 w-12 items-center justify-center rounded-md bg-orange-400 text-white">
                                    <component :is="item.icon" class="h-6 w-6" aria-hidden="true" />
                                </div>
                                <p class="ml-16 text-lg font-medium leading-6 text-gray-900">{{ item.name }}</p>
                            </dt>
                            <dd class="mt-2 ml-16 text-base text-gray-500">{{ item.description }}</dd>
                        </div>
                    </dl>
                </div>

                <div class="relative -mx-4 mt-10 lg:mt-0" aria-hidden="true">
                    <svg class="absolute left-1/2 -translate-x-1/2 translate-y-16 transform lg:hidden" width="784"
                        height="404" fill="none" viewBox="0 0 784 404">
                        <defs>
                            <pattern id="ca9667ae-9f92-4be7-abcb-9e3d727f2941" x="0" y="0" width="20" height="20"
                                patternUnits="userSpaceOnUse">
                                <rect x="0" y="0" width="4" height="4" class="text-gray-200" fill="currentColor" />
                            </pattern>
                        </defs>
                        <rect width="784" height="404" fill="url(#ca9667ae-9f92-4be7-abcb-9e3d727f2941)" />
                    </svg>
                    <transition enter-active-class="transform ease-out duration-500 transition"
                                enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-20"
                                enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
                                leave-active-class="transition ease-in duration-300" leave-from-class="opacity-100"
                                leave-to-class="opacity-0">
                        <img v-if="show5" class="relative mx-auto shadow-lg rounded-xl" width="490" src="https://i.vgy.me/t1TpuG.png"
                            alt="" />
                    </transition>
                </div>
            </div>

            <svg class="absolute right-full hidden translate-x-1/2 translate-y-12 transform lg:block" width="404"
                height="784" fill="none" viewBox="0 0 404 784" aria-hidden="true">
                <defs>
                    <pattern id="64e643ad-2176-4f86-b3d7-f2c5da3b6a6d" x="0" y="0" width="20" height="20"
                        patternUnits="userSpaceOnUse">
                        <rect x="0" y="0" width="4" height="4" class="text-gray-200" fill="currentColor" />
                    </pattern>
                </defs>
                <rect width="404" height="784" fill="url(#64e643ad-2176-4f86-b3d7-f2c5da3b6a6d)" />
            </svg>

            <div class="relative mt-12 sm:mt-16 lg:mt-24">
                <div class="lg:grid lg:grid-flow-row-dense lg:grid-cols-2 lg:items-center lg:gap-8">
                    <div class="lg:col-start-2">
                        <h3 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Flexible Time Management
                        </h3>
                        <p class="mt-3 text-lg text-gray-500">Enhance exam conditions and empower students with ExamTimer's
                            flexible time management features. Customize extra time allocation and accurately track reading
                            time for a fair and efficient exam process.</p>

                        <dl class="mt-10 space-y-10">
                            <div v-for="item in communicationFeatures" :key="item.id" class="relative">
                                <dt>
                                    <div
                                        class="absolute flex h-12 w-12 items-center justify-center rounded-md bg-orange-400 text-white">
                                        <component :is="item.icon" class="h-6 w-6" aria-hidden="true" />
                                    </div>
                                    <p class="ml-16 text-lg font-medium leading-6 text-gray-900">{{ item.name }}</p>
                                </dt>
                                <dd class="mt-2 ml-16 text-base text-gray-500">{{ item.description }}</dd>
                            </div>
                        </dl>
                    </div>

                    <div class="relative -mx-4 mt-10 lg:col-start-1 lg:mt-0 h-full">
                        <svg class="absolute left-1/2 -translate-x-1/2 translate-y-16 transform lg:hidden" width="784"
                            height="404" fill="none" viewBox="0 0 784 404" aria-hidden="true">
                            <defs>
                                <pattern id="e80155a9-dfde-425a-b5ea-1f6fadd20131" x="0" y="0" width="20" height="20"
                                    patternUnits="userSpaceOnUse">
                                    <rect x="0" y="0" width="4" height="4" class="text-gray-200" fill="currentColor" />
                                </pattern>
                            </defs>
                            <rect width="784" height="404" fill="url(#e80155a9-dfde-425a-b5ea-1f6fadd20131)" />
                        </svg>
                        <!-- let itmes stick to the top of the div -->
                        <div class="relative mx-auto h-full align-top space-y-4">
                            <!-- Notification panel, dynamically insert this into the live region when it needs to be displayed -->
                            <transition enter-active-class="transform ease-out duration-500 transition"
                                enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:-translate-x-20"
                                enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
                                leave-active-class="transition ease-in duration-300" leave-from-class="opacity-100"
                                leave-to-class="opacity-0">
                                <div v-if="show1"
                                    class="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg hover:bg-gray-100 bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                                    <div class="p-4">
                                        <div class="flex items-start">
                                            <div class="flex-shrink-0">
                                                <svg class="h-6 w-6 text-green-400"
                                                    x-description="Heroicon name: outline/check-circle"
                                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                    stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z">
                                                    </path>
                                                </svg>
                                            </div>
                                            <div class="ml-3 w-0 flex-1 pt-0.5">
                                                <p class="text-sm font-medium text-gray-900">Exam started</p>
                                                <p class="mt-1 text-sm text-gray-500">Maths Paper 1 has been started</p>
                                            </div>
                                            <div class="ml-4 flex flex-shrink-0">
                                                <button type="button" @click="show1 = false"
                                                    class="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
                                                    <span class="sr-only">Close</span>
                                                    <svg class="h-5 w-5" x-description="Heroicon name: mini/x-mark"
                                                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                                        fill="currentColor" aria-hidden="true">
                                                        <path
                                                            d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z">
                                                        </path>
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </transition>
                            <transition enter-active-class="transform ease-out duration-500 transition"
                                enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:-translate-x-20"
                                enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
                                leave-active-class="transition ease-in duration-300" leave-from-class="opacity-100"
                                leave-to-class="opacity-0">
                                <div v-if="show3"
                                    class="pointer-events-auto w-full max-w-sm overflow-hidden hover:bg-gray-100 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                                    <div class="p-4">
                                        <div class="flex items-start">
                                            <div class="flex-shrink-0">
                                                <svg class="h-6 w-6 text-blue-400"
                                                    x-description="Heroicon name: outline/check-circle"
                                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                    stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z">
                                                    </path>
                                                </svg>
                                            </div>
                                            <div class="ml-3 w-0 flex-1 pt-0.5">
                                                <p class="text-sm font-medium text-gray-900">Extra time started</p>
                                                <p class="mt-1 text-sm text-gray-500">English Paper 2 has started reading
                                                    time</p>
                                            </div>
                                            <div class="ml-4 flex flex-shrink-0">
                                                <button type="button" @click="show3 = false"
                                                    class="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
                                                    <span class="sr-only">Close</span>
                                                    <svg class="h-5 w-5" x-description="Heroicon name: mini/x-mark"
                                                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                                        fill="currentColor" aria-hidden="true">
                                                        <path
                                                            d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z">
                                                        </path>
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </transition>
                            <transition enter-active-class="transform ease-out duration-500 transition"
                                enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:-translate-x-20"
                                enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
                                leave-active-class="transition ease-in duration-300" leave-from-class="opacity-100"
                                leave-to-class="opacity-0">
                                <div v-if="show2"
                                    class="pointer-events-auto w-full max-w-sm overflow-hidden hover:bg-gray-100 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                                    <div class="p-4">
                                        <div class="flex items-start">
                                            <div class="flex-shrink-0">
                                                <svg class="h-6 w-6 text-orange-400"
                                                    x-description="Heroicon name: outline/check-circle"
                                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                    stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z">
                                                    </path>
                                                </svg>
                                            </div>
                                            <div class="ml-3 w-0 flex-1 pt-0.5">
                                                <p class="text-sm font-medium text-gray-900">Reading time started</p>
                                                <p class="mt-1 text-sm text-gray-500">Physics Paper 3 has started reading
                                                    time</p>
                                            </div>
                                            <div class="ml-4 flex flex-shrink-0">
                                                <button type="button" @click="show2 = false"
                                                    class="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
                                                    <span class="sr-only">Close</span>
                                                    <svg class="h-5 w-5" x-description="Heroicon name: mini/x-mark"
                                                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                                        fill="currentColor" aria-hidden="true">
                                                        <path
                                                            d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z">
                                                        </path>
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </transition>
                            <transition enter-active-class="transform ease-out duration-500 transition"
                                enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:-translate-x-20"
                                enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
                                leave-active-class="transition ease-in duration-300" leave-from-class="opacity-100"
                                leave-to-class="opacity-0">
                                <div v-if="show4"
                                    class="pointer-events-auto w-full max-w-sm overflow-hidden hover:bg-gray-100 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                                    <div class="p-4">
                                        <div class="flex items-start">
                                            <div class="flex-shrink-0">
                                                <svg class="h-6 w-6 text-red-400"
                                                    x-description="Heroicon name: outline/x-circle"
                                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                    stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                            <div class="ml-3 w-0 flex-1 pt-0.5">
                                                <p class="text-sm font-medium text-gray-900">Error adding Exam</p>
                                                <p class="mt-1 text-sm text-gray-500">Biology Paper 1 could not be added</p>
                                            </div>
                                            <div class="ml-4 flex flex-shrink-0">
                                                <button type="button" @click="show4 = false"
                                                    class="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
                                                    <span class="sr-only">Close</span>
                                                    <svg class="h-5 w-5" x-description="Heroicon name: mini/x-mark"
                                                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                                        fill="currentColor" aria-hidden="true">
                                                        <path
                                                            d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z">
                                                        </path>
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </transition>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="bg-white">
        <div class="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-2 gap-8 md:grid-cols-6 lg:grid-cols-5">
                <div class="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
                    <img class="h-12" src="https://tailwindui.com/img/logos/tuple-logo-gray-400.svg" alt="Tuple" />
                </div>
                <div class="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
                    <img class="h-12" src="https://tailwindui.com/img/logos/mirage-logo-gray-400.svg" alt="Mirage" />
                </div>
                <div class="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
                    <img class="h-12" src="https://tailwindui.com/img/logos/statickit-logo-gray-400.svg" alt="StaticKit" />
                </div>
                <div class="col-span-1 flex justify-center md:col-span-3 lg:col-span-1">
                    <img class="h-12" src="https://tailwindui.com/img/logos/transistor-logo-gray-400.svg"
                        alt="Transistor" />
                </div>
                <div class="col-span-2 flex justify-center md:col-span-3 lg:col-span-1">
                    <img class="h-12" src="https://tailwindui.com/img/logos/workcation-logo-gray-400.svg"
                        alt="Workcation" />
                </div>
            </div>
        </div>
    </div>

    <div class="bg-white">
        <div class="pt-12 sm:pt-16 lg:pt-20">
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div class="text-center">
                    <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">Simple no-tricks
                        pricing</h2>
                    <p class="mt-4 text-xl text-gray-600">If you're not satisfied, contact us within the first 14 days and
                        we'll send you a full refund.</p>
                </div>
            </div>
        </div>
        <div class="mt-8 bg-gray-100 pb-16 sm:mt-12 sm:pb-20 lg:pb-28">
            <div class="relative">
                <div class="absolute inset-0 h-1/2 bg-white" />
                <div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div class="mx-auto max-w-lg overflow-hidden rounded-lg shadow-lg lg:flex lg:max-w-none">
                        <div class="flex-1 bg-white px-6 py-8 lg:p-12">
                            <h3 class="text-2xl font-bold text-gray-900 sm:text-3xl sm:tracking-tight">Monthly Subscription
                            </h3>
                            <p class="mt-6 text-base text-gray-500">Lorem ipsum dolor sit amet consect etur adipisicing
                                elit. Itaque amet indis perferendis blanditiis repellendus etur quidem assumenda.</p>
                            <div class="mt-8">
                                <div class="flex items-center">
                                    <h4 class="flex-shrink-0 bg-white pr-4 text-base font-semibold text-orange-600">What's
                                        included</h4>
                                    <div class="flex-1 border-t-2 border-gray-200" />
                                </div>
                                <ul role="list"
                                    class="mt-8 space-y-5 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:gap-y-5 lg:space-y-0">
                                    <li v-for="feature in includedFeatures" :key="feature"
                                        class="flex items-start lg:col-span-1">
                                        <div class="flex-shrink-0">
                                            <CheckCircleIcon class="h-5 w-5 text-orange-400" aria-hidden="true" />
                                        </div>
                                        <p class="ml-3 text-sm text-gray-700">{{ feature }}</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div
                            class="bg-gray-50 py-8 px-6 text-center lg:flex lg:flex-shrink-0 lg:flex-col lg:justify-center lg:p-12">
                            <p class="text-lg font-medium leading-6 text-gray-900">Pay each month</p>
                            <div
                                class="mt-4 flex items-center justify-center text-5xl font-bold tracking-tight text-gray-900">
                                <div class="mt-4 flex items-baseline font-bold tracking-tight">
                                                $29
                                                <span
                                                    class="ml-1 text-2xl font-medium tracking-normal text-gray-500">/mo</span>
                                            </div>
                            </div>
                            <p class="mt-4 text-sm">
                                <a href="#" class="font-medium text-gray-500 underline">Learn about our Subscribtion
                                    policy</a>
                            </p>
                            <div class="mt-6">
                                <div class="rounded-md shadow">
                                    <a href="#"
                                        class="flex items-center justify-center rounded-md border border-transparent bg-orange-500 px-5 py-3 text-base font-medium text-white hover:bg-gray-900">Subscribe</a>
                                </div>
                            </div>
                            <div class="mt-4 text-sm">
                                <a href="/pricing" class="font-medium text-gray-900">
                                    See other Pricing Plans
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

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
</template>