<script lang="ts">
const plans = [
  {
    name: "Free",
    priceMonthly: 0,
    priceYearly: 0,
    limit: "For Personal Use Only",
    disabled: false
  },
  {
    name: "Basic",
    priceMonthly: 29,
    priceYearly: 320,
    limit: "For Schools with up to 500 students",
    disabled: false
  },
  {
    name: "Professional",
    priceMonthly: 49,
    priceYearly: 540,
    limit: "For Schools with up to 1000 students",
    disabled: false
  },
  {
    name: "Enterprise",
    priceMonthly: 49,
    priceYearly: 540,
    limit: "For Schools with more than 1000 students",
    disabled: true
  }
];
const payments = [
  {
    id: 1,
    date: "1/1/2020",
    datetime: "2020-01-01",
    description: "Business Plan - Annual Billing",
    amount: "CA$109.00",
    href: "#"
  }
  // More payments...
];

const paymentMethods = [
  {
    cardType: "Visa",
    lastFour: "1234",
    expiration: "12/22",
    lastUpdated: "2021-08-01",
    status: "Active"
  }
];

const selectedPlan = plans[0];
const annualBillingEnabled = true;

import authenticate from "../../functions/authenticate";
import {
  MagnifyingGlassIcon,
  QuestionMarkCircleIcon
} from "@heroicons/vue/20/solid";
import { TrashIcon } from "@heroicons/vue/24/outline";
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
  SwitchLabel
} from "@headlessui/vue";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot
} from "@headlessui/vue";
import { ExclamationTriangleIcon } from "@heroicons/vue/24/outline";
export default (await import("vue")).defineComponent({
  name: "account_payment",
  mixins: [authenticate],
  components: {
    QuestionMarkCircleIcon,
    MagnifyingGlassIcon,
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
    TrashIcon,
    Dialog,
    DialogPanel,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
    ExclamationTriangleIcon
  },
  data() {
    return {
      plans,
      payments,
      selectedPlan,
      annualBillingEnabled,
      paymentMethods,
      selectedMethod: 0,
      editpayment: false
    };
  }
});
</script>

<template>
  <TransitionRoot as="template" :show="editpayment">
    <Dialog as="div" class="relative z-50" @close="editpayment = false">
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
              class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl"
            >
              <div class="space-y-6 p-4">
                <div class="bg-white shadow sm:rounded-lg">
                  <div class="px-4 py-5 sm:p-6">
                    <h3 class="text-lg font-medium leading-6 text-gray-900">
                      Payment Methods
                    </h3>
                    <div class="mt-2">
                      <div
                        v-for="(method, index) in paymentMethods"
                        :key="index"
                      >
                        <div
                          @click.native="selectedMethod = index"
                          class="rounded-md px-6 py-5 mt-4 sm:flex sm:items-start sm:justify-between bg-gray-50 border border-gray-200"
                        >
                          <h4 class="sr-only">{{ method.cardType }}</h4>
                          <div class="sm:flex sm:items-start">
                            <svg
                              class="h-8 w-auto sm:h-6 sm:flex-shrink-0"
                              viewBox="0 0 36 24"
                              aria-hidden="true"
                            >
                              <rect
                                width="36"
                                height="24"
                                fill="#224DBA"
                                rx="4"
                              />
                              <path
                                fill="#fff"
                                d="M10.925 15.673H8.874l-1.538-6c-.073-.276-.228-.52-.456-.635A6.575 6.575 0 005 8.403v-.231h3.304c.456 0 .798.347.855.75l.798 4.328 2.05-5.078h1.994l-3.076 7.5zm4.216 0h-1.937L14.8 8.172h1.937l-1.595 7.5zm4.101-5.422c.057-.404.399-.635.798-.635a3.54 3.54 0 011.88.346l.342-1.615A4.808 4.808 0 0020.496 8c-1.88 0-3.248 1.039-3.248 2.481 0 1.097.969 1.673 1.653 2.02.74.346 1.025.577.968.923 0 .519-.57.75-1.139.75a4.795 4.795 0 01-1.994-.462l-.342 1.616a5.48 5.48 0 002.108.404c2.108.057 3.418-.981 3.418-2.539 0-1.962-2.678-2.077-2.678-2.942zm9.457 5.422L27.16 8.172h-1.652a.858.858 0 00-.798.577l-2.848 6.924h1.994l.398-1.096h2.45l.228 1.096h1.766zm-2.905-5.482l.57 2.827h-1.596l1.026-2.827z"
                              />
                            </svg>
                            <div class="mt-3 sm:mt-0 sm:ml-4">
                              <div class="text-sm font-medium text-gray-900">
                                Ending with {{ method.lastFour }}
                              </div>
                              <div
                                class="mt-1 text-sm text-gray-600 sm:flex sm:items-center"
                              >
                                <div>Expires {{ method.expiration }}</div>
                                <span
                                  class="hidden sm:mx-2 sm:inline"
                                  aria-hidden="true"
                                  >&middot;</span
                                >
                                <div class="mt-1 sm:mt-0">
                                  Last updated on {{ method.lastUpdated }}
                                </div>
                              </div>
                            </div>
                          </div>
                          <button
                            class="m-1 p-2 flex-shrink-0 flex border-0 bg-white rounded-md"
                          >
                            <TrashIcon
                              class="h-6 w-6 text-gray-400 hover:text-gray-700"
                              aria-hidden="true"
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
                    <button
                      @click="editpayment = true"
                      class="inline-flex justify-center rounded-md border border-transparent bg-gray-800 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                    >
                      Change Payment Method
                    </button>
                  </div>
                </div>

                <div aria-labelledby="payment-details-heading">
                  <div class="shadow sm:overflow-hidden sm:rounded-md">
                    <div class="bg-white py-6 px-4 sm:p-6">
                      <div>
                        <h2
                          id="payment-details-heading"
                          class="text-lg font-medium leading-6 text-gray-900"
                        >
                          Add Payment Method
                        </h2>
                        <p class="mt-1 text-sm text-gray-500">
                          Update your billing information. Please note that
                          updating your location could affect your tax rates.
                        </p>
                      </div>

                      <div class="mt-6 grid grid-cols-4 gap-6">
                        <div class="col-span-4 sm:col-span-2">
                          <label
                            for="first-name"
                            class="block text-sm font-medium text-gray-700"
                            >First name</label
                          >
                          <input
                            type="text"
                            name="first-name"
                            id="first-name"
                            autocomplete="cc-given-name"
                            class="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
                          />
                        </div>

                        <div class="col-span-4 sm:col-span-2">
                          <label
                            for="last-name"
                            class="block text-sm font-medium text-gray-700"
                            >Last name</label
                          >
                          <input
                            type="text"
                            name="last-name"
                            id="last-name"
                            autocomplete="cc-family-name"
                            class="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
                          />
                        </div>

                        <div class="col-span-4 sm:col-span-2">
                          <label
                            for="email-address"
                            class="block text-sm font-medium text-gray-700"
                            >Card Number</label
                          >
                          <input
                            v-mask="'#### #### #### ####'"
                            type="creditcard"
                            name="card-number"
                            id="card-number"
                            autocomplete="card"
                            class="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
                          />
                        </div>

                        <div class="col-span-4 sm:col-span-1">
                          <label
                            for="expiration-date"
                            class="block text-sm font-medium text-gray-700"
                            >Expration date</label
                          >
                          <input
                            v-mask="'## / ##'"
                            type="text"
                            name="expiration-date"
                            id="expiration-date"
                            autocomplete="cc-exp"
                            class="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
                            placeholder="MM / YY"
                          />
                        </div>

                        <div class="col-span-4 sm:col-span-1">
                          <label
                            for="security-code"
                            class="flex items-center text-sm font-medium text-gray-700"
                          >
                            <span>Security code</span>
                            <QuestionMarkCircleIcon
                              class="ml-1 h-5 w-5 flex-shrink-0 text-gray-300"
                              aria-hidden="true"
                            />
                          </label>
                          <input
                            v-mask="'####'"
                            type="text"
                            name="security-code"
                            id="security-code"
                            autocomplete="cc-csc"
                            class="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
                          />
                        </div>

                        <div class="col-span-4 sm:col-span-2">
                          <label
                            for="country"
                            class="block text-sm font-medium text-gray-700"
                            >Country</label
                          >
                          <select
                            id="country"
                            name="country"
                            autocomplete="country-name"
                            class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
                          >
                            <option>United States</option>
                            <option>Canada</option>
                            <option>Mexico</option>
                          </select>
                        </div>

                        <div class="col-span-4 sm:col-span-2">
                          <label
                            for="postal-code"
                            class="block text-sm font-medium text-gray-700"
                            >ZIP / Postal code</label
                          >
                          <input
                            type="text"
                            name="postal-code"
                            id="postal-code"
                            autocomplete="postal-code"
                            class="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
                      <button
                        type="submit"
                        class="inline-flex justify-center rounded-md border border-transparent bg-gray-800 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                      >
                        Add Payment Method
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>

  <!-- Plan -->
  <div aria-labelledby="plan-heading">
    <div class="shadow sm:overflow-hidden sm:rounded-md">
      <div class="space-y-6 bg-white py-6 px-4 sm:p-6">
        <div>
          <h2
            id="plan-heading"
            class="text-lg font-medium leading-6 text-gray-900"
          >
            Plan
          </h2>
        </div>

        <RadioGroup v-model="selectedPlan">
          <RadioGroupLabel class="sr-only"> Pricing plans </RadioGroupLabel>
          <div class="relative -space-y-px rounded-md bg-white">
            <RadioGroupOption
              as="template"
              v-for="(plan, planIdx) in plans"
              :key="plan.name"
              :value="plan"
              v-slot="{ checked, active }"
            >
              <div
                :class="[
                  planIdx === 0 ? 'rounded-tl-md rounded-tr-md' : '',
                  planIdx === plans.length - 1
                    ? 'rounded-bl-md rounded-br-md'
                    : '',
                  checked
                    ? 'bg-orange-50 border-orange-200'
                    : 'border-gray-200',
                  plan.disabled
                    ? 'cursor-not-allowed disabled opacity-50'
                    : '',
                  'relative border p-4 flex flex-col cursor-pointer md:pl-4 md:pr-6 md:grid md:grid-cols-3 focus:outline-none'
                ]"
                :disabled="plan.disabled"
              >
                <span class="flex items-center text-sm">
                  <span
                    :class="[
                      checked
                        ? 'bg-orange-500 border-transparent'
                        : 'bg-white border-gray-300',
                      active ? 'ring-2 ring-offset-2 ring-gray-900' : '',
                      'h-4 w-4 rounded-full border flex items-center justify-center'
                    ]"
                    aria-hidden="true"
                  >
                    <span class="rounded-full bg-white w-1.5 h-1.5" />
                  </span>
                  <RadioGroupLabel
                    as="span"
                    class="ml-3 font-medium text-gray-900"
                    >{{ plan.name }}</RadioGroupLabel
                  >
                </span>
                <RadioGroupDescription
                  as="span"
                  class="ml-6 pl-1 text-sm md:ml-0 md:pl-0 md:text-center"
                >
                  <span
                    :class="[
                      checked ? 'text-orange-900' : 'text-gray-900',
                      'font-medium'
                    ]"
                    >${{ plan.priceMonthly }} / mo</span
                  >
                  {{ " " }}
                  <span :class="checked ? 'text-orange-700' : 'text-gray-500'"
                    >(${{ plan.priceYearly }} / yr)</span
                  >
                </RadioGroupDescription>
                <RadioGroupDescription
                  as="span"
                  :class="[
                    checked ? 'text-orange-700' : 'text-gray-500',
                    'ml-6 pl-1 text-sm md:ml-0 md:pl-0 md:text-right'
                  ]"
                  >{{ plan.limit }}</RadioGroupDescription
                >
              </div>
            </RadioGroupOption>
          </div>
        </RadioGroup>

        <SwitchGroup as="div" class="flex items-center">
          <Switch
            v-model="annualBillingEnabled"
            :class="[
              annualBillingEnabled ? 'bg-orange-500' : 'bg-gray-200',
              'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2'
            ]"
          >
            <span
              aria-hidden="true"
              :class="[
                annualBillingEnabled ? 'translate-x-5' : 'translate-x-0',
                'inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
              ]"
            />
          </Switch>
          <SwitchLabel as="span" class="ml-3">
            <span class="text-sm font-medium text-gray-900"
              >Annual billing</span
            >
            <span class="text-sm text-gray-500">(Save 10%)</span>
          </SwitchLabel>
        </SwitchGroup>
      </div>
      <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
        <button
          type="submit"
          class="inline-flex justify-center rounded-md border border-transparent bg-gray-800 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
        >
          Update Plan
        </button>
      </div>
    </div>
  </div>

  <!-- Payment Method -->
  <div class="space-y-6">
    <!-- <div>
      <div class="bg-white shadow sm:rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <h3 class="text-lg font-medium leading-6 text-gray-900">
            Payment methods
          </h3>
          <div class="mt-2">
            <div v-for="(method, index) in paymentMethods" :key="index">
              <div
                @click.native="selectedMethod = index"
                class="rounded-md px-6 py-5 mt-4 sm:flex sm:items-start sm:justify-between bg-gray-50 border border-gray-200"
              >
                <h4 class="sr-only">{{ method.cardType }}</h4>
                <div class="sm:flex sm:items-start">
                  <svg
                    class="h-8 w-auto sm:h-6 sm:flex-shrink-0"
                    viewBox="0 0 36 24"
                    aria-hidden="true"
                  >
                    <rect width="36" height="24" fill="#224DBA" rx="4" />
                    <path
                      fill="#fff"
                      d="M10.925 15.673H8.874l-1.538-6c-.073-.276-.228-.52-.456-.635A6.575 6.575 0 005 8.403v-.231h3.304c.456 0 .798.347.855.75l.798 4.328 2.05-5.078h1.994l-3.076 7.5zm4.216 0h-1.937L14.8 8.172h1.937l-1.595 7.5zm4.101-5.422c.057-.404.399-.635.798-.635a3.54 3.54 0 011.88.346l.342-1.615A4.808 4.808 0 0020.496 8c-1.88 0-3.248 1.039-3.248 2.481 0 1.097.969 1.673 1.653 2.02.74.346 1.025.577.968.923 0 .519-.57.75-1.139.75a4.795 4.795 0 01-1.994-.462l-.342 1.616a5.48 5.48 0 002.108.404c2.108.057 3.418-.981 3.418-2.539 0-1.962-2.678-2.077-2.678-2.942zm9.457 5.422L27.16 8.172h-1.652a.858.858 0 00-.798.577l-2.848 6.924h1.994l.398-1.096h2.45l.228 1.096h1.766zm-2.905-5.482l.57 2.827h-1.596l1.026-2.827z"
                    />
                  </svg>
                  <div class="mt-3 sm:mt-0 sm:ml-4">
                    <div class="text-sm font-medium text-gray-900">
                      Ending with {{ method.lastFour }}
                    </div>
                    <div
                      class="mt-1 text-sm text-gray-600 sm:flex sm:items-center"
                    >
                      <div>Expires {{ method.expiration }}</div>
                      <span class="hidden sm:mx-2 sm:inline" aria-hidden="true"
                        >&middot;</span
                      >
                      <div class="mt-1 sm:mt-0">
                        Last updated on {{ method.lastUpdated }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
          <button
            @click="editpayment = true"
            class="inline-flex justify-center rounded-md border border-transparent bg-gray-800 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
          >
            Change Payment Method
          </button>
        </div>
      </div>
    </div> -->
    <div class="bg-white shadow sm:rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <h3 class="text-lg font-medium leading-6 text-gray-900">
          Manage Payment Method
        </h3>
        <div class="mt-2 sm:flex sm:items-start sm:justify-between">
          <div class="max-w-xl text-sm text-gray-500">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Recusandae voluptatibus corrupti atque repudiandae nam.
            </p>
          </div>
        </div>
      </div>
      <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
        <button
          @click="editpayment = true"
          class="inline-flex justify-center rounded-md border border-transparent bg-gray-800 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
        >
          Change Payment Method
        </button>
      </div>
    </div>

    <!-- Billing history -->
    <div aria-labelledby="billing-history-heading">
      <div class="bg-white pt-6 shadow sm:overflow-hidden sm:rounded-md">
        <div class="px-4 sm:px-6">
          <h2
            id="billing-history-heading"
            class="text-lg font-medium leading-6 text-gray-900"
          >
            Billing history
          </h2>
        </div>
        <div class="mt-6 flex flex-col">
          <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div
              class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8"
            >
              <div class="overflow-hidden border-t border-gray-200">
                <table class="min-w-full divide-y divide-gray-200">
                  <thead class="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        class="px-6 py-3 text-left text-sm font-semibold text-gray-900"
                      >
                        Date
                      </th>
                      <th
                        scope="col"
                        class="px-6 py-3 text-left text-sm font-semibold text-gray-900"
                      >
                        Description
                      </th>
                      <th
                        scope="col"
                        class="px-6 py-3 text-left text-sm font-semibold text-gray-900"
                      >
                        Amount
                      </th>
                      <!--
                              `relative` is added here due to a weird bug in Safari that causes `sr-only` headings to introduce overflow on the body on mobile.
                            -->
                      <th
                        scope="col"
                        class="relative px-6 py-3 text-left text-sm font-medium text-gray-500"
                      >
                        <span class="sr-only">View receipt</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-200 bg-white">
                    <tr v-for="payment in payments" :key="payment.id">
                      <td
                        class="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900"
                      >
                        <time :datetime="payment.datetime">{{
                          payment.date
                        }}</time>
                      </td>
                      <td
                        class="whitespace-nowrap px-6 py-4 text-sm text-gray-500"
                      >
                        {{ payment.description }}
                      </td>
                      <td
                        class="whitespace-nowrap px-6 py-4 text-sm text-gray-500"
                      >
                        {{ payment.amount }}
                      </td>
                      <td
                        class="whitespace-nowrap px-6 py-4 text-right text-sm font-medium"
                      >
                        <a
                          :href="payment.href"
                          class="text-orange-600 hover:text-orange-900"
                          >View receipt</a
                        >
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
