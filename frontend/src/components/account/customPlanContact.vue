<script lang="ts">
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { CheckIcon, HomeIcon, AdjustmentsHorizontalIcon, CogIcon, PaperAirplaneIcon, PencilIcon } from "@heroicons/vue/24/outline";
import authenticate from "../../functions/authenticate";


export default (await import("vue")).defineComponent({
  name: "CustomPlanContact",
  mixins: [authenticate],
  components: {
    Dialog,
    DialogPanel,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
    CheckIcon,
    HomeIcon,
    AdjustmentsHorizontalIcon,
    PaperAirplaneIcon,
    PencilIcon,
    CogIcon,
  },
  props: {
    email: String,
    uploadID: String,
    uploadData: Object,
    uploadIMG: File,
  },
  data() {
      return {
        emailContent: "",
      }
  },
  mounted() {
    window.addEventListener('keyup',  (e) => {
      if (e.key === 'Enter') {
        this.submit()
      } else if (e.key === "Escape") {
        this.$emit('closeComponent')
      }
    })
  },
  methods: {
    async submit() {
      console.log("submit")

      if (this.emailContent.trim() == "") {
        alert("Please enter a message")
        return false
      }
      else {
        const response = await this.setUserData(this.uploadID, this.uploadData, this.uploadIMG)
        //send email
        await this.sendEmail(
          "NoUIDRequired",
          ["guglielmosecchi94@gmail.com", "poopattaxspam@gmail.com"],
          "payments@examtimer.tech",
          `A custom plan has been requested: ${this.emailContent}`,
          `<p>A custom plan has just been requested.
            The following is the message submitted:
            <br/><br/>${this.emailContent}</p>`,
          "Custom Plan Requested"
        )

        await this.sendEmail(
          "NoUIDRequired",
          this.email,
          "payments@examtimer.tech",
          "We have received your request for a custom plan and will get back to you shortly",
          `<p>
            Hi there!
            <br/><br/>
            Thank you for your request for a custom plan. We will get back to you shortly.
            In case we do not send you an email soon, please feel free to contact us at
            support@examtimer.tech with the information your provided about your situation.
            In the meantime, hold tight while we process your request and see what we can do
            for you.
            <br/><br/>
            Kind regards,<br/>The Examtimer Team
          </p>`,
          "Custom Plan Request Received"
        )
        
        this.$emit('dataUpload')

        return response
      }
      
    }
  }
  

});
</script>

<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <TransitionRoot as="template" :show="true">
    <Dialog as="div" class="relative z-50">
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
              class="relative transform rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full max-w-4xl sm:p-6"
            >
              <div >
                
                <div class="mt-3 text-center sm:mt-5">
                  <div class="flex flex-row sm:flex-column h-8 items-end justify-between">
                    <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900"
                      >Send us an email</DialogTitle
                    >
                    <DialogTitle as="h3" class="text-md font-medium leading-6 align-bottom"
                      ><span class="text-gray-400">We will reply to: </span><span class="text-gray-400">{{ email }}</span></DialogTitle
                    >
                  </div>

                  <div class="mt-2">
                    <textarea
                    v-model="emailContent"
                    class="resize-none block w-full h-96 min-w-0 flex-1 rounded-md border-gray-300 focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                    placeholder="Tell us a bit about why you are contacting us and any information you think we should know about your specific circumstances."
                    />
                  </div>
                </div>
              </div>
              <div class="mt-5 sm:mt-6">
                <div class="flex md:flex-row sm:flex-col md:justify-end">
                  <button
                    type="button"
                    class="inline-flex items-center md:mr-2.5 sm:mr-0 w-3/12 justify-center rounded-md border border-transparent bg-orange-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 sm:text-sm"
                    @click="$emit('closeComponent')"
                  >
                    <PencilIcon class="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                    Edit Account
                  </button>
                  <button
                    type="button"
                    class="inline-flex items-center w-3/12 justify-center rounded-md border border-transparent bg-orange-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 sm:text-sm"
                    @click="submit()"
                  >
                    <PaperAirplaneIcon class="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                    Send Email
                  </button>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>


