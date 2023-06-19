<script lang="ts">
import authenticate from "../../functions/authenticate";
import payment_component from "../../components/payment/accountpayment.vue";
import { toRaw }  from "vue";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  RadioGroup,
  RadioGroupDescription,
  RadioGroupLabel,
  RadioGroupOption,
  Switch,
  SwitchGroup,
  SwitchLabel,
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot
} from "@headlessui/vue";
import {
  MagnifyingGlassIcon,
  QuestionMarkCircleIcon
} from "@heroicons/vue/20/solid";
import {
  Bars3Icon,
  BellIcon,
  CogIcon,
  CreditCardIcon,
  KeyIcon,
  SquaresPlusIcon,
  UserCircleIcon,
  XMarkIcon,
  TrashIcon
} from "@heroicons/vue/24/outline";
import { ExclamationTriangleIcon } from "@heroicons/vue/24/outline";
import ComponentOverlay from "../../components/completeAccount.vue";
import DataUpdatingPopup from "../../components/dataUpdatingPopup.vue";
import notification from "../../components/Notifications.vue";

const users = {
  name: "Lisa Marie",
  email: "lisamarie@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=80"
};
const navigation = [
  { name: "Dashboard", href: "#" },
  { name: "Jobs", href: "#" },
  { name: "Applicants", href: "#" },
  { name: "Company", href: "#" }
];
const userNavigation = [
  { name: "Home", href: "this.$router.push('/')" },
  { name: "Sign out", href: "signout()" }
];

const initActiveSubnav = 0;

const subNavigation = [
  {
    name: "Profile",
    href: "#",
    icon: UserCircleIcon,
    current: initActiveSubnav == 0,
    idx: 0
  },
  {
    name: "Account",
    href: "#",
    icon: CogIcon,
    current: initActiveSubnav == 1,
    idx: 1
  },
  {
    name: "Password",
    href: "#",
    icon: KeyIcon,
    current: initActiveSubnav == 2,
    idx: 2
  },
  // {
  //   name: "Notifications",
  //   href: "#",
  //   icon: BellIcon,
  //   current: initActiveSubnav == 3,
  //   idx: 3
  // },
  {
    name: "Plan & Billing",
    href: "#",
    icon: CreditCardIcon,
    current: initActiveSubnav == 4,
    idx: 4
  },
  {
    name: "Integrations",
    href: "#",
    icon: SquaresPlusIcon,
    current: initActiveSubnav == 5,
    idx: 5
  }
];

export default {
  name: "Payment",
  mixins: [authenticate, notification],
  components: {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    RadioGroup,
    RadioGroupDescription,
    RadioGroupLabel,
    RadioGroupOption,
    Switch,
    SwitchGroup,
    SwitchLabel,
    MagnifyingGlassIcon,
    QuestionMarkCircleIcon,
    Bars3Icon,
    BellIcon,
    CogIcon,
    CreditCardIcon,
    KeyIcon,
    SquaresPlusIcon,
    UserCircleIcon,
    XMarkIcon,
    ComponentOverlay,
    DataUpdatingPopup,
    TrashIcon,
    payment_component,
    Dialog,
    DialogPanel,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
    ExclamationTriangleIcon
  },
  data() {
    return {
      users,
      navigation,
      userNavigation,
      subNavigation,
      // General
      loading: true,
      loggedin: false,
      // Profile Subnav
      deletePopup: false,
      // Account Subnav
      editingAccount: false,
      unsavedChanges: false,
      savingdata: false,
      savingAvatar: false,
      deletingAccount: false,
      showUpdatingPopup: false,
      editUser: { // gets set once when page loads and is what v-models sre bound to
        userid: "",
        username: "",
        plan: 0,
        fullname: "",
        avatarurl: "",
        provider: "",
        email: "",
        metadata: {
          name: "",
          enterprise: false,
          location: {
            country: "",
            city: "",
            state: "",
            zip: "",
            address1: "",
            address2: "",
            address3: "",
          },
        },
        setupComplete: false,
      },
      user: {// stays the same the whole time, to compare values to...
        userid: "",
        username: "",
        plan: 0,
        fullname: "",
        avatarurl: "",
        provider: "",
        email: "",
        metadata: {
          name: "",
          enterprise: false,
          location: {
            country: "",
            city: "",
            state: "",
            zip: "",
            address1: "",
            address2: "",
            address3: "",
          },
        },
        setupComplete: false,
      },
      newimg: null,
      hasimg: false,
      defaultImgURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png',
    };
  },
  mounted() {
    this.checkuser();

    // setInterval(() => {
    //   console.log(this.$store.state.metadata.location.state);
    // }, 500);
  },
  watch: {
    editUser: {
      // compare this.editUser to this.user 
      handler: function (val, oldVal) {
        if (JSON.stringify(val) !== JSON.stringify(this.user)) {
          this.unsavedChanges = true;
        } else {
          this.unsavedChanges = false;
        }
      },
      deep: true,
    },
    "editUser.avatarurl": function (val, oldVal) {
      if (val === "") {
        this.editUser.avatarurl = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png'::text";
      }
    },
    // savingData: {
    //   handler: function(newVal, oldVal) {
    //     if (newVal == false) {
    //       setTimeout(() => {
    //         this.showUpdatingPopup = false;
    //       }, 3000);
    //     }
    //     else {
    //       this.showUpdatingPopup = true;
    //     }
    //   }
    // }
  },
  methods: {
    async checkuser() {
      while (this.$store.state.userid === "null") {
        console.log("waiting for userid");
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
      if (this.$store.state.userid === "null") {
        this.signedin = false;
      } else {
        this.user = {
          ...this.$store.state,
          metadata: {
            ...this.$store.state.metadata,
            location: { ...this.$store.state.metadata.location }
          }
        };
        this.editUser = {
          ...this.$store.state,
          metadata: {
            ...this.$store.state.metadata,
            location: { ...this.$store.state.metadata.location }
          }
        };
        this.hasimg = this.user.avatarurl != this.defaultImgURL
      }
      console.log("mounted")

      this.loading = false;
    },
    handleFiles(event: Event) {      
      console.log('handleFiles')

      const imgObject = event.target.files[0]
      
      document.getElementById("image")
       .src = URL.createObjectURL(imgObject)
      console.log(imgObject)
      this.avatarfile = imgObject
      this.newimg = imgObject
      this.hasimg = true

    },
    resetProfilePic() {
      document.getElementById("image").src = this.user.avatarurl;
      if (this.user.avatarurl != this.defaultImgURL) {
        this.hasimg = true
      } else {
        this.hasimg = false
      }
    },
    async signUserOut() {
      await this.signout();
      // push to home page, but with reloading the whole page
      window.location.href = "/";
    },
    removeImg(){
      this.newimg = null
      document.getElementById("image")
        .src = this.defaultImgURL
      document.getElementById("file-upload")
        .value = ""
      this.hasimg = false
      console.log(this)
    },
    async updateAccountData() {
      this.savingdata = true;
      this.editingAccount = false;
      console.log("updating data");
      const response = await this.updateUserData(this.user.userid, {
        ...this.editUser,
        metadata: {
          ...this.editUser.metadata,
          location: { ...this.editUser.metadata.location }
        }
      });

      console.log(response);
      this.user = {
        ...this.editUser,
        metadata: {
          ...this.editUser.metadata,
          location: { ...this.editUser.metadata.location }
        }
      };
      this.unsavedChanges = false;
      this.savingdata = false;
    },
    async updateProfile() {
      this.savingdata = true;
      this.savingAvatar = true;
      if (this.newimg == null && !this.hasimg) {
        console.log('resetting avatar')
        await this.resetAvatar(this.user.userid)
      }
      else if (this.newimg != null) {
        console.log('updating avatar')
        await this.updateAvatar(this.user.userid, this.newimg)
      }
      else console.log('no changes to avatar')

      if (this.editUser.username != this.user.username) {
        await this.updateUserData(this.user.userid, {username: this.editUser.username})
      }
      this.editingAccount = false;
      this.savingAvatar = false;
      this.savingdata = false;
    },
    async updatePassword() {
      this.savingData = true;
      if (this.password != '') {
          await this.updateUserAuth(this.user.userid, {password: this.password})
      }
      this.editingAccount = false;
      this.savingData = false;
    },
    discardChanges() {
      if (this.subNavigation[0].current) {
        this.resetProfilePic();
      }
      this.editingAccount = false;
      this.editUser = {
        ...this.$store.state,
        metadata: {
          ...this.$store.state.metadata,
          location: { ...this.$store.state.metadata.location }
        }
      };
    },
    test() {
      notification.methods.showNotification("simple", "test", "IconHome", 10000)
    }
  }
};
</script>
<template v-if="this.loading === false">
  <!-- Delete Popup -->
  <TransitionRoot as="template" :show="deletePopup">
    <Dialog as="div" class="relative z-50" @close="deletePopup = false">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        />
      </TransitionChild>

      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div
          class="flex min-h-full items-end justify-center p-4 pl-20 text-center sm:items-center sm:p-0"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
            >
              <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div class="sm:flex sm:items-start">
                  <div
                    class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"
                  >
                    <ExclamationTriangleIcon
                      class="h-6 w-6 text-red-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <DialogTitle
                      as="h3"
                      class="text-lg font-medium leading-6 text-gray-900"
                      >Deactivate account</DialogTitle
                    >
                    <div class="mt-2">
                      <p class="text-sm text-gray-500">
                        Are you sure you want to deactivate your account? All of
                        your data will be permanently removed. This action
                        cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6"
              >
                <button
                  type="button"
                  class="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                  @click="deletePopup = false; test()"
                >
                  Deactivate
                </button>
                <button
                  type="button"
                  class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  @click="deletePopup = false"
                  ref="cancelButtonRef"
                >
                  Cancel
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>

  <ComponentOverlay v-if="this.user.setupComplete === false && !loading" />
  <!-- Account Page -->
  <transition
    enter-active-class="transform ease-in-out duration-500 transition"
    enter-from-class="opacity-0 "
    enter-to-class="x opacity-100"
  >
    <Menu
      v-if="loading === false"
      as="div"
      class="fixed right-4 top-4 ml-4 flex-shrink-0 z-10"
    >
      <div>
        <MenuButton class="flex p-2.5 rounded-lg shadow bg-white">
          <div class="flex">
            <div>
              <img
                class="flex h-5 w-5 object-cover rounded-full"
                :src="this.user.avatarurl"
                referrerpolicy="no-referrer"
                alt=""
              />
            </div>
            <div class="ml-3">
              <p
                class="text-sm font-medium text-gray-700 group-hover:text-gray-900"
              >
                {{ this.user.fullname }}
              </p>
            </div>
          </div>
        </MenuButton>
      </div>
      <transition
        enter-active-class="transition ease-out duration-100"
        enter-from-class="transform opacity-0 scale-95"
        enter-to-class="transform opacity-100 scale-100"
        leave-active-class="transition ease-in duration-75"
        leave-from-class="transform opacity-100 scale-100"
        leave-to-class="transform opacity-0 scale-95"
      >
        <MenuItems
          class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          <MenuItem
            v-for="item in userNavigation"
            :key="item.name"
            v-slot="{ active }"
          >
            <a
              @click="
                item.name === 'Home' ? this.$router.push('/') : signUserOut()
              "
              :class="[
                active ? 'bg-gray-100' : '',
                'block py-2 px-4 text-sm text-gray-700'
              ]"
              >{{ item.name }}</a
            >
          </MenuItem>
        </MenuItems>
      </transition>
    </Menu>
  </transition>
  <div class="h-full pt-20" v-if="this.loading === false"></div>
  <transition
    enter-active-class="transform ease-in-out duration-700 transition"
    enter-from-class="opacity-0 "
    enter-to-class=" opacity-100"
  >
    <main
      class="mx-auto max-w-7xl pb-10 lg:py-12 lg:px-8"
      v-if="this.loading === false"
    >
      <div class="lg:grid lg:grid-cols-12 lg:gap-x-5 ">
        <aside class="py-6 px-2 sm:px-6 lg:col-span-3 lg:py-0 lg:px-0">
          <nav class="space-y-1">
            <!-- on click change old one to false and the one that was clicked to true -->
            <a
              v-for="item in subNavigation"
              :key="item.name"
              @click="
                discardChanges();
                subNavigation.forEach((item) => (item.current = false));
                item.current = true;
                editingAccount = false;
              "
              :class="[
                item.current
                  ? 'bg-gray-50 text-orange-600 hover:bg-white'
                  : 'text-gray-900 hover:text-gray-900 hover:bg-gray-50',
                'group rounded-md px-3 py-2 flex items-center text-sm font-medium'
              ]"
              :aria-current="item.current ? 'page' : undefined"
            >
              <component
                :is="item.icon"
                :class="[
                  item.current
                    ? 'text-orange-500'
                    : 'text-gray-400 group-hover:text-gray-500',
                  'flex-shrink-0 -ml-1 mr-3 h-6 w-6'
                ]"
                aria-hidden="true"
              />
              <span class="truncate">{{ item.name }}</span>
            </a>
          </nav>
        </aside>

        <!-- Profile -->

        <div
          class="space-y-6 sm:px-6 lg:col-span-9 lg:px-0"
          v-if="subNavigation[0].current"
        >
          <div class="shadow sm:overflow-hidden sm:rounded-md">
            <div class="space-y-6 bg-white py-6 px-4 sm:p-6">
              <div>
                <h3 class="text-lg font-medium leading-6 text-gray-900">
                  Profile
                </h3>
                <p class="mt-1 text-sm text-gray-500">
                  This information will be displayed publicly so be careful what
                  you share.
                </p>
              </div>

              <div class="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
                <div class="col-span-2 sm:col-span-2">
                  <label class="block text-sm font-medium text-gray-700"
                    >Username</label
                  >
                  <div class="mt-6 flex rounded-md shadow-sm">
                    <span
                      class="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm"
                      >examtimer.tech/</span
                    >
                    <input
                      v-model="editUser.username"
                      type="text"
                      name="username"
                      autocomplete="username"
                      :disabled="!editingAccount"
                      class="block w-full min-w-0 flex-grow rounded-none rounded-r-md border-gray-300 focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div class="col-span-1">
                  <label for="photo" class="block text-sm font-medium text-gray-700" @click="console.log('hi')"
                    >Profile Picture</label
                  >
                  <div class=" flex items-center">
                    <span id="profilePreviewDiv" class="h-12 w-12 overflow-hidden rounded-full bg-gray-100 flex items-center justify-center">
                        <img v-if="!loading" id="image" class="h-full w-full object-cover" :src="user.avatarurl" />
                        <svg v-else class="animate-spin h-5 w-5 text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    </span>
                    <label
                      for="file-upload"
                      class="ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium m-6 mr-4 leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                    >
                    <span>{{
                        hasimg ? "Change Photo" : "Upload Image"
                      }}</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        class="sr-only"
                        :disabled="!editingAccount"
                        @change="handleFiles($event)"
                      />
                    </label>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-8 h-8 p-1.5 text-gray-400 rounded-md hover:text-gray-300 hover:bg-gray-200"
                      v-if="hasimg && editingAccount"
                      @click="removeImg()"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </div>


                </div>
              </div>
            </div>

            <div class="flex md:flex-row sm:flex-col w-full bg-gray-50 md:justify-end sm:justify-center">
              <div class="bg-gray-50 pr-2  py-3 text-right s" v-if="editingAccount">
                <button
                  type="button"
                  @click="editingAccount = false; discardChanges()"
                  class="inline-flex justify-center rounded-md border border-transparent bg-red-500 py-2 px-4 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                >
                  Cancel
                </button>
              </div>

              <div class="bg-gray-50 pr-6  py-3 text-right ">
                <button
                  type="button"
                  @click="editingAccount ? updateProfile() : editingAccount = true"
                  class="inline-flex justify-center rounded-md border border-transparent bg-gray-800 py-2 px-4 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2"
                >
                  {{editingAccount ? "Save" : "Edit"}}
                </button>
              </div>
            </div>
            
          </div>
          <div class="bg-white shadow sm:rounded-lg">
            <div class="px-4 py-5 sm:p-6">
              <h3 class="text-lg font-medium leading-6 text-gray-900">
                Delete your account
              </h3>
              <div class="mt-2 sm:flex sm:items-start sm:justify-between">
                <div class="max-w-xl text-sm text-gray-500">
                  <p>
                    Once you delete your account, you will lose all data
                    associated with it.
                  </p>
                </div>
                <div
                  class="mt-5 sm:mt-0 sm:ml-6 sm:flex sm:flex-shrink-0 sm:items-center"
                >
                  <button
                    @click="deletePopup = true"
                    type="button"
                    class="inline-flex items-center justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 font-medium text-red-700 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:text-sm"
                  >
                    Delete account
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Account -->
        <div
          class="space-y-6 sm:px-6 lg:col-span-9 lg:px-0"
          v-if="subNavigation[1].current && !this.loading"
        >
          <section aria-labelledby="payment-details-heading">
            <div>
              <div class="shadow sm:overflow-hidden sm:rounded-md">
                <div class="bg-white py-6 px-4 sm:p-6">
                  <div>
                    <h2
                      id="payment-details-heading"
                      class="text-lg font-medium leading-6 text-gray-900"
                    >
                      Account
                    </h2>
                    <p class="mt-1 text-sm text-gray-500">
                      This is the current information for your school. If
                      anything here is wrong, please contact us to change it.
                    </p>
                  </div>
                  <div class="pt-8 grid grid-cols-4 gap-6">
                    <div v-if="this.editUser.plan != 0" class="col-span-4 sm:col-span-2">
                      <label class="block text-sm font-medium text-gray-700"
                        >School Name</label
                      >
                      <input
                        v-model="editUser.fullname"
                        :readonly="!editingAccount"
                        type="text"
                        name="school-name"
                        id="school-name"
                        class="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
                      />
                    </div>

                    <div v-if="this.editUser.plan == 0" class="col-span-4 sm:col-span-2">
                      <label class="block text-sm font-medium text-gray-700"
                        >Full Name</label
                      >
                      <input
                        v-model="editUser.fullname"
                        :readonly="!editingAccount"
                        type="text"
                        name="school-name"
                        id="full-name"
                        class="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
                      />
                    </div>

                    <div class="col-span-4 sm:col-span-2">
                      <label class="block text-sm font-medium text-gray-700"
                        >Email Address</label
                      >
                      <input
                        v-model="editUser.email"
                        readonly
                        type="text"
                        name="email-address"
                        id="email-address"
                        autocomplete="email"
                        class="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
                      />
                    </div>

                    <div class="col-span-4 sm:col-span-3">
                      <label class="block text-sm font-medium text-gray-700"
                        >Address Line 1</label
                      >
                      <input
                        v-model="editUser.metadata.location.address1"
                        :readonly="!editingAccount"
                        type="text"
                        name="address-1"
                        id="address-1"
                        autocomplete="address-line-1"
                        class="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
                      />
                    </div>

                    <div class="col-span-4 sm:col-span-1">
                      <label class="block text-sm font-medium text-gray-700"
                        >ZIP / Postal code</label
                      >
                      <input
                        v-model="editUser.metadata.location.zip"
                        :readonly="!editingAccount"
                        type="text"
                        name="postal-code"
                        id="zip"
                        autocomplete="postal-code"
                        class="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
                      />
                    </div>

                    <div class="col-span-4 sm:col-span-2">
                      <label class="block text-sm font-medium text-gray-700"
                        >Address Line 2</label
                      >
                      <input
                        v-model="editUser.metadata.location.address2"
                        :readonly="!editingAccount"
                        type="text"
                        name="address-2"
                        id="address-2"
                        autocomplete="address-line-2"
                        class="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
                      />
                    </div>

                    <div class="col-span-4 sm:col-span-2">
                      <label class="block text-sm font-medium text-gray-700"
                        >State / County</label
                      >
                      <input
                        v-model="editUser.metadata.location.state"
                        :readonly="!editingAccount"
                        type="text"
                        name="state"
                        id="state"
                        autocomplete="address-level1"
                        class="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
                      />
                    </div>

                    <div class="col-span-4 sm:col-span-2">
                      <label class="block text-sm font-medium text-gray-700"
                        >Address Line 3</label
                      >
                      <input
                        v-model="editUser.metadata.location.address3"
                        :readonly="!editingAccount"
                        type="text"
                        name="address-3"
                        id="address-3"
                        autocomplete="address-line-3"
                        class="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
                      />
                    </div>

                    <div class="col-span-4 sm:col-span-2">
                      <label class="block text-sm font-medium text-gray-700"
                        >Country</label
                      >
                      <!-- <input v-model="userMetadata.data.address.country" :readonly="!editingAccount" type="text" name="address-2" id="country" autocomplete="address-line-2"
                        class="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm" /> -->
                      <select
                        v-model="editUser.metadata.location.country"
                        :disabled="!editingAccount"
                        id="country"
                        name="address-2"
                        autocomplete="country-name"
                        class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
                      >
                        <option value="">Please select</option>
                        <option value="Afghanistan">Afghanistan</option>
                        <option value="Aland Islands">Aland Islands</option>
                        <option value="Albania">Albania</option>
                        <option value="Algeria">Algeria</option>
                        <option value="American Samoa">American Samoa</option>
                        <option value="Andorra">Andorra</option>
                        <option value="Angola">Angola</option>
                        <option value="Anguilla">Anguilla</option>
                        <option value="Antarctica">Antarctica</option>
                        <option value="Antigua and Barbuda">
                          Antigua and Barbuda
                        </option>
                        <option value="Argentina">Argentina</option>
                        <option value="Armenia">Armenia</option>
                        <option value="Aruba">Aruba</option>
                        <option value="Australia">Australia</option>
                        <option value="Austria">Austria</option>
                        <option value="Azerbaijan">Azerbaijan</option>
                        <option value="Bahamas">Bahamas</option>
                        <option value="Bahrain">Bahrain</option>
                        <option value="Bangladesh">Bangladesh</option>
                        <option value="Barbados">Barbados</option>
                        <option value="Belarus">Belarus</option>
                        <option value="Belgium">Belgium</option>
                        <option value="Belize">Belize</option>
                        <option value="Benin">Benin</option>
                        <option value="Bermuda">Bermuda</option>
                        <option value="Bhutan">Bhutan</option>
                        <option value="Bolivia">Bolivia</option>
                        <option value="Bonaire, Sint Eustatius and Saba">
                          Bonaire, Sint Eustatius and Saba
                        </option>
                        <option value="Bosnia and Herzegovina">
                          Bosnia and Herzegovina
                        </option>
                        <option value="Botswana">Botswana</option>
                        <option value="Bouvet Island">Bouvet Island</option>
                        <option value="Brazil">Brazil</option>
                        <option value="British Indian Ocean Territory">
                          British Indian Ocean Territory
                        </option>
                        <option value="Brunei Darussalam">
                          Brunei Darussalam
                        </option>
                        <option value="Bulgaria">Bulgaria</option>
                        <option value="Burkina Faso">Burkina Faso</option>
                        <option value="Burundi">Burundi</option>
                        <option value="Cambodia">Cambodia</option>
                        <option value="Cameroon">Cameroon</option>
                        <option value="Canada">Canada</option>
                        <option value="Cape Verde">Cape Verde</option>
                        <option value="Cayman Islands">Cayman Islands</option>
                        <option value="Central African Republic">
                          Central African Republic
                        </option>
                        <option value="Chad">Chad</option>
                        <option value="Chile">Chile</option>
                        <option value="China">China</option>
                        <option value="Christmas Island">
                          Christmas Island
                        </option>
                        <option value="Cocos (Keeling) Islands">
                          Cocos (Keeling) Islands
                        </option>
                        <option value="Colombia">Colombia</option>
                        <option value="Comoros">Comoros</option>
                        <option value="Congo">Congo</option>
                        <option value="Congo, Democratic Republic of the Congo">
                          Congo, Democratic Republic of the Congo
                        </option>
                        <option value="Cook Islands">Cook Islands</option>
                        <option value="Costa Rica">Costa Rica</option>
                        <option value="Cote D'Ivoire">Cote D'Ivoire</option>
                        <option value="Croatia">Croatia</option>
                        <option value="Cuba">Cuba</option>
                        <option value="Curacao">Curacao</option>
                        <option value="Cyprus">Cyprus</option>
                        <option value="Czech Republic">Czech Republic</option>
                        <option value="Denmark">Denmark</option>
                        <option value="Djibouti">Djibouti</option>
                        <option value="Dominica">Dominica</option>
                        <option value="Dominican Republic">
                          Dominican Republic
                        </option>
                        <option value="Ecuador">Ecuador</option>
                        <option value="Egypt">Egypt</option>
                        <option value="El Salvador">El Salvador</option>
                        <option value="Equatorial Guinea">
                          Equatorial Guinea
                        </option>
                        <option value="Eritrea">Eritrea</option>
                        <option value="Estonia">Estonia</option>
                        <option value="Ethiopia">Ethiopia</option>
                        <option value="Falkland Islands (Malvinas)">
                          Falkland Islands (Malvinas)
                        </option>
                        <option value="Faroe Islands">Faroe Islands</option>
                        <option value="Fiji">Fiji</option>
                        <option value="Finland">Finland</option>
                        <option value="France">France</option>
                        <option value="French Guiana">French Guiana</option>
                        <option value="French Polynesia">
                          French Polynesia
                        </option>
                        <option value="French Southern Territories">
                          French Southern Territories
                        </option>
                        <option value="Gabon">Gabon</option>
                        <option value="Gambia">Gambia</option>
                        <option value="Georgia">Georgia</option>
                        <option value="Germany">Germany</option>
                        <option value="Ghana">Ghana</option>
                        <option value="Gibraltar">Gibraltar</option>
                        <option value="Greece">Greece</option>
                        <option value="Greenland">Greenland</option>
                        <option value="Grenada">Grenada</option>
                        <option value="Guadeloupe">Guadeloupe</option>
                        <option value="Guam">Guam</option>
                        <option value="Guatemala">Guatemala</option>
                        <option value="Guernsey">Guernsey</option>
                        <option value="Guinea">Guinea</option>
                        <option value="Guinea-Bissau">Guinea-Bissau</option>
                        <option value="Guyana">Guyana</option>
                        <option value="Haiti">Haiti</option>
                        <option value="Heard Island and Mcdonald Islands">
                          Heard Island and Mcdonald Islands
                        </option>
                        <option value="Holy See (Vatican City State)">
                          Holy See (Vatican City State)
                        </option>
                        <option value="Honduras">Honduras</option>
                        <option value="Hong Kong">Hong Kong</option>
                        <option value="Hungary">Hungary</option>
                        <option value="Iceland">Iceland</option>
                        <option value="India">India</option>
                        <option value="Indonesia">Indonesia</option>
                        <option value="Iran, Islamic Republic of">
                          Iran, Islamic Republic of
                        </option>
                        <option value="Iraq">Iraq</option>
                        <option value="Ireland">Ireland</option>
                        <option value="Isle of Man">Isle of Man</option>
                        <option value="Israel">Israel</option>
                        <option value="Italy">Italy</option>
                        <option value="Jamaica">Jamaica</option>
                        <option value="Japan">Japan</option>
                        <option value="Jersey">Jersey</option>
                        <option value="Jordan">Jordan</option>
                        <option value="Kazakhstan">Kazakhstan</option>
                        <option value="Kenya">Kenya</option>
                        <option value="Kiribati">Kiribati</option>
                        <option value="Korea, Democratic People's Republic of">
                          Korea, Democratic People's Republic of
                        </option>
                        <option value="Korea, Republic of">
                          Korea, Republic of
                        </option>
                        <option value="Kosovo">Kosovo</option>
                        <option value="Kuwait">Kuwait</option>
                        <option value="Kyrgyzstan">Kyrgyzstan</option>
                        <option value="Lao People's Democratic Republic">
                          Lao People's Democratic Republic
                        </option>
                        <option value="Latvia">Latvia</option>
                        <option value="Lebanon">Lebanon</option>
                        <option value="Lesotho">Lesotho</option>
                        <option value="Liberia">Liberia</option>
                        <option value="Libyan Arab Jamahiriya">
                          Libyan Arab Jamahiriya
                        </option>
                        <option value="Liechtenstein">Liechtenstein</option>
                        <option value="Lithuania">Lithuania</option>
                        <option value="Luxembourg">Luxembourg</option>
                        <option value="Macao">Macao</option>
                        <option
                          value="Macedonia, the Former Yugoslav Republic of"
                        >
                          Macedonia, the Former Yugoslav Republic of
                        </option>
                        <option value="Madagascar">Madagascar</option>
                        <option value="Malawi">Malawi</option>
                        <option value="Malaysia">Malaysia</option>
                        <option value="Maldives">Maldives</option>
                        <option value="Mali">Mali</option>
                        <option value="Malta">Malta</option>
                        <option value="Marshall Islands">
                          Marshall Islands
                        </option>
                        <option value="Martinique">Martinique</option>
                        <option value="Mauritania">Mauritania</option>
                        <option value="Mauritius">Mauritius</option>
                        <option value="Mayotte">Mayotte</option>
                        <option value="Mexico">Mexico</option>
                        <option value="Micronesia, Federated States of">
                          Micronesia, Federated States of
                        </option>
                        <option value="Moldova, Republic of">
                          Moldova, Republic of
                        </option>
                        <option value="Monaco">Monaco</option>
                        <option value="Mongolia">Mongolia</option>
                        <option value="Montenegro">Montenegro</option>
                        <option value="Montserrat">Montserrat</option>
                        <option value="Morocco">Morocco</option>
                        <option value="Mozambique">Mozambique</option>
                        <option value="Myanmar">Myanmar</option>
                        <option value="Namibia">Namibia</option>
                        <option value="Nauru">Nauru</option>
                        <option value="Nepal">Nepal</option>
                        <option value="Netherlands">Netherlands</option>
                        <option value="Netherlands Antilles">
                          Netherlands Antilles
                        </option>
                        <option value="New Caledonia">New Caledonia</option>
                        <option value="New Zealand">New Zealand</option>
                        <option value="Nicaragua">Nicaragua</option>
                        <option value="Niger">Niger</option>
                        <option value="Nigeria">Nigeria</option>
                        <option value="Niue">Niue</option>
                        <option value="Norfolk Island">Norfolk Island</option>
                        <option value="Northern Mariana Islands">
                          Northern Mariana Islands
                        </option>
                        <option value="Norway">Norway</option>
                        <option value="Oman">Oman</option>
                        <option value="Pakistan">Pakistan</option>
                        <option value="Palau">Palau</option>
                        <option value="Palestinian Territory, Occupied">
                          Palestinian Territory, Occupied
                        </option>
                        <option value="Panama">Panama</option>
                        <option value="Papua New Guinea">
                          Papua New Guinea
                        </option>
                        <option value="Paraguay">Paraguay</option>
                        <option value="Peru">Peru</option>
                        <option value="Philippines">Philippines</option>
                        <option value="Pitcairn">Pitcairn</option>
                        <option value="Poland">Poland</option>
                        <option value="Portugal">Portugal</option>
                        <option value="Puerto Rico">Puerto Rico</option>
                        <option value="Qatar">Qatar</option>
                        <option value="Reunion">Reunion</option>
                        <option value="Romania">Romania</option>
                        <option value="Russian Federation">
                          Russian Federation
                        </option>
                        <option value="Rwanda">Rwanda</option>
                        <option value="Saint Barthelemy">
                          Saint Barthelemy
                        </option>
                        <option value="Saint Helena">Saint Helena</option>
                        <option value="Saint Kitts and Nevis">
                          Saint Kitts and Nevis
                        </option>
                        <option value="Saint Lucia">Saint Lucia</option>
                        <option value="Saint Martin">Saint Martin</option>
                        <option value="Saint Pierre and Miquelon">
                          Saint Pierre and Miquelon
                        </option>
                        <option value="Saint Vincent and the Grenadines">
                          Saint Vincent and the Grenadines
                        </option>
                        <option value="Samoa">Samoa</option>
                        <option value="San Marino">San Marino</option>
                        <option value="Sao Tome and Principe">
                          Sao Tome and Principe
                        </option>
                        <option value="Saudi Arabia">Saudi Arabia</option>
                        <option value="Senegal">Senegal</option>
                        <option value="Serbia">Serbia</option>
                        <option value="Serbia and Montenegro">
                          Serbia and Montenegro
                        </option>
                        <option value="Seychelles">Seychelles</option>
                        <option value="Sierra Leone">Sierra Leone</option>
                        <option value="Singapore">Singapore</option>
                        <option value="Sint Maarten">Sint Maarten</option>
                        <option value="Slovakia">Slovakia</option>
                        <option value="Slovenia">Slovenia</option>
                        <option value="Solomon Islands">Solomon Islands</option>
                        <option value="Somalia">Somalia</option>
                        <option value="South Africa">South Africa</option>
                        <option
                          value="South Georgia and the South Sandwich Islands"
                        >
                          South Georgia and the South Sandwich Islands
                        </option>
                        <option value="South Sudan">South Sudan</option>
                        <option value="Spain">Spain</option>
                        <option value="Sri Lanka">Sri Lanka</option>
                        <option value="Sudan">Sudan</option>
                        <option value="Suriname">Suriname</option>
                        <option value="Svalbard and Jan Mayen">
                          Svalbard and Jan Mayen
                        </option>
                        <option value="Swaziland">Swaziland</option>
                        <option value="Sweden">Sweden</option>
                        <option value="Switzerland">Switzerland</option>
                        <option value="Syrian Arab Republic">
                          Syrian Arab Republic
                        </option>
                        <option value="Taiwan, Province of China">
                          Taiwan, Province of China
                        </option>
                        <option value="Tajikistan">Tajikistan</option>
                        <option value="Tanzania, United Republic of">
                          Tanzania, United Republic of
                        </option>
                        <option value="Thailand">Thailand</option>
                        <option value="Timor-Leste">Timor-Leste</option>
                        <option value="Togo">Togo</option>
                        <option value="Tokelau">Tokelau</option>
                        <option value="Tonga">Tonga</option>
                        <option value="Trinidad and Tobago">
                          Trinidad and Tobago
                        </option>
                        <option value="Tunisia">Tunisia</option>
                        <option value="Turkey">Turkey</option>
                        <option value="Turkmenistan">Turkmenistan</option>
                        <option value="Turks and Caicos Islands">
                          Turks and Caicos Islands
                        </option>
                        <option value="Tuvalu">Tuvalu</option>
                        <option value="Uganda">Uganda</option>
                        <option value="Ukraine">Ukraine</option>
                        <option value="United Arab Emirates">
                          United Arab Emirates
                        </option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="United States">United States</option>
                        <option value="United States Minor Outlying Islands">
                          United States Minor Outlying Islands
                        </option>
                        <option value="Uruguay">Uruguay</option>
                        <option value="Uzbekistan">Uzbekistan</option>
                        <option value="Vanuatu">Vanuatu</option>
                        <option value="Venezuela">Venezuela</option>
                        <option value="Viet Nam">Viet Nam</option>
                        <option value="Virgin Islands, British">
                          Virgin Islands, British
                        </option>
                        <option value="Virgin Islands, U.s.">
                          Virgin Islands, U.s.
                        </option>
                        <option value="Wallis and Futuna">
                          Wallis and Futuna
                        </option>
                        <option value="Western Sahara">Western Sahara</option>
                        <option value="Yemen">Yemen</option>
                        <option value="Zambia">Zambia</option>
                        <option value="Zimbabwe">Zimbabwe</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div  class="bg-gray-50 flex px-4 py-3 sm:px-6 space-x-2 items-center">
                  <span v-if="unsavedChanges && !savingdata" class="text-red-500 w-36 text-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 flex-grow">
                    Unsaved Changes
                  </span>
                  <div v-if="!savingdata" class="text-right w-full justify-end space-x-2 flex-shrink">
                    <button v-if="editingAccount" 
                      @click="discardChanges()"
                      class="inline-flex justify-center rounded-md border border-transparent  bg-red-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                    >
                      Discard Changes
                    </button>
                    <button
                      @click="editingAccount ? updateAccountData() : editingAccount = true"
                      class="inline-flex justify-center rounded-md border border-transparent  bg-gray-800 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                    >
                      {{ editingAccount ? "Save Changes" : "Edit Account Data" }}
                    </button>
                  </div>
                  <div v-if="savingdata" class="text-right w-full justify-end space-x-2 flex-shrink">
                  <button disabled class="inline-flex justify-center rounded-md border border-transparent  bg-red-500 py-2 px-4 text-sm font-medium text-white shadow-sm ">
                    <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </button>
                </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <!-- Password -->
        <div
          class="space-y-6 sm:px-6 lg:col-span-9 lg:px-0"
          v-if="subNavigation[2].current"
        >
          <section aria-labelledby="payment-details-heading">
            <form action="#" method="POST">
              <div class="shadow sm:overflow-hidden sm:rounded-md">
                <div class="bg-white py-6 px-4 sm:p-6">
                  <div>
                    <h2
                      id="payment-details-heading"
                      class="text-lg font-medium leading-6 text-gray-900"
                    >
                      Password Information
                    </h2>
                    <p class="mt-1 text-sm text-gray-500">
                      If you can't see your password here, it's because you create an account with a different provider, such as Google. To change your password, you have to change the password to your account for that provider
                    </p>
                  </div>

                  <div class="mt-6 grid grid-cols-4 gap-6">
                    <div class="col-span-4 sm:col-span-2">
                      <label class="block text-sm font-medium text-gray-700"
                        >Current Email</label
                      >
                      <input
                        type="text"
                        disabled
                        name="school-name"
                        id="school-name"
                        v-model="editUser.email"
                        class="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
                      />
                    </div>

                    <div v-if="user.provider!='google'" class="col-span-4 sm:col-span-2">
                      <label class="block text-sm font-medium text-gray-700"
                        >Current Password</label
                      >
                      <input
                        type="password"
                        name="password"
                        id="password"
                        autocomplete="password"
                        placeholder="••••••••••••••"
                        v-model="password"
                        v-mask="'XXXXXXXXXXXXXXXX'"
                        :disabled="!editingAccount"
                        class="mt-1 block peer w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
                      />
                      <p
                        class="mt-2 invisible peer-focus:visible text-pink-600 text-sm"
                      >
                        Please remember to save your password...
                      </p>
                    </div>
                  </div>
                </div>
                <div class="flex md:flex-row sm:flex-col w-full bg-gray-50 md:justify-end sm:justify-center">
                  <div v-if="user.provider!='google' && editingAccount" class="bg-gray-50 pr-2 py-3 text-right ">
                    <button
                      type="button"
                      @click="editingAccount = false; discardChanges(); this.password = ''"
                      class="inline-flex justify-center rounded-md border border-transparent bg-red-500 py-2 px-4 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                    >
                      Cancel
                    </button>
                  </div>

                  <div v-if="user.provider!='google'" class="bg-gray-50 pr-6  py-3 text-right ">
                    <button
                      type="button"
                      @click="editingAccount ? updatePassword() : editingAccount = true"
                      class="inline-flex justify-center rounded-md border border-transparent bg-gray-800 py-2 px-4 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2"
                    >
                      {{editingAccount ? "Save" : "Edit"}}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </section>
        </div>
        <!-- Notifications -->
        <!-- <div
          class="space-y-6 sm:px-6 lg:col-span-9 lg:px-0"
          v-if="subNavigation[3].current"
        >
          <div class="shadow sm:overflow-hidden sm:rounded-md">
            <div class="space-y-6 bg-white py-6 px-4 sm:p-6">
              <div>
                <h3 class="text-lg font-medium leading-6 text-gray-900">
                  Notifications
                </h3>
                <p class="mt-1 text-sm text-gray-500">
                  Provide basic informtion about the job. Be specific with the
                  job title.
                </p>
              </div>

              <fieldset>
                <legend class="text-base font-medium text-gray-900">
                  By Email
                </legend>
                <div class="mt-4 space-y-4">
                  <div class="flex items-start">
                    <div class="flex h-5 items-center">
                      <input
                        id="comments"
                        name="comments"
                        type="checkbox"
                        class="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                      />
                    </div>
                    <div class="ml-3 text-sm">
                      <label for="comments" class="font-medium text-gray-700"
                        >Comments</label
                      >
                      <p class="text-gray-500">
                        Get notified when someones posts a comment on a posting.
                      </p>
                    </div>
                  </div>
                  <div>
                    <div class="flex items-start">
                      <div class="flex h-5 items-center">
                        <input
                          id="candidates"
                          name="candidates"
                          type="checkbox"
                          class="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                        />
                      </div>
                      <div class="ml-3 text-sm">
                        <label
                          for="candidates"
                          class="font-medium text-gray-700"
                          >Candidates</label
                        >
                        <p class="text-gray-500">
                          Get notified when a candidate applies for a job.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div class="flex items-start">
                      <div class="flex h-5 items-center">
                        <input
                          id="offers"
                          name="offers"
                          type="checkbox"
                          class="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                        />
                      </div>
                      <div class="ml-3 text-sm">
                        <label for="offers" class="font-medium text-gray-700"
                          >Offers</label
                        >
                        <p class="text-gray-500">
                          Get notified when a candidate accepts or rejects an
                          offer.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </fieldset>
              <fieldset class="mt-6">
                <legend class="text-base font-medium text-gray-900">
                  Push Notifications
                </legend>
                <p class="text-sm text-gray-500">
                  These are delivered via SMS to your mobile phone.
                </p>
                <div class="mt-4 space-y-4">
                  <div class="flex items-center">
                    <input
                      id="push-everything"
                      name="push-notifications"
                      type="radio"
                      class="h-4 w-4 border-gray-300 text-orange-600 focus:ring-orange-500"
                    />
                    <label for="push-everything" class="ml-3">
                      <span class="block text-sm font-medium text-gray-700"
                        >Everything</span
                      >
                    </label>
                  </div>
                  <div class="flex items-center">
                    <input
                      id="push-email"
                      name="push-notifications"
                      type="radio"
                      class="h-4 w-4 border-gray-300 text-orange-600 focus:ring-orange-500"
                    />
                    <label for="push-email" class="ml-3">
                      <span class="block text-sm font-medium text-gray-700"
                        >Same as email</span
                      >
                    </label>
                  </div>
                  <div class="flex items-center">
                    <input
                      id="push-nothing"
                      name="push-notifications"
                      type="radio"
                      class="h-4 w-4 border-gray-300 text-orange-600 focus:ring-orange-500"
                    />
                    <label for="push-nothing" class="ml-3">
                      <span class="block text-sm font-medium text-gray-700"
                        >No push notifications</span
                      >
                    </label>
                  </div>
                </div>
              </fieldset>
            </div>
            <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
              <button
                type="submit"
                class="inline-flex justify-center rounded-md border border-transparent bg-gray-800 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-600 focus:ring-offset-2"
              >
                Save
              </button>
            </div>
          </div>
        </div> -->
        <div
          class="space-y-6 sm:px-6 lg:col-span-9 lg:px-0"
          v-if="subNavigation[3].current"
        >
          <payment_component />
        </div>

        <div
          class="space-y-6 sm:px-6 lg:col-span-9 lg:px-0"
          v-if="subNavigation[4].current"
        >
          <h2>There's nothing here yet, but we're working on more add-ons and integrations to make youro exam management experience flawless!</h2>
        </div>
      </div>
    </main>
  </transition>
  <transition
    enter-active-class="transform ease-in-out duration-700 transition"
    enter-from-class="opacity-0 "
    enter-to-class=" opacity-100"
  >
    <DataUpdatingPopup v-if="savingAvatar || deletingAccount" />
  </transition>

  <transition
    enter-active-class="transform ease-in-out duration-700 transition"
    enter-from-class="opacity-0 "
    enter-to-class=" opacity-100"
  >
    <div v-if="this.loading === true">
      <!-- Loading Page -->
      <div class="flex flex-col items-center justify-center h-screen">
        <div class="flex items-center space-x-2 text-gray-600">
          <svg
            class="w-5 h-5 animate-spin text-orange-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            />
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
          <span>Loading...</span>
        </div>
      </div>
    </div>
  </transition>
</template>
