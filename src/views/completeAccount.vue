<script lang="ts">
import { ref } from "vue";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { CheckIcon } from "@heroicons/vue/24/outline";

export default (await import("vue")).defineComponent({
  name: "CompleteAccount",
  components: {
    Dialog,
    DialogPanel,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
    CheckIcon,
  },
  data() {
    return {
      open: sessionStorage.getItem('setupComplete') == 'true' ? false : true,
      //setupComplete: sessionStorage.getItem('setupComplete')
    };
  },
  mounted() {
    //sessionStorage.getItem('setupComplete') == 'true' ? this.open = false : this.open = true;
    //this.open = !(sessionStorage.getItem('setupComplete'))
    sessionStorage.setItem('setupPopUpVis', String(this.open))
  },
  watch: {
    open: function() {
      sessionStorage.setItem('setupPopUpVis', String(this.open))

      window.dispatchEvent(new CustomEvent('stChanged', {
        detail: {
          storage: this.open
        }
      }))
    }
  },
  methods: {
    handleClickOut() {
      if (sessionStorage.getItem('setupComplete') == 'false') {this.open = true}
      else {this.open = false}
    },
  }
});
</script>

<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <TransitionRoot as="template"  :show="open">
    <Dialog as="div" class="relative z-10" @close="handleClickOut()">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div
          class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
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
              class="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6"
            >
              <div>
                <!-- <div
                  class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100"
                >
                  <CheckIcon class="h-6 w-6 text-green-600" aria-hidden="true" />
                </div> -->
                <div class="mt-3 text-center sm:mt-5">
                  <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900"
                    >You have not finished setting up your account!</DialogTitle
                  >
                  <div class="mt-2">
                    <p class="text-sm text-gray-500">
                      The contents of this page are not available (or do not exist) until you finish setting up your account. Please click the button below to finish setting it up, then return to this page to view its contents. If you wish to delete your account, either finish setting it up then delete it or contact us and we will try do it for you.
                    </p>
                  </div>
                </div>
              </div>
              <div class="mt-5 sm:mt-6">
                <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <button
                    type="button"
                    class="inline-flex items-center w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
                    @click="open = false; $router.push('/accountSetup')"
                  >
                    Finish setup
                  </button>
                  <button
                    type="button"
                    class="inline-flex items-center w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
                    @click="open = false; $router.push('/')"
                  >
                    Go back to homepage
                  </button>
                </div>

                <!-- <button
                  type="button"
                  class="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
                  @click="open = false; $router.push('/')"
                  href="/"
                >
                  Go back to homepage
                </button> -->
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>


