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

const cards = [
  { name: 'Next Payment', href: '#', icon: CalendarDaysIcon, amount: 'In 24 days' },
  { name: 'Account balance', href: '#', icon: ScaleIcon, amount: '$30,659.45' },
  // More items...
]

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
import { TrashIcon, ScaleIcon, CalendarDaysIcon } from "@heroicons/vue/24/outline";
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
      cards,
      selectedMethod: 0,
      editpayment: false,
      test: "",
      loading: true,
      addCard: {
        firstName: "",
        lastName: "",
        cardNumber: "",
        cardExpiry: "",
        cardCvc: "",
        country: "",
        postalCode: ""
      }

    };
  },
  methods: {
    async openModal() {
      this.loading = true;
      this.editpayment = true;
      const response = await this.getPaymentMethods();
      this.paymentMethods = [];
      for (let i = 0; i < response.paymentMethods.length; i++) {
        this.paymentMethods.push({
          cardType: response.paymentMethods[i].card.brand,
          lastFour: response.paymentMethods[i].card.last4,
          expiration: `${response.paymentMethods[i].card.exp_month
            .toString()
            .padStart(2, "0")}/${response.paymentMethods[i].card.exp_year
            .toString()
            .substr(-2)}`,
          lastUpdated: new Date(response.paymentMethods[i].created * 1000)
            .toISOString()
            .substr(0, 10)
        });
      }
      this.loading = false;
    },
    async createPaymentMethod2() {
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
                <div class="bg-white shadow sm:rounded-lg">
                  <div class="px-4 py-5 sm:p-6">
                    <h3 class="text-lg font-medium leading-6 text-gray-900">
                      Payment Methods
                    </h3>
                    <div class="mt-2">
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
                      </transition>
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
                    <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
                      <button
                        @click="createPaymentMethod2()"
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
            <div v-for="card in cards" :key="card.name" class="overflow-hidden rounded-lg bg-white shadow">
              <div class="p-5">
                <div class="flex items-center">
                  <div class="flex-shrink-0">
                    <component :is="card.icon" class="h-6 w-6 text-gray-400" aria-hidden="true" />
                  </div>
                  <div class="ml-5 w-0 flex-1">
                    <dl>
                      <dt class="truncate text-sm font-medium text-gray-500">{{ card.name }}</dt>
                      <dd>
                        <div class="text-lg font-medium text-gray-900">{{ card.amount }}</div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div class="bg-gray-50 px-5 py-3">
                <div class="text-sm">
                  <a :href="card.href" class="font-medium text-orange-500 hover:text-orange-700">View all</a>
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
