<script lang="ts">
import { Popover, PopoverButton, PopoverGroup, PopoverPanel } from "@headlessui/vue";
import authenticate from "../functions/authenticate";
import {
  BookmarkSquareIcon,
  CursorArrowRaysIcon,
  LifebuoyIcon,
  PhoneIcon,
  PlayIcon,
  ShieldCheckIcon,
  XMarkIcon,
  BuildingOffice2Icon,
  BookOpenIcon,
  HomeModernIcon,
} from "@heroicons/vue/24/outline";
import { ChevronDownIcon } from "@heroicons/vue/20/solid";
import { HomeIcon, ChevronRightIcon } from "@heroicons/vue/20/solid";

export default {
  mixins: [authenticate],
  components: {
    BookmarkSquareIcon,
    CursorArrowRaysIcon,
    LifebuoyIcon,
    PhoneIcon,
    PlayIcon,
    ShieldCheckIcon,
    XMarkIcon,
    BuildingOffice2Icon,
    BookOpenIcon,
    HomeModernIcon,
    ChevronDownIcon,
    Popover,
    PopoverButton,
    PopoverGroup,
    PopoverPanel,
    HomeIcon,
    ChevronRightIcon,
  },
  data() {
    return {
      show: false, // changes wheter the banner is shown or not
      show2: false, // changes navbar: false = minimal, true = full
      open1: false,
      open2: false,
      show3: false, // if on page studentview (the fullscreen BUTTON)
      loggedin: false,
      loading: true,
      fullname: "",
      profilepic: "",
      solutions: [
        {
          name: "Home",
          description: "Speak directly to your customers in a more meaningful way.",
          href: "/",
          icon: CursorArrowRaysIcon,
        },
        {
          name: "Free Tier",
          description: "Your customers' data will be safe and secure.",
          href: "/free",
          icon: HomeModernIcon,
        },
        {
          name: "Paid Tier",
          description: "Connect with third-party tools that you're already using.",
          href: "/premium",
          icon: BuildingOffice2Icon,
        },
      ],
      callsToAction: [
        { name: "Watch Demo", href: "#", icon: PlayIcon },
        { name: "Contact Sales", href: "#", icon: PhoneIcon },
      ],
      resources: [
        {
          name: "Help Center",
          description:
            "Get all of your questions answered in our forums or contact support.",
          href: "#",
          icon: LifebuoyIcon,
        },
        {
          name: "Documentation",
          description: "Learn how you can get the most out of our platform.",
          href: "#",
          icon: BookOpenIcon,
        },
        {
          name: "Guides",
          description: "Learn how to maximize our platform to get the most out of it.",
          href: "#",
          icon: BookmarkSquareIcon,
        },
        {
          name: "Policy",
          description: "Read how we deal with your privacy and data security.",
          href: "#",
          icon: ShieldCheckIcon,
        },
      ],
      pages: [
        { name: "Example", href: "#", current: false },
        { name: "Example Subpage", href: "#", current: true },
      ],
    };
  },
  methods: {
    fullscreen1() {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    },
    hide() {
      this.show = !this.show;
      sessionStorage.setItem("show", String(this.show));
    },
    checkvisibility() {
      if (window.location.pathname == "/") { // on home page
        this.show = false; // hides banner
        this.show2 = true; // shows full navbar
      } else if (window.location.pathname == "/payment") { // on payment page 
        this.show = false; // hides banner
        this.show2 = true; // shows full navbar
      } else if (window.location.pathname == "/pricing") { // on pricing page
        this.show = true; // shows banner 
        this.show2 = true; // shows full navbar
      } else if (window.location.pathname == "/account") { // on account page
        this.show = false; // hides banner
        this.show2 = false; // shows minimal navbar
      } else { // default
        this.show2 = false; // shows minimal navbar
        this.show = false; // hides banner
      }
      if (window.location.pathname == "/premium/studentview") { // Shows enter fullscreen button on studentview page
        this.show3 = true;
        this.show = false;
      } else {
        this.show3 = false;
      }
      if (this.show2 === false) {
        // get path name and split it into pages and subpages for a breadcrumb
        var path = window.location.pathname;
        var pages = path.split("/");
        var breadcrumb = [];
        // for example for the path "/premium/extra" it will create the breadcrumb pages: [{ name: 'Premium', href: '/premium', current: false },{ name: 'Extra', href: '#', current: true },]
        // dont create a home, but make sure to create links for each of them and capitalize the first letter
        for (var i = 0; i < pages.length; i++) {
          if (pages[i] != "") {
            if (i == pages.length - 1) {
              breadcrumb.push({
                name: pages[i].charAt(0).toUpperCase() + pages[i].slice(1),
                href: "#",
                current: true,
              });
            } else {
              breadcrumb.push({
                name: pages[i].charAt(0).toUpperCase() + pages[i].slice(1),
                href: "/" + pages[i],
                current: false,
              });
            }
          }
        }
        this.pages = breadcrumb;
      }
    },
    async checkuser() {
      // makes sure to have the previous value while waiting for the new one
      this.loading = true;
      // fetches the userid from checkStatus
      const userid = await this.checkStatus();
      // if returns false then the user is not logged in, else it will return the userid
      if (userid != false) {
        // fetches the user data from the userid
        const response = await this.getData(userid, [
          "full_name",
          "avatar_url",
        ]);
        // if response is "null" then the user is not logged in
        if (response != null) {
          this.loggedin = true;
          this.fullname = response.full_name;
          this.profilepic = response.avatar_url;
        } else {
          this.loggedin = false;
          this.fullname = "";
          this.profilepic = "";
        }
      } else {
        this.loggedin = false;
        this.fullname = "";
        this.profilepic = "";
      }
      this.loading = false;
    },
  },
  watch: {
    // if page routes to this page, then update the navbar
    $route(to, from) {
      this.checkvisibility();
      this.checkuser();
    },
  },
  async mounted() {
    // check which page is shows, and if it is on "/fullscreen" then hide the navbar always
    // this.checkvisibility()
    // this.checkuser()
  },
};
</script>

<template>
  <transition
    enter-active-class="transform ease-in-out duration-700 transition"
    enter-from-class="opacity-0 "
    enter-to-class=" opacity-100"
  >
    <Popover v-if="this.show2" class="relative bg-white z-30">
      <div class="mx-auto px-4 sm:px-6">
        <div
          class="flex items-center justify-between border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10"
        >
          <div class="flex justify-start lg:w-0 lg:flex-1">
            <a href="/" class="flex items-center">
              <img
                class="h-10 justify-start pl-2 sm:h-8 pr-3"
                src="https://i.vgy.me/HGoEMr.png"
                alt="Workflow"
              />
              <div class="text-4xl font-bold justify-start">Online Exam Timer</div>
            </a>
          </div>
          <PopoverGroup as="nav" class="hidden space-x-10 md:flex">
            <Popover class="relative">
              <PopoverButton
                class="text-gray-500 group inline-flex items-center rounded-md bg-white text-base font-medium hover:text-gray-900 focus:outline-none"
              >
                <span>Solutions</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="text-gray-400 ml-2 h-5 w-5 group-hover:text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </PopoverButton>

              <transition
                enter-active-class="transition ease-out duration-200"
                enter-from-class="opacity-0 translate-y-1"
                enter-to-class="opacity-100 translate-y-0"
                leave-active-class="transition ease-in duration-150"
                leave-from-class="opacity-100 translate-y-0"
                leave-to-class="opacity-0 translate-y-1"
              >
                <PopoverPanel
                  class="absolute z-10 -ml-4 mt-8 w-screen max-w-md transform px-2 sm:px-0 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2"
                >
                  <div
                    class="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5"
                  >
                    <div class="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                      <a
                        v-for="item in solutions"
                        :key="item.name"
                        :href="item.href"
                        class="-m-3 flex items-start rounded-lg p-3 hover:bg-gray-50"
                      >
                        <component
                          :is="item.icon"
                          class="h-6 w-6 flex-shrink-0 text-orange-600"
                          aria-hidden="true"
                        />
                        <div class="ml-4">
                          <p class="text-base font-medium text-gray-900">
                            {{ item.name }}
                          </p>
                          <p class="mt-1 text-sm text-gray-500">{{ item.description }}</p>
                        </div>
                      </a>
                    </div>
                    <div
                      class="space-y-6 bg-gray-50 px-5 py-5 sm:flex sm:space-y-0 sm:space-x-10 sm:px-8"
                    >
                      <div
                        v-for="item in callsToAction"
                        :key="item.name"
                        class="flow-root"
                      >
                        <a
                          :href="item.href"
                          class="-m-3 flex items-center rounded-md p-3 text-base font-medium text-gray-900 hover:bg-gray-100"
                        >
                          <component
                            :is="item.icon"
                            class="h-6 w-6 flex-shrink-0 text-gray-400"
                            aria-hidden="true"
                          />
                          <span class="ml-3">{{ item.name }}</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </PopoverPanel>
              </transition>
            </Popover>

            <Popover class="relative">
              <PopoverButton
                class="text-gray-500 group inline-flex items-center rounded-md bg-white text-base font-medium hover:text-gray-900 focus:outline-none"
              >
                <span>Support</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="text-gray-400 ml-2 h-5 w-5 group-hover:text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </PopoverButton>

              <transition
                enter-active-class="transition ease-out duration-200"
                enter-from-class="opacity-0 translate-y-1"
                enter-to-class="opacity-100 translate-y-0"
                leave-active-class="transition ease-in duration-150"
                leave-from-class="opacity-100 translate-y-0"
                leave-to-class="opacity-0 translate-y-1"
              >
                <PopoverPanel
                  class="absolute left-1/2 z-10 mt-8 w-screen max-w-md -translate-x-1/2 transform px-2 sm:px-0"
                >
                  <div
                    class="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5"
                  >
                    <div class="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                      <a
                        v-for="item in resources"
                        :key="item.name"
                        :href="item.href"
                        class="-m-3 flex items-start rounded-lg p-3 hover:bg-gray-50"
                      >
                        <component
                          :is="item.icon"
                          class="h-6 w-6 flex-shrink-0 text-orange-600"
                          aria-hidden="true"
                        />
                        <div class="ml-4">
                          <p class="text-base font-medium text-gray-900">
                            {{ item.name }}
                          </p>
                          <p class="mt-1 text-sm text-gray-500">{{ item.description }}</p>
                        </div>
                      </a>
                    </div>
                  </div>
                </PopoverPanel>
              </transition>
            </Popover>
            <a
              href="/pricing"
              class="text-base font-medium text-gray-500 hover:text-gray-900"
              >Pricing</a
            >
          </PopoverGroup>
          <!-- skeleton loader if loading is true -->
          <div v-if="loading" class="items-center justify-end md:flex md:flex-1 lg:w-0">
            <a class="group block flex-shrink-0">
              <div class="flex items-center">
                <div>
                  <div class="animate-pulse h-9 w-9 rounded-full" />
                </div>
                <div class="ml-3 space-y-2 w-28">
                  <div class="h-4 rounded"></div>
                  <div class="h-4 rounded"></div>
                </div>
              </div>
            </a>
          </div>
          <transition
            enter-active-class="transform ease-in-out duration-500 transition"
            enter-from-class="opacity-0 "
            enter-to-class=" opacity-100"
          >
            <div
              v-if="!loggedin && !loading"
              class="items-center justify-end md:flex md:flex-1 lg:w-0"
            >
              <a
                @click="this.$router.push('/login')"
                class="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
                >Sign in</a
              >
              <a
                @click="this.$router.push('/register')"
                class="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-orange-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-orange-600"
                >Sign up</a
              >
            </div>
          </transition>
          <transition
            enter-active-class="transform ease-in-out duration-500 transition"
            enter-from-class="opacity-0 "
            enter-to-class=" opacity-100"
          >
            <div
              v-if="loggedin && !loading"
              class="items-center justify-end md:flex md:flex-1 lg:w-0"
            >
              <a href="/account" class="group block flex-shrink-0">
                <div class="flex items-center">
                  <div>
                    <img
                      class="inline-block h-9 w-9 object-cover rounded-full"
                      :src="this.profilepic"
                      referrerpolicy="no-referrer"
                      alt=""
                    />
                  </div>
                  <div class="ml-3">
                    <p
                      class="text-sm font-medium text-gray-700 group-hover:text-gray-900"
                    >
                      {{ this.fullname }}
                    </p>
                    <p
                      class="text-xs font-medium text-gray-500 group-hover:text-gray-700"
                    >
                      View profile
                    </p>
                  </div>
                </div>
              </a>
            </div>
          </transition>
        </div>
      </div>
    </Popover>
  </transition>
  <transition
    enter-active-class="transform ease-in-out duration-700 transition"
    enter-from-class="opacity-0 "
    enter-to-class=" opacity-100"
  >
    <nav
      v-if="this.show2 === false"
      class="flex fixed pt-4 pl-4 z-30"
      aria-label="Breadcrumb"
    >
      <ol role="list" class="flex space-x-4 rounded-md bg-white px-6 shadow">
        <li class="flex">
          <div class="flex items-center">
            <a href="/" class="text-gray-400 flex items-center hover:text-gray-500">
              <HomeIcon class="h-10 w-4 flex-shrink-0 text-gray-400" aria-hidden="true" />
              <a class="ml-2 text-sm font-medium text-gray-500 hover:text-gray-700"
                >Home</a
              >
            </a>
          </div>
        </li>
        <li v-for="page in pages" :key="page.name" class="flex"> 
          <div class="flex items-center">
            <ChevronRightIcon
              class="h-5 w-5 flex-shrink-0 text-gray-400"
              aria-hidden="true"
            />
            <a
              :href="page.href"
              class="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
              :aria-current="page.current ? 'page' : undefined"
              >{{ page.name }}</a
            >
          </div>
        </li>
      </ol>
      <!-- <ol role="list" class="flex space-x-4 rounded-md bg-white px-6 shadow">
        <li class="flex">
          <div class="flex items-center">
            <a href="/" class="text-gray-400 flex items-center hover:text-gray-500">
                <HomeIcon class="h-10 w-4 flex-shrink-0 text-gray-400" aria-hidden="true" />
                <a class="ml-2 text-sm font-medium text-gray-500 hover:text-gray-700">Home</a>
            </a>
          </div>
        </li>
        <li class="flex">
          <div class="flex items-center">
            <ChevronRightIcon class="h-10 w-6 flex-shrink-0 text-gray-400" aria-hidden="true" />
            <a href="/premium" class="mx-4 text-sm font-medium text-gray-500 hover:text-gray-700">Premium</a>
          </div>
        </li>
      </ol> -->
      <div v-if="show3" class="mt-4 space-x-4 sm:mt-0 sm:flex-none pl-2">
        <span class="isolate inline-flex rounded-md shadow bg-white">
          <button
            type="button"
            class="relative inline-flex items-center rounded-md bg-white px-4 py-2 text-sm group/button1 font-medium text-gray-500 hover:bg-gray-50 focus:z-10"
            @click.native="fullscreen1"
          >
            <svg
              class="h-6 w-4 group-hover/button1:mr-2 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
            >
              <!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
              <path
                fill="currentColor"
                d="M496 304h-416v-224H32v240c0 17.6 14.4 32 32 32L264 352v47.02l-72 72c-9.354 9.352-9.354 24.52 0 33.88c9.348 9.348 24.51 9.359 33.87 .0195L288 442.9l62.09 62.09c9.391 9.391 24.63 9.348 33.97-.0938c9.301-9.406 9.258-24.55-.0938-33.91L312 399V352L512 352c17.6 0 32-14.4 32-32V80h-48V304zM552 0H23.96C10.72 0 0 10.73 0 23.95S10.72 48 23.96 48h528.1C565.3 48 576 37.27 576 24.05S565.3 0 552 0z"
              />
            </svg>
            <span
              class="text-md w-0 collapse group-hover/button1:visible group-hover/button1:w-min"
              >Fullscreen</span
            >
          </button>
        </span>
      </div>
    </nav>
  </transition>
  <transition
    enter-active-class="transform ease-out duration-400 transition"
    enter-from-class="translate-y-4 opacity-0 sm:translate-y-0 sm:translate-x-2"
    enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
    leave-active-class="transition ease-in duration-100"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div v-if="this.show" class="fixed z-50 inset-x-0 bottom-0 pb-2 sm:pb-5">
      <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div class="rounded-lg p-2 bg-gray-50 shadow-lg sm:p-3">
          <div class="flex flex-wrap items-center justify-between">
            <div class="flex w-0 flex-1 items-center">
              <span class="flex rounded-lg bg-gray-100 p-2">
                <svg
                  class="h-6 w-6 text-orange-500"
                  x-description="Heroicon name: outline/megaphone"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 010 3.46"
                  ></path>
                </svg>
              </span>
              <p class="ml-3 truncate font-medium text-black">
                <span class="hidden md:inline"
                  >Big news! We're excited to announce a brand new product.</span
                >
              </p>
            </div>
            <div class="order-3 mt-2 w-full flex-shrink-0 sm:order-2 sm:mt-0 sm:w-auto">
              <a
                href="#"
                class="flex items-center text-black justify-center rounded-md border border-transparent bg-white px-4 py-2 text-sm font-medium shadow-sm hover:bg-gray-200"
                >Learn more</a
              >
            </div>
            <div class="order-2 flex-shrink-0 sm:order-3 sm:ml-2">
              <button
                type="button"
                class="-mr-1 flex rounded-md p-2 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-white"
                @click="hide"
              >
                <span class="sr-only">Dismiss</span>
                <svg
                  class="h-6 w-6 text-black"
                  x-description="Heroicon name: outline/x-mark"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
  <main>
    <router-view />
  </main>
</template>
