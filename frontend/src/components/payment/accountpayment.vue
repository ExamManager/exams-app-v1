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

const paymentMethods = [];

const selectedPlan = plans[0];
const annualBillingEnabled = true;

import authenticate from "../../functions/authenticate";
import stripe from "../../functions/stripe";
import {
  MagnifyingGlassIcon,
  QuestionMarkCircleIcon
} from "@heroicons/vue/20/solid";
import { TrashIcon, ScaleIcon, CalendarDaysIcon, CurrencyDollarIcon } from "@heroicons/vue/24/outline";
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
  mixins: [authenticate, stripe],
  components: {
    QuestionMarkCircleIcon,
    MagnifyingGlassIcon,
    CurrencyDollarIcon,
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
    ExclamationTriangleIcon,
    ScaleIcon,
    CalendarDaysIcon
  },
  data() {
    return {
      plans,
      payments,
      selectedPlan,
      annualBillingEnabled,
      paymentMethods,
      selectedMethod: 0,
      editpayment: false,
      editdefaultpayment: false,
      loading: true, // getting payment methods
      loading2: false, // creating payment method
      loading3: false, // updateing default payment method
      loading4: false, // fetching subscription
      subscribtion: {},
      nextbilling: 0,
      currentPlan: "",
      addCard: {
        firstName: "",
        lastName: "",
        cardNumber: "",
        cardExpiry: "",
        cardCvc: "",
        country: "",
        postalCode: ""
      },
    };
  },
  async mounted() {
    this.loading4 = true
    const response = await this.getSubscription();
    console.log(response);
    // need to save the whole response to a variable
    this.subscribtion = response;
    // convert timestamp to in ... days
    console.log(response.subscription.current_period_end);
    const date = new Date(response.subscription.current_period_end * 1000);
    const today = new Date();
    const diffTime = date.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    this.nextbilling = diffDays;
    // current plan set currentplan to free, basic, professional or enterprise
    if (response.subscription.plan.id === "REDACTED") {
      this.currentPlan = "Free";
      this.selectedPlan = this.plans[0];
    } else if (
      response.subscription.plan.id === "REDACTED"
    ) {
      this.currentPlan = "Basic";
      this.selectedPlan = this.plans[1];
    } else if (
      response.subscription.plan.id === "REDACTED"
    ) {
      this.currentPlan = "Professional";
      this.selectedPlan = this.plans[2];
    } else if (
      response.subscription.plan.id === "price_1JQZ2nJZ6ZQZQX0X2QZQZQZS"
    ) {
      this.currentPlan = "Enterprise";
      this.selectedPlan = this.plans[3];
    }
    this.loading4 = false
  },
  methods: {
    async openModal() {
      this.loading = true;
      this.editpayment = true;
      const response = await this.getPaymentMethods();
      this.paymentMethods = [];
      for (let i = 0; i < response.paymentMethods.length; i++) {
        // check if default payment method = paymentMethods[i].id and if so set var isDefault to true
        if (response.default === response.paymentMethods[i].id) {
          var isDefault = true;
        } else {
          var isDefault = false;
        }
        this.paymentMethods.push({
          paymentId: response.paymentMethods[i].id,
          cardType: response.paymentMethods[i].card.brand,
          lastFour: response.paymentMethods[i].card.last4,
          expiration: `${response.paymentMethods[i].card.exp_month
            .toString()
            .padStart(2, "0")}/${response.paymentMethods[i].card.exp_year
            .toString()
            .substr(-2)}`,
          lastUpdated: new Date(response.paymentMethods[i].created * 1000)
            .toISOString()
            .substr(0, 10),
          default: isDefault
        });
      }
      this.loading = false;
    },
    async createPaymentMethod2() {
      this.loading2 = true
      const name = this.addCard.firstName + " " + this.addCard.lastName;
      const cardNumber = this.addCard.cardNumber.replace(/\s/g, "");
      const expMonth =  this.addCard.cardExpiry.substr(0, 2);
      const expYear =  this.addCard.cardExpiry.substr(5, 3);
      const cvc = this.addCard.cardCvc;
      const country = this.addCard.country;
      const zip = this.addCard.postalCode;
      const response = await this.createPaymentMethod(
        name,
        cardNumber,
        expMonth,
        expYear,
        cvc,
        country,
        zip
      );
      console.log(response);
      // make all fields empty
      this.addCard.firstName = "";
      this.addCard.lastName = "";
      this.addCard.cardNumber = "";
      this.addCard.cardExpiry = "";
      this.addCard.cardCvc = "";
      this.addCard.country = "";
      this.addCard.postalCode = "";
      await this.openModal();
      this.loading2 = false
    },
    async updateDefaultPaymentMethod2(paymentId: string) {
      this.loading3 = true
      await this.setDefaultPaymentMethod(paymentId);
      // set all default to false
      for (let i = 0; i < this.paymentMethods.length; i++) {
        this.paymentMethods[i].default = false;
      }
      // set default to true
      for (let i = 0; i < this.paymentMethods.length; i++) {
        if (this.paymentMethods[i].paymentId === paymentId) {
          this.paymentMethods[i].default = true;
        }
      }
      this.loading3 = false
    },
    async deletePaymentMethod2(paymentId: string) {
      console.log(paymentId);
      await this.deletePaymentMethod(paymentId);
      // remove from array
      for (let i = 0; i < this.paymentMethods.length; i++) {
        if (this.paymentMethods[i].paymentId === paymentId) {
          this.paymentMethods.splice(i, 1);
        }
      }
      console.log("deleted");
    },
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
                <transition
                        enter-active-class="transform ease-in-out duration-500 transition"
                        enter-from-class="opacity-0"
                        enter-to-class=" opacity-100"
                      >
                <div class="bg-white shadow sm:rounded-lg" v-if="this.paymentMethods.length > 0">
                  <div class="px-4 py-5 sm:p-6">
                    <h3 class="text-lg font-medium leading-6 text-gray-900">
                      Payment Methods
                    </h3>
                    <div class="mt-2" >
                      <div v-if="this.loading === true">
                        <!-- Loading Page -->
                        <div
                          class="flex flex-col items-center justify-center h-40"
                        >
                          <div
                            class="flex items-center space-x-2 text-gray-600"
                          >
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
                      <transition
                        enter-active-class="transform ease-in-out duration-500 transition"
                        enter-from-class="opacity-0"
                        enter-to-class=" opacity-100"
                      >
                        <div v-if="this.loading === false">
                          <div
                            v-for="(method, index) in paymentMethods"
                            :key="index"
                          >
                            <div
                              @click.native="selectedMethod = index"
                              :class='[method.default && !editdefaultpayment ? "border-2 border-orange-500" : "border border-gray-200", "rounded-md px-6 py-5 mt-4 sm:flex sm:items-start sm:justify-between bg-gray-50"]'
                            >
                              <h4 class="sr-only">{{ method.cardType }}</h4>
                              <div class="sm:flex sm:items-start">
                                <svg v-if="method.cardType === 'visa'"
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
                                <svg v-if="method.cardType == 'mastercard'" width="36px" height="24px" viewBox="0 0 200 120" class="rounded-md" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                  <g id="Square" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                      <g id="Large" transform="translate(-32.000000, -404.000000)">
                                          <g id="large/mastercard" transform="translate(32.000000, 404.000000)">
                                              <rect id="Background" fill="#10427A" x="0" y="0" width="200" height="120"></rect>
                                              <g id="Logo" transform="translate(52.000000, 20.000000)" fill-rule="nonzero">
                                                  <g id="mastercard">
                                                      <rect id="Rectangle-path" fill="#FF5F00" x="36.444549" y="6.79534022" width="27.0118354" height="49.9501544"></rect>
                                                      <path d="M38.1595777,31.7704094 C38.1595777,21.621526 42.7901781,12.6199079 49.9075824,6.79533142 C44.6767188,2.55927578 38.0738258,-7.82864208e-06 30.8706697,-7.82864208e-06 C13.8060499,-7.82864208e-06 6.74147421e-07,14.2084287 6.74147421e-07,31.7704094 C6.74147421e-07,49.3323899 13.8060499,63.5408265 30.8706697,63.5408265 C38.0738258,63.5408265 44.6767188,60.9815429 49.9075824,56.7454874 C42.7901781,51.0091618 38.1595777,41.9192929 38.1595777,31.7704094 Z" id="Shape" fill="#EB001B"></path>
                                                      <path d="M99.900916,31.7704094 C99.900916,49.3323899 86.0948668,63.5408265 69.0302469,63.5408265 C61.8270906,63.5408265 55.2241973,60.9815429 49.9933344,56.7454874 C57.1964902,50.920911 61.7413387,41.9192929 61.7413387,31.7704094 C61.7413387,21.621526 57.1107383,12.6199079 49.9933344,6.79533142 C55.2241973,2.55927578 61.8270906,-7.82864208e-06 69.0302469,-7.82864208e-06 C86.0948668,-7.82864208e-06 99.900916,14.2966799 99.900916,31.7704094 Z" id="Shape" fill="#F79E1B"></path>
                                                  </g>
                                                  <path d="M14.5714286,83.8235292 L14.5714286,78.5294113 C14.5714286,76.4999997 13.2380952,75.1764701 10.9523809,75.1764701 C9.80952379,75.1764701 8.57142853,75.5294112 7.71428569,76.6764701 C7.04761902,75.705882 6.09523806,75.1764701 4.66666666,75.1764701 C3.71428569,75.1764701 2.76190473,75.4411763 2,76.4117648 L2,75.3529409 L0,75.3529409 L0,83.8235292 L2,83.8235292 L2,79.1470587 C2,77.6470586 2.85714284,76.9411763 4.19047618,76.9411763 C5.52380951,76.9411763 6.19047617,77.7352936 6.19047617,79.1470587 L6.19047617,83.8235292 L8.19047617,83.8235292 L8.19047617,79.1470587 C8.19047617,77.6470586 9.14285713,76.9411763 10.3809523,76.9411763 C11.7142857,76.9411763 12.3809524,77.7352936 12.3809524,79.1470587 L12.3809524,83.8235292 L14.5714286,83.8235292 L14.5714286,83.8235292 Z M44.1904762,75.3529409 L40.9523808,75.3529409 L40.9523808,72.7941173 L38.9523812,72.7941173 L38.9523812,75.3529409 L37.1428572,75.3529409 L37.1428572,77.0294113 L38.9523812,77.0294113 L38.9523812,80.9117645 C38.9523812,82.8529411 39.8095237,84 42.0952384,84 C42.9523809,84 43.904762,83.7352938 44.5714285,83.3823527 L44.0000002,81.7941173 C43.4285714,82.1470584 42.7619049,82.2352938 42.2857143,82.2352938 C41.3333336,82.2352938 40.9523808,81.7058822 40.9523808,80.8235291 L40.9523808,77.0294113 L44.1904762,77.0294113 L44.1904762,75.3529409 L44.1904762,75.3529409 Z M61.1428572,75.1764701 C60.0000001,75.1764701 59.2380954,75.705882 58.7619047,76.4117648 L58.7619047,75.3529409 L56.7619047,75.3529409 L56.7619047,83.8235292 L58.7619047,83.8235292 L58.7619047,79.0588233 C58.7619047,77.6470586 59.4285713,76.8529409 60.6666666,76.8529409 C61.047619,76.8529409 61.5238096,76.9411763 61.9047619,77.0294113 L62.4761907,75.2647055 C62.0952383,75.1764701 61.5238096,75.1764701 61.1428572,75.1764701 L61.1428572,75.1764701 L61.1428572,75.1764701 Z M35.5238095,76.0588232 C34.5714286,75.4411763 33.2380953,75.1764701 31.8095238,75.1764701 C29.5238096,75.1764701 27.9999999,76.235294 27.9999999,77.9117644 C27.9999999,79.3235295 29.1428572,80.1176468 31.142857,80.382353 L32.0952382,80.470588 C33.1428571,80.6470583 33.7142856,80.9117645 33.7142856,81.3529411 C33.7142856,81.970588 32.9523809,82.4117646 31.6190475,82.4117646 C30.2857143,82.4117646 29.2380952,81.970588 28.5714284,81.5294114 L27.6190475,82.9411765 C28.6666666,83.6470584 30.0952381,84 31.5238094,84 C34.1904762,84 35.7142857,82.8529411 35.7142857,81.2647057 C35.7142857,79.7647056 34.4761904,78.9705883 32.5714285,78.7058821 L31.6190475,78.6176467 C30.7619047,78.5294113 30.0952381,78.352941 30.0952381,77.8235294 C30.0952381,77.2058821 30.7619047,76.8529409 31.8095238,76.8529409 C32.9523809,76.8529409 34.095238,77.2941175 34.6666665,77.5588232 L35.5238095,76.0588232 L35.5238095,76.0588232 Z M88.6666667,75.1764701 C87.5238096,75.1764701 86.7619049,75.705882 86.2857143,76.4117648 L86.2857143,75.3529409 L84.2857143,75.3529409 L84.2857143,83.8235292 L86.2857143,83.8235292 L86.2857143,79.0588233 C86.2857143,77.6470586 86.9523809,76.8529409 88.1904762,76.8529409 C88.5714285,76.8529409 89.0476191,76.9411763 89.4285715,77.0294113 L90.0000002,75.2647055 C89.6190479,75.1764701 89.0476191,75.1764701 88.6666667,75.1764701 L88.6666667,75.1764701 L88.6666667,75.1764701 Z M63.1428572,79.5882348 C63.1428572,82.1470584 65.0476191,84 68.0000002,84 C69.3333333,84 70.2857144,83.7352938 71.2380952,83.0294115 L70.2857144,81.5294114 C69.5238097,82.0588234 68.761905,82.3235292 67.904762,82.3235292 C66.2857144,82.3235292 65.1428572,81.2647057 65.1428572,79.5882348 C65.1428572,77.9999998 66.2857144,76.9411763 67.904762,76.8529409 C68.761905,76.8529409 69.5238097,77.1176467 70.2857144,77.6470586 L71.2380952,76.1470586 C70.2857144,75.4411763 69.3333333,75.1764701 68.0000002,75.1764701 C65.0476191,75.1764701 63.1428572,77.0294113 63.1428572,79.5882348 L63.1428572,79.5882348 L63.1428572,79.5882348 Z M81.6190477,79.5882348 L81.6190477,75.3529409 L79.6190477,75.3529409 L79.6190477,76.4117648 C78.9523811,75.6176466 78,75.1764701 76.7619047,75.1764701 C74.1904763,75.1764701 72.1904763,77.0294113 72.1904763,79.5882348 C72.1904763,82.1470584 74.1904763,84 76.7619047,84 C78.0952382,84 79.0476193,83.558823 79.6190477,82.7647057 L79.6190477,83.8235292 L81.6190477,83.8235292 L81.6190477,79.5882348 Z M74.2857145,79.5882348 C74.2857145,78.0882348 75.3333334,76.8529409 77.0476193,76.8529409 C78.666667,76.8529409 79.8095241,77.9999998 79.8095241,79.5882348 C79.8095241,81.0882349 78.666667,82.3235292 77.0476193,82.3235292 C75.3333334,82.2352938 74.2857145,81.0882349 74.2857145,79.5882348 L74.2857145,79.5882348 Z M50.3809523,75.1764701 C47.7142857,75.1764701 45.8095238,76.9411763 45.8095238,79.5882348 C45.8095238,82.2352938 47.7142857,84 50.4761905,84 C51.8095238,84 53.142857,83.6470584 54.1904759,82.8529411 L53.2380952,81.5294114 C52.4761905,82.0588234 51.5238094,82.4117646 50.5714287,82.4117646 C49.3333334,82.4117646 48.0952381,81.882353 47.8095238,80.382353 L54.5714283,80.382353 L54.5714283,79.6764701 C54.6666665,76.9411763 52.9523806,75.1764701 50.3809523,75.1764701 L50.3809523,75.1764701 L50.3809523,75.1764701 Z M50.3809523,76.7647055 C51.6190476,76.7647055 52.4761905,77.4705883 52.6666665,78.7941175 L47.9047621,78.7941175 C48.0952381,77.6470586 48.952381,76.7647055 50.3809523,76.7647055 L50.3809523,76.7647055 Z M100,79.5882348 L100,72 L98,72 L98,76.4117648 C97.3333334,75.6176466 96.3809523,75.1764701 95.1428574,75.1764701 C92.5714286,75.1764701 90.5714286,77.0294113 90.5714286,79.5882348 C90.5714286,82.1470584 92.5714286,84 95.1428574,84 C96.4761905,84 97.4285716,83.558823 98,82.7647057 L98,83.8235292 L100,83.8235292 L100,79.5882348 Z M92.6666668,79.5882348 C92.6666668,78.0882348 93.7142857,76.8529409 95.4285716,76.8529409 C97.0476193,76.8529409 98.1904764,77.9999998 98.1904764,79.5882348 C98.1904764,81.0882349 97.0476193,82.3235292 95.4285716,82.3235292 C93.7142857,82.2352938 92.6666668,81.0882349 92.6666668,79.5882348 L92.6666668,79.5882348 Z M25.8095239,79.5882348 L25.8095239,75.3529409 L23.8095239,75.3529409 L23.8095239,76.4117648 C23.1428571,75.6176466 22.1904762,75.1764701 20.9523809,75.1764701 C18.3809522,75.1764701 16.3809522,77.0294113 16.3809522,79.5882348 C16.3809522,82.1470584 18.3809522,84 20.9523809,84 C22.2857142,84 23.2380953,83.558823 23.8095239,82.7647057 L23.8095239,83.8235292 L25.8095239,83.8235292 L25.8095239,79.5882348 Z M18.3809523,79.5882348 C18.3809523,78.0882348 19.4285714,76.8529409 21.1428571,76.8529409 C22.7619047,76.8529409 23.9047618,77.9999998 23.9047618,79.5882348 C23.9047618,81.0882349 22.7619047,82.3235292 21.1428571,82.3235292 C19.4285714,82.2352938 18.3809523,81.0882349 18.3809523,79.5882348 Z" id="Shape" fill="#FFFFFF"></path>
                                              </g>
                                          </g>
                                      </g>
                                  </g>
                                </svg>
                                <svg v-if="method.cardType == 'amex'" width="36px" height="24px" viewBox="0 0 200 120" class="rounded-md" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                  <g id="Square" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                        <g id="Large" transform="translate(-32.000000, -968.000000)">
                                            <g id="large/american-express" transform="translate(32.000000, 968.000000)">
                                                <rect id="Background" fill="#13A8E0" x="0" y="0" width="200" height="120"></rect>
                                                <g id="Logo" transform="translate(0.000000, 24.000000)" fill="#FFFFFF" fill-rule="nonzero">
                                                    <g id="amex">
                                                        <path d="M18.4120141,19.0306923 L14.5787986,9.37211538 L10.7674912,19.0306923 L18.4120141,19.0306923 Z M102.857244,15.1846538 C102.087633,15.6676923 101.177385,15.6837692 100.086926,15.6837692 L93.2833922,15.6837692 L93.2833922,10.3023846 L100.179505,10.3023846 C101.155477,10.3023846 102.173852,10.3476923 102.835336,10.7393846 C103.561837,11.0923462 104.011307,11.8435769 104.011307,12.8812692 C104.011307,13.9401538 103.583746,14.7922308 102.857244,15.1846538 Z M151.392933,19.0306923 L147.517314,9.37211538 L143.662898,19.0306923 L151.392933,19.0306923 Z M60.9194346,29.4850769 L55.1780919,29.4850769 L55.1568905,10.5099231 L47.0360424,29.4850769 L42.1187279,29.4850769 L33.9766784,10.4931154 L33.9766784,29.4850769 L22.5858657,29.4850769 L20.4339223,24.0810385 L8.77314488,24.0810385 L6.59929329,29.4850769 L0.516607774,29.4850769 L10.545583,5.25715385 L18.8664311,5.25715385 L28.3915194,28.196 L28.3915194,5.25715385 L37.5321555,5.25715385 L44.8614841,21.6928846 L51.5943463,5.25715385 L60.9187279,5.25715385 L60.9187279,29.4850769 L60.9194346,29.4850769 Z M83.8021201,29.4850769 L65.0932862,29.4850769 L65.0932862,5.25715385 L83.8021201,5.25715385 L83.8021201,10.3023846 L70.6939929,10.3023846 L70.6939929,14.6694615 L83.4876325,14.6694615 L83.4876325,19.6357692 L70.6939929,19.6357692 L70.6939929,24.4741923 L83.8021201,24.4741923 L83.8021201,29.4850769 L83.8021201,29.4850769 Z M110.180919,11.7821923 C110.180919,15.6450385 107.687633,17.6407692 106.234629,18.24 C107.460071,18.7223077 108.506714,19.5743846 109.004947,20.2803077 C109.79576,21.4853462 109.932155,22.5617692 109.932155,24.7255769 L109.932155,29.4850769 L104.283392,29.4850769 L104.262191,26.4297308 C104.262191,24.9718462 104.397173,22.8752692 103.378092,21.7096923 C102.559717,20.8576154 101.312367,20.6727308 99.2961131,20.6727308 L93.2840989,20.6727308 L93.2840989,29.4850769 L87.6840989,29.4850769 L87.6840989,5.25715385 L100.565371,5.25715385 C103.427562,5.25715385 105.536396,5.33534615 107.346996,6.41761538 C109.118728,7.49988462 110.180919,9.07980769 110.180919,11.7821923 Z M119.143463,29.4850769 L113.428975,29.4850769 L113.428975,5.25715385 L119.143463,5.25715385 L119.143463,29.4850769 Z M185.438869,29.4850769 L177.502473,29.4850769 L166.886926,11.3006154 L166.886926,29.4850769 L155.481272,29.4850769 L153.301767,24.0810385 L141.667845,24.0810385 L139.553357,29.4850769 L133,29.4850769 C130.277739,29.4850769 126.831095,28.8624615 124.879152,26.8053462 C122.910954,24.7482308 121.886926,21.9618077 121.886926,17.556 C121.886926,13.9628077 122.49894,10.678 124.906007,8.08230769 C126.716608,6.14869231 129.551943,5.25715385 133.411307,5.25715385 L138.833216,5.25715385 L138.833216,10.4485385 L133.525088,10.4485385 C131.481272,10.4485385 130.327208,10.7627692 129.215548,11.8837692 C128.260777,12.9039231 127.605654,14.8324231 127.605654,17.3718462 C127.605654,19.9675385 128.104594,21.8390385 129.145583,23.0616154 C130.007774,24.0203846 131.574558,24.3112308 133.048763,24.3112308 L135.563958,24.3112308 L143.457244,5.25788462 L151.848763,5.25788462 L161.330742,28.1740769 L161.330742,5.25788462 L169.857951,5.25788462 L179.702473,22.1313462 L179.702473,5.25788462 L185.438869,5.25788462 L185.438869,29.4850769 Z M0.450883392,34.2438462 L10.0204947,34.2438462 L12.1780919,28.8624615 L17.0084806,28.8624615 L19.160424,34.2438462 L37.9879859,34.2438462 L37.9879859,30.1296154 L39.6685512,34.2613846 L49.4424028,34.2613846 L51.1229682,30.0682308 L51.1229682,34.2438462 L97.9130742,34.2438462 L97.8911661,25.4103077 L98.7964664,25.4103077 C99.4303887,25.4329615 99.6155477,25.4936154 99.6155477,26.5758846 L99.6155477,34.2438462 L123.815548,34.2438462 L123.815548,32.1874615 C125.767491,33.269 128.803534,34.2438462 132.798587,34.2438462 L142.979505,34.2438462 L145.158304,28.8624615 L149.988693,28.8624615 L152.119435,34.2438462 L171.738516,34.2438462 L171.738516,29.1321154 L174.709541,34.2438462 L190.431095,34.2438462 L190.431095,0.453076923 L174.872085,0.453076923 L174.872085,4.44380769 L172.693286,0.453076923 L156.727915,0.453076923 L156.727915,4.44380769 L154.727208,0.453076923 L133.161837,0.453076923 C129.551943,0.453076923 126.378799,0.974115385 123.815548,2.42615385 L123.815548,0.453076923 L108.933569,0.453076923 L108.933569,2.42615385 C107.302473,0.929538462 105.079859,0.453076923 102.608481,0.453076923 L48.2388693,0.453076923 L44.5908127,9.18065385 L40.844523,0.453076923 L23.7194346,0.453076923 L23.7194346,4.44380769 L21.8381625,0.453076923 L7.23321555,0.453076923 L0.450883392,16.5190385 L0.450883392,34.2438462 L0.450883392,34.2438462 Z" id="Shape"></path>
                                                        <path d="M199.706007,52.1148077 L189.49894,52.1148077 C188.479859,52.1148077 187.802827,52.1542692 187.232509,52.5525385 C186.641696,52.9449615 186.414134,53.5273846 186.414134,54.2961538 C186.414134,55.2103462 186.913074,55.8322308 187.638869,56.1011538 C188.229682,56.3138077 188.864311,56.3759231 189.797173,56.3759231 L192.832509,56.4599615 C195.895406,56.5381538 197.939929,57.0825769 199.186572,58.4103846 C199.413428,58.5952692 199.549823,58.8028077 199.706007,59.0103462 L199.706007,52.1148077 Z M199.706007,68.0916154 C198.345583,70.1487308 195.6947,71.1915385 192.106007,71.1915385 L181.290459,71.1915385 L181.290459,65.9950385 L192.062191,65.9950385 C193.130742,65.9950385 193.878445,65.8496154 194.328622,65.3950769 C194.718728,65.0201923 194.990813,64.4757692 194.990813,63.8144231 C194.990813,63.1085 194.718728,62.548 194.306714,62.2118462 C193.900353,61.8420769 193.308834,61.674 192.333569,61.674 C187.074912,61.4891154 180.514488,61.8420769 180.514488,54.1733846 C180.514488,50.6583846 182.672792,46.9585 188.549823,46.9585 L199.706007,46.9585 L199.706007,42.1368846 L189.340636,42.1368846 C186.212721,42.1368846 183.940636,42.9115 182.331449,44.1158077 L182.331449,42.1368846 L167.000707,42.1368846 C164.549117,42.1368846 161.671378,42.7653462 160.310247,44.1158077 L160.310247,42.1368846 L132.933569,42.1368846 L132.933569,44.1158077 C130.75477,42.4905769 127.078445,42.1368846 125.381625,42.1368846 L107.323675,42.1368846 L107.323675,44.1158077 C105.6,42.3897308 101.766784,42.1368846 99.4303887,42.1368846 L79.2204947,42.1368846 L74.5957597,47.3121923 L70.264311,42.1368846 L40.0749117,42.1368846 L40.0749117,75.9510385 L69.6961131,75.9510385 L74.4614841,70.6938846 L78.95053,75.9510385 L97.2091873,75.9678462 L97.2091873,68.0134231 L99.0042403,68.0134231 C101.426855,68.0521538 104.284099,67.9513077 106.804947,66.8244615 L106.804947,75.9503077 L121.865018,75.9503077 L121.865018,67.1372308 L122.591519,67.1372308 C123.518728,67.1372308 123.609894,67.1766923 123.609894,68.1347308 L123.609894,75.9495769 L169.359717,75.9495769 C172.264311,75.9495769 175.300353,75.1808077 176.981625,73.7857692 L176.981625,75.9495769 L191.493286,75.9495769 C194.513074,75.9495769 197.462191,75.5118462 199.706007,74.3908462 L199.706007,68.0916154 Z M177.366078,58.4103846 C178.456537,59.5774231 179.040989,61.0506538 179.040989,63.5447692 C179.040989,68.7580769 175.891166,71.1915385 170.24311,71.1915385 L159.334982,71.1915385 L159.334982,65.9950385 L170.199293,65.9950385 C171.261484,65.9950385 172.014841,65.8496154 172.486926,65.3950769 C172.872085,65.0201923 173.14841,64.4757692 173.14841,63.8144231 C173.14841,63.1085 172.84947,62.548 172.465018,62.2118462 C172.036749,61.8420769 171.445936,61.674 170.470671,61.674 C165.233216,61.4891154 158.674205,61.8420769 158.674205,54.1733846 C158.674205,50.6583846 160.809894,46.9585 166.681272,46.9585 L177.908834,46.9585 L177.908834,52.1162692 L167.635336,52.1162692 C166.616961,52.1162692 165.95477,52.1557308 165.391519,52.554 C164.778092,52.9464231 164.55053,53.5288462 164.55053,54.2976154 C164.55053,55.2118077 165.071378,55.8336923 165.775972,56.1026154 C166.366784,56.3152692 167.001413,56.3773846 167.955477,56.3773846 L170.970318,56.4614231 C174.010601,56.5381538 176.097527,57.0818462 177.366078,58.4103846 Z M126.830389,56.9137692 C126.081272,57.3734231 125.15477,57.4128846 124.065018,57.4128846 L117.261484,57.4128846 L117.261484,51.9701154 L124.157597,51.9701154 C125.15477,51.9701154 126.15265,51.9920385 126.830389,52.4078462 C127.556184,52.8002692 127.990106,53.5507692 127.990106,54.5877308 C127.990106,55.6246923 127.556184,56.4599615 126.830389,56.9137692 Z M130.212721,59.9296538 C131.459364,60.4053846 132.478445,61.2581923 132.956184,61.9641154 C133.746996,63.1472308 133.861484,64.2514231 133.884099,66.3874615 L133.884099,71.1915385 L128.261484,71.1915385 L128.261484,68.1595769 C128.261484,66.7016923 128.397173,64.543 127.356184,63.4161538 C126.537809,62.548 125.290459,62.3404615 123.24735,62.3404615 L117.262191,62.3404615 L117.262191,71.1915385 L111.634629,71.1915385 L111.634629,46.9577692 L124.564664,46.9577692 C127.4,46.9577692 129.465018,47.0871154 131.30318,48.1014231 C133.070671,49.2056154 134.182332,50.7183077 134.182332,53.4828077 C134.181625,57.3507692 131.686926,59.3245769 130.212721,59.9296538 Z M137.287633,46.9577692 L155.979505,46.9577692 L155.979505,51.9693846 L142.865018,51.9693846 L142.865018,56.3751923 L155.659364,56.3751923 L155.659364,61.3195769 L142.865018,61.3195769 L142.865018,66.1411923 L155.979505,66.1631154 L155.979505,71.1915385 L137.287633,71.1915385 L137.287633,46.9577692 L137.287633,46.9577692 Z M99.5017668,58.1414615 L92.264311,58.1414615 L92.264311,51.9701154 L99.5667845,51.9701154 C101.588693,51.9701154 102.992226,52.8221923 102.992226,54.9414231 C102.992226,57.0372692 101.65371,58.1414615 99.5017668,58.1414615 Z M86.6862191,68.9875385 L78.0876325,59.1163077 L86.6862191,49.5585769 L86.6862191,68.9875385 Z M64.4805654,66.1411923 L50.7109541,66.1411923 L50.7109541,61.3195769 L63.0063604,61.3195769 L63.0063604,56.3751923 L50.7109541,56.3751923 L50.7109541,51.9693846 L64.7519435,51.9693846 L70.8777385,59.0315385 L64.4805654,66.1411923 Z M109.004947,54.9414231 C109.004947,61.6732692 104.147703,63.0631923 99.2522968,63.0631923 L92.264311,63.0631923 L92.264311,71.1915385 L81.3787986,71.1915385 L74.4826855,63.1691538 L67.3159011,71.1915385 L45.1321555,71.1915385 L45.1321555,46.9577692 L67.6572438,46.9577692 L74.5477032,54.9012308 L81.6713781,46.9577692 L99.5667845,46.9577692 C104.011307,46.9577692 109.004947,48.2300385 109.004947,54.9414231 Z" id="Shape"></path>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </svg>
                                <div class="mt-3 sm:mt-0 sm:ml-4">
                                  <div
                                    class="text-sm font-medium text-gray-900"
                                  >
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
                              <button @click="deletePaymentMethod2(method.paymentId)" v-if="editdefaultpayment"
                                class=" space-x-2 p-2 flex flex-shrink-0 border-0 bg-white rounded-md"
                              >
                                <TrashIcon
                                  class="h-6 w-6 text-gray-700"
                                  aria-hidden="true"
                                />
                                <a class="pt-0.5 text-sm  text-gray-700 ">Delete</a>
                                
                              </button>
                            </div>
                          </div>
                        </div>
                      </transition>
                    </div>
                  </div>
                  <div class="bg-gray-50 px-4 py-3 space-x-2 text-right sm:px-6">

                    <button v-if="this.editdefaultpayment"
                      @click="this.editdefaultpayment = false"
                      class="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Discard Changes
                    </button>
                    <button
                      @click="this.editdefaultpayment ? updateDefaultPaymentMethod2(method.paymentId) : this.editdefaultpayment = true"
                      class="inline-flex justify-center rounded-md border border-transparent bg-gray-800 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                    >
                      {{ this.editdefaultpayment ? this.loading3 ? 'Saving' : 'Update Default Payment' : 'Edit Default Payment' }}
                    </button>
                  </div>
                </div>
                </transition>

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
                            v-model="addCard.firstName"
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
                            v-model="addCard.lastName"
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
                            v-model="addCard.cardNumber"
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
                            v-model="addCard.cardExpiry"
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
                            v-model="addCard.cardCvc"
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
                            v-model="addCard.country"
                            name="country"
                            autocomplete="country-name"
                            class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
                          >
                          <option value="">Please select</option>
                          <option value="AF">Afghanistan</option>
                          <option value="AX">Aland Islands</option>
                          <option value="AL">Albania</option>
                          <option value="DZ">Algeria</option>
                          <option value="AS">American Samoa</option>
                          <option value="AD">Andorra</option>
                          <option value="AO">Angola</option>
                          <option value="AI">Anguilla</option>
                          <option value="AQ">Antarctica</option>
                          <option value="AG">Antigua and Barbuda</option>
                          <option value="AR">Argentina</option>
                          <option value="AM">Armenia</option>
                          <option value="AW">Aruba</option>
                          <option value="AU">Australia</option>
                          <option value="AT">Austria</option>
                          <option value="AZ">Azerbaijan</option>
                          <option value="BS">Bahamas</option>
                          <option value="BH">Bahrain</option>
                          <option value="BD">Bangladesh</option>
                          <option value="BB">Barbados</option>
                          <option value="BY">Belarus</option>
                          <option value="BE">Belgium</option>
                          <option value="BZ">Belize</option>
                          <option value="BJ">Benin</option>
                          <option value="BM">Bermuda</option>
                          <option value="BT">Bhutan</option>
                          <option value="BO">Bolivia</option>
                          <option value="BQ">Bonaire, Sint Eustatius and Saba</option>
                          <option value="BA">Bosnia and Herzegovina</option>
                          <option value="BW">Botswana</option>
                          <option value="BV">Bouvet Island</option>
                          <option value="BR">Brazil</option>
                          <option value="IO">British Indian Ocean Territory</option>
                          <option value="BN">Brunei Darussalam</option>
                          <option value="BG">Bulgaria</option>
                          <option value="BF">Burkina Faso</option>
                          <option value="BI">Burundi</option>
                          <option value="KH">Cambodia</option>
                          <option value="CM">Cameroon</option>
                          <option value="CA">Canada</option>
                          <option value="CV">Cape Verde</option>
                          <option value="KY">Cayman Islands</option>
                          <option value="CF">Central African Republic</option>
                          <option value="TD">Chad</option>
                          <option value="CL">Chile</option>
                          <option value="CN">China</option>
                          <option value="CX">Christmas Island</option>
                          <option value="CC">Cocos (Keeling) Islands</option>
                          <option value="CO">Colombia</option>
                          <option value="KM">Comoros</option>
                          <option value="CG">Congo</option>
                          <option value="CD">Congo, Democratic Republic of the Congo</option>
                          <option value="CK">Cook Islands</option>
                          <option value="CR">Costa Rica</option>
                          <option value="CI">Cote D'Ivoire</option>
                          <option value="HR">Croatia</option>
                          <option value="CU">Cuba</option>
                          <option value="CW">Curacao</option>
                          <option value="CY">Cyprus</option>
                          <option value="CZ">Czech Republic</option>
                          <option value="DK">Denmark</option>
                          <option value="DJ">Djibouti</option>
                          <option value="DM">Dominica</option>
                          <option value="DO">Dominican Republic</option>
                          <option value="EC">Ecuador</option>
                          <option value="EG">Egypt</option>
                          <option value="SV">El Salvador</option>
                          <option value="GQ">Equatorial Guinea</option>
                          <option value="ER">Eritrea</option>
                          <option value="EE">Estonia</option>
                          <option value="ET">Ethiopia</option>
                          <option value="FK">Falkland Islands (Malvinas)</option>
                          <option value="FO">Faroe Islands</option>
                          <option value="FJ">Fiji</option>
                          <option value="FI">Finland</option>
                          <option value="FR">France</option>
                          <option value="GF">French Guiana</option>
                          <option value="PF">French Polynesia</option>
                          <option value="TF">French Southern Territories</option>
                          <option value="GA">Gabon</option>
                          <option value="GM">Gambia</option>
                          <option value="GE">Georgia</option>
                          <option value="DE">Germany</option>
                          <option value="GH">Ghana</option>
                          <option value="GI">Gibraltar</option>
                          <option value="GR">Greece</option>
                          <option value="GL">Greenland</option>
                          <option value="GD">Grenada</option>
                          <option value="GP">Guadeloupe</option>
                          <option value="GU">Guam</option>
                          <option value="GT">Guatemala</option>
                          <option value="GG">Guernsey</option>
                          <option value="GN">Guinea</option>
                          <option value="GW">Guinea-Bissau</option>
                          <option value="GY">Guyana</option>
                          <option value="HT">Haiti</option>
                          <option value="HM">Heard Island and Mcdonald Islands</option>
                          <option value="VA">Holy See (Vatican City State)</option>
                          <option value="HN">Honduras</option>
                          <option value="HK">Hong Kong</option>
                          <option value="HU">Hungary</option>
                          <option value="IS">Iceland</option>
                          <option value="IN">India</option>
                          <option value="ID">Indonesia</option>
                          <option value="IR">Iran, Islamic Republic of</option>
                          <option value="IQ">Iraq</option>
                          <option value="IE">Ireland</option>
                          <option value="IM">Isle of Man</option>
                          <option value="IL">Israel</option>
                          <option value="IT">Italy</option>
                          <option value="JM">Jamaica</option>
                          <option value="JP">Japan</option>
                          <option value="JE">Jersey</option>
                          <option value="JO">Jordan</option>
                          <option value="KZ">Kazakhstan</option>
                          <option value="KE">Kenya</option>
                          <option value="KI">Kiribati</option>
                          <option value="KP">Korea, Democratic People's Republic of</option>
                          <option value="KR">Korea, Republic of</option>
                          <option value="XK">Kosovo</option>
                          <option value="KW">Kuwait</option>
                          <option value="KG">Kyrgyzstan</option>
                          <option value="LA">Lao People's Democratic Republic</option>
                          <option value="LV">Latvia</option>
                          <option value="LB">Lebanon</option>
                          <option value="LS">Lesotho</option>
                          <option value="LR">Liberia</option>
                          <option value="LY">Libyan Arab Jamahiriya</option>
                          <option value="LI">Liechtenstein</option>
                          <option value="LT">Lithuania</option>
                          <option value="LU">Luxembourg</option>
                          <option value="MO">Macao</option>
                          <option value="MK">Macedonia, the Former Yugoslav Republic of</option>
                          <option value="MG">Madagascar</option>
                          <option value="MW">Malawi</option>
                          <option value="MY">Malaysia</option>
                          <option value="MV">Maldives</option>
                          <option value="ML">Mali</option>
                          <option value="MT">Malta</option>
                          <option value="MH">Marshall Islands</option>
                          <option value="MQ">Martinique</option>
                          <option value="MR">Mauritania</option>
                          <option value="MU">Mauritius</option>
                          <option value="YT">Mayotte</option>
                          <option value="MX">Mexico</option>
                          <option value="FM">Micronesia, Federated States of</option>
                          <option value="MD">Moldova, Republic of</option>
                          <option value="MC">Monaco</option>
                          <option value="MN">Mongolia</option>
                          <option value="ME">Montenegro</option>
                          <option value="MS">Montserrat</option>
                          <option value="MA">Morocco</option>
                          <option value="MZ">Mozambique</option>
                          <option value="MM">Myanmar</option>
                          <option value="NA">Namibia</option>
                          <option value="NR">Nauru</option>
                          <option value="NP">Nepal</option>
                          <option value="NL">Netherlands</option>
                          <option value="AN">Netherlands Antilles</option>
                          <option value="NC">New Caledonia</option>
                          <option value="NZ">New Zealand</option>
                          <option value="NI">Nicaragua</option>
                          <option value="NE">Niger</option>
                          <option value="NG">Nigeria</option>
                          <option value="NU">Niue</option>
                          <option value="NF">Norfolk Island</option>
                          <option value="MP">Northern Mariana Islands</option>
                          <option value="NO">Norway</option>
                          <option value="OM">Oman</option>
                          <option value="PK">Pakistan</option>
                          <option value="PW">Palau</option>
                          <option value="PS">Palestinian Territory, Occupied</option>
                          <option value="PA">Panama</option>
                          <option value="PG">Papua New Guinea</option>
                          <option value="PY">Paraguay</option>
                          <option value="PE">Peru</option>
                          <option value="PH">Philippines</option>
                          <option value="PN">Pitcairn</option>
                          <option value="PL">Poland</option>
                          <option value="PT">Portugal</option>
                          <option value="PR">Puerto Rico</option>
                          <option value="QA">Qatar</option>
                          <option value="RE">Reunion</option>
                          <option value="RO">Romania</option>
                          <option value="RU">Russian Federation</option>
                          <option value="RW">Rwanda</option>
                          <option value="BL">Saint Barthelemy</option>
                          <option value="SH">Saint Helena</option>
                          <option value="KN">Saint Kitts and Nevis</option>
                          <option value="LC">Saint Lucia</option>
                          <option value="MF">Saint Martin</option>
                          <option value="PM">Saint Pierre and Miquelon</option>
                          <option value="VC">Saint Vincent and the Grenadines</option>
                          <option value="WS">Samoa</option>
                          <option value="SM">San Marino</option>
                          <option value="ST">Sao Tome and Principe</option>
                          <option value="SA">Saudi Arabia</option>
                          <option value="SN">Senegal</option>
                          <option value="RS">Serbia</option>
                          <option value="CS">Serbia and Montenegro</option>
                          <option value="SC">Seychelles</option>
                          <option value="SL">Sierra Leone</option>
                          <option value="SG">Singapore</option>
                          <option value="SX">Sint Maarten</option>
                          <option value="SK">Slovakia</option>
                          <option value="SI">Slovenia</option>
                          <option value="SB">Solomon Islands</option>
                          <option value="SO">Somalia</option>
                          <option value="ZA">South Africa</option>
                          <option value="GS">South Georgia and the South Sandwich Islands</option>
                          <option value="SS">South Sudan</option>
                          <option value="ES">Spain</option>
                          <option value="LK">Sri Lanka</option>
                          <option value="SD">Sudan</option>
                          <option value="SR">Suriname</option>
                          <option value="SJ">Svalbard and Jan Mayen</option>
                          <option value="SZ">Swaziland</option>
                          <option value="SE">Sweden</option>
                          <option value="CH">Switzerland</option>
                          <option value="SY">Syrian Arab Republic</option>
                          <option value="TW">Taiwan, Province of China</option>
                          <option value="TJ">Tajikistan</option>
                          <option value="TZ">Tanzania, United Republic of</option>
                          <option value="TH">Thailand</option>
                          <option value="TL">Timor-Leste</option>
                          <option value="TG">Togo</option>
                          <option value="TK">Tokelau</option>
                          <option value="TO">Tonga</option>
                          <option value="TT">Trinidad and Tobago</option>
                          <option value="TN">Tunisia</option>
                          <option value="TR">Turkey</option>
                          <option value="TM">Turkmenistan</option>
                          <option value="TC">Turks and Caicos Islands</option>
                          <option value="TV">Tuvalu</option>
                          <option value="UG">Uganda</option>
                          <option value="UA">Ukraine</option>
                          <option value="AE">United Arab Emirates</option>
                          <option value="GB">United Kingdom</option>
                          <option value="US">United States</option>
                          <option value="UM">United States Minor Outlying Islands</option>
                          <option value="UY">Uruguay</option>
                          <option value="UZ">Uzbekistan</option>
                          <option value="VU">Vanuatu</option>
                          <option value="VE">Venezuela</option>
                          <option value="VN">Viet Nam</option>
                          <option value="VG">Virgin Islands, British</option>
                          <option value="VI">Virgin Islands, U.s.</option>
                          <option value="WF">Wallis and Futuna</option>
                          <option value="EH">Western Sahara</option>
                          <option value="YE">Yemen</option>
                          <option value="ZM">Zambia</option>
                          <option value="ZW">Zimbabwe</option>
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
                            v-model="addCard.postalCode"
                            autocomplete="postal-code"
                            class="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
                          />
                        </div>
                      </div>
                    </div>
                    <div  class="bg-gray-50 flex px-4 py-3 sm:px-6 space-x-2 items-center">
                  <div v-if="!loading2" class="text-right w-full justify-end space-x-2 flex-shrink">
                    <button
                      @click="createPaymentMethod2()"
                      class="inline-flex justify-center rounded-md border border-transparent  bg-gray-800 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                    >
                      Save Payment Method
                    </button>
                  </div>
                  <div v-if="loading2" class="text-right w-full justify-end space-x-2 flex-shrink">
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
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>

  <div aria-labelledby="plan-heading">
    <div class="shadow sm:overflow-hidden sm:rounded-md">
      <div class="space-y-6 bg-white py-6 px-4 sm:p-6">
        <div>
          <h2
            id="plan-heading"
            class="text-lg font-medium leading-6 text-gray-900"
          >
            Payment Overview
          </h2>
        </div>
          <div class="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <!-- Card -->
            <div class="overflow-hidden rounded-lg bg-white shadow">
              <div class="p-5">
                <div class="flex items-center">
                  <div class="flex-shrink-0">
                    <CalendarDaysIcon class="h-6 w-6 text-gray-400" aria-hidden="true" />
                  </div>
                  <div class="ml-5 w-0 flex-1">
                    <dl>
                      <dt class="truncate text-sm font-medium text-gray-500">Next Payment</dt>
                      <dd>
                        <transition
                        enter-active-class="transform ease-in-out duration-500 transition"
                        enter-from-class="opacity-0"
                        enter-to-class=" opacity-100"
                        mode="out-in"
                      >
                        <div v-if="loading4" class="h-7 animate-pulse bg-gray-50 rounded"/>
                        <div v-else class="text-lg font-medium text-gray-900 ">In {{ this.nextbilling }} days</div>
                      </transition>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div class="bg-gray-50 px-5 py-3">
                <div class="text-sm">
                  <a  class="font-medium text-orange-500 hover:text-orange-700">View all</a>
                </div>
              </div>
            </div>
            <div class="overflow-hidden rounded-lg bg-white shadow">
              <div class="p-5">
                <div class="flex items-center">
                  <div class="flex-shrink-0">
                    <ScaleIcon class="h-6 w-6 text-gray-400" aria-hidden="true" />
                  </div>
                  <div class="ml-5 w-0 flex-1">
                    <dl>
                      <dt class="truncate text-sm font-medium text-gray-500">Account Balance</dt>
                      <dd class="">
                        <transition
                        enter-active-class="transform ease-in-out duration-500 transition"
                        enter-from-class="opacity-0"
                        enter-to-class=" opacity-100"
                        mode="out-in"
                      >
                          <div v-if="!loading4" class="text-lg font-medium text-gray-900 ">0.00$</div>
                          <div v-else class="h-7 animate-pulse bg-gray-50 rounded"/>
                        </transition>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div class="bg-gray-50 px-5 py-3">
                <div class="text-sm">
                  <a  class="font-medium text-orange-500 hover:text-orange-700">View all</a>
                </div>
              </div>
            </div>
            <div class="overflow-hidden rounded-lg bg-white shadow">
              <div class="p-5">
                <div class="flex items-center">
                  <div class="flex-shrink-0">
                    <CurrencyDollarIcon class="h-6 w-6 text-gray-400" aria-hidden="true" />
                  </div>
                  <div class="ml-5 w-0 flex-1">
                    <dl>
                      <dt class="truncate text-sm font-medium text-gray-500">Current Plan</dt>
                      <dd>
                        <transition
                        enter-active-class="transform ease-in-out duration-500 transition"
                        enter-from-class="opacity-0"
                        enter-to-class=" opacity-100"
                        mode="out-in"
                      >
                        <div v-if="loading4" class="h-7 animate-pulse bg-gray-50 rounded"/>
                        <div v-else class="text-lg font-medium text-gray-900">{{ this.currentPlan }}</div>
                      </transition>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div class="bg-gray-50 px-5 py-3">
                <div class="text-sm">
                  <a  class="font-medium text-orange-500 hover:text-orange-700">View all</a>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  </div>

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
                  plan.disabled ? 'cursor-not-allowed disabled opacity-50' : '',
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
          @click="openModal()"
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
