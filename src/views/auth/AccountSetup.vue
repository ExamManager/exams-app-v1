<script lang="ts">
//import {FormKit} from '@formkit/vue'
import authenticate from "../../functions/authenticate";
import {
  RadioGroup,
  RadioGroupDescription,
  RadioGroupLabel,
  RadioGroupOption,
} from "@headlessui/vue";

const schoolSize = [
  { id: 1, title: "Personal", description: "For personal use only", users: "Free" },
  {
    id: 2,
    title: "Small",
    description: "For schools with less than 200 students",
    users: "$19,99",
  },
  {
    id: 3,
    title: "Medium",
    description: "For schools with less than 500 students",
    users: "$29,99",
  },
  {
    id: 4,
    title: "Large",
    description: "For schools with less than 750 students",
    users: "$49,99",
  },
  {
    id: 5,
    title: "Enterprise",
    description: "For schools with more than 750 students",
    users: "starts at $69,99",
  },
];

const selectedschoolSize = schoolSize[0];

export default (await import("vue")).defineComponent({
  name: "completeAccountSetup",
  mixins: [authenticate],
  components: {
    schoolSize,
    selectedschoolSize,
    RadioGroup,
    RadioGroupDescription,
    RadioGroupLabel,
    RadioGroupOption,
  },
  data() {
    return {
      schoolSize,
      selectedschoolSize,
      currentState: {
        username: "",
        entSize: "",
        firstName: "",
        lastName: "",
        email: "",
        address: {
          country: "",
          city: "",
          state: "",
          zip: "",
          address1: "",
          address2: "",
          address3: "",
        },
      },
      img: null,
      defaultImgURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png",
      userid: "",
    };
  },
  methods: {
    getBase64(file: any) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => sessionStorage.setItem("funny", reader.result);
      reader.onerror = function (error) {
        console.log("Error: ", error);
      };
    },
    handleFiles(event: Event) {      
      console.log('handleFiles')

      const imgObject = event.target.files[0]
      
      document.getElementById("image")
       .src = URL.createObjectURL(imgObject)
      console.log(imgObject)
      this.img = imgObject
    },
    removeImg(){
      if (this.img != null) {
        this.img = null
        document.getElementById("image")
          .src = this.defaultImgURL
        document.getElementById("file-upload")
          .value = ""
      }
    },
    submit() {
      console.log(this.currentState);
      this.userid = localStorage.getItem('user');
      this.setUserData(this.userid, this.currentState, this.img);
      this.$router.push('/')
    },
  },
  watch: {
    selectedschoolSize: {
      handler: function (val: any) {
        this.currentState.entSize = val.id;
      },
      deep: true, //hello
    },
  },
  mounted() {
    document.getElementById("image")
      .src = this.defaultImgURL

    document.addEventListener("submit", (e) => {
      e.preventDefault();
      this.submit();
    });

    this.userid = sessionStorage.getItem('userid') || '';
  },
  unmounted() {
    document.removeEventListener("submit", (e) => {
      e.preventDefault();
      this.submit();
    });
  },
});
</script>
<template>
  <form class="sm:px-32 px-10 py-20 space-y-8 divide-y divide-gray-200">
    <div class="space-y-8 divide-y divide-gray-200">
        <div>
          <div>
          <h3 class="text-lg font-medium leading-6 text-gray-900">Profile</h3>
          <p class="mt-1 text-sm text-gray-500">This information will be displayed publicly so be careful what you share.</p>
          </div>
          <div class="lg:flex flex-none w-full">
            <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 lg:grid-cols-6">
              <div class="lg:col-span-4">
                <label for="username" class="block text-sm font-medium text-gray-700">
                  {{
                    selectedschoolSize.id == schoolSize[0].id
                      ? "User Name"
                      : "School Name"
                  }}
                </label>
                <div class="mt-4 flex rounded-md shadow-sm">
                  <span
                    class="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm"
                  >
                    {{
                      selectedschoolSize.id == schoolSize[0].id
                        ? "User Name"
                        : "School Name"
                    }}
                  </span>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    v-model="currentState.username"
                    autocomplete="username"
                    class="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
            <div class="sm:col-span-6 sm:mt-6 mt-8">
              <label for="photo" class="block text-sm font-medium text-gray-700" @click="console.log('hi')"
                >Profile Picture</label
              >
              <div class=" flex items-center">
                <span id="profilePreviewDiv" class="h-12 w-12 overflow-hidden rounded-full bg-gray-100 flex justify-center">
                  <img id="image" class="h-full w-full object-cover" />
                </span>
                <label
                  for="file-upload"
                  class="ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium m-6 mr-4 leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                >
                </label>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-8 h-8 p-1.5 text-gray-400 rounded-md hover:text-gray-300 hover:bg-gray-200"
                  v-if="img != null"
                  @click="removeImg()"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </div>
              <p class="text-xs text-gray-500">PNG or JPG, up to 10MB</p>
            </div>
          </div>
        </div>

        <div class="sm:col-span-6 mt-8 pt-8">
          <RadioGroup v-model="selectedschoolSize">
            <RadioGroupLabel 
              ><div>
            <h3 class="text-lg font-medium leading-6 text-gray-900">
              Select Subscribtion
            </h3>
            <p class="mt-1 text-sm text-gray-500">
              Select the subscribtion that best fits your needs.
            </p>
          </div></RadioGroupLabel
            >

            <div class="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4">
              <RadioGroupOption
                as="template"
                v-for="mailingList in schoolSize"
                :key="mailingList.id"
                :value="mailingList"
                v-slot="{ checked, active }"
              >
                <div
                  :class="[
                    checked ? 'border-transparent' : 'border-gray-300',
                    active ? 'border-orange-500 ring-2 ring-orange-500' : '',
                    'relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none',
                  ]"
                >
                  <span class="flex flex-1">
                    <span class="flex flex-col">
                      <RadioGroupLabel
                        as="span"
                        class="block text-sm font-medium text-gray-900"
                        >{{ mailingList.title }}
                      </RadioGroupLabel>
                      <RadioGroupDescription
                        as="span"
                        class="mt-1 flex items-center text-sm text-gray-500"
                        >{{ mailingList.description }}</RadioGroupDescription
                      >
                      <RadioGroupDescription
                        as="span"
                        class="mt-6 text-sm font-medium text-gray-900"
                        >{{ mailingList.users }}</RadioGroupDescription
                      >
                    </span>
                  </span>
                  <CheckCircleIcon
                    :class="[!checked ? 'invisible' : '', 'h-5 w-5 text-orange-600']"
                    aria-hidden="true"
                  />
                  <span
                    :class="[
                      active ? 'border' : 'border-2',
                      checked ? 'border-orange-500' : 'border-transparent',
                      'pointer-events-none absolute -inset-px rounded-lg',
                    ]"
                    aria-hidden="true"
                  /> 
                </div>
              </RadioGroupOption>
            </div>
          </RadioGroup>
        </div>

        <div class="pt-8">
          <div>
            <h3 class="text-lg font-medium leading-6 text-gray-900">
              Personal Information
            </h3>
            <p class="mt-1 text-sm text-gray-500">
              Use a permanent address where you can receive mail.
            </p>
          </div>
          <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div class="sm:col-span-3">
              <label for="first-name" class="block text-sm font-medium text-gray-700"
                >First name</label
              >
              <div class="mt-1">
                <input
                  type="text"
                  v-model="currentState.firstName"
                  name="first-name"
                  id="first-name"
                  autocomplete="given-name"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                />
              </div>
            </div>

            <div class="sm:col-span-3">
              <label for="last-name" class="block text-sm font-medium text-gray-700"
                >Last name</label
              >
              <div class="mt-1">
                <input
                  type="text"
                  v-model="currentState.lastName"
                  name="last-name"
                  id="last-name"
                  autocomplete="family-name"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                />
              </div>
            </div>

            <div class="sm:col-span-4">
              <label for="email" class="block text-sm font-medium text-gray-700"
                >Email address</label
              >
              <div class="mt-1">
                <input
                  id="email"
                  v-model="currentState.email"
                  name="email"
                  type="email"
                  autocomplete="email"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                />
              </div>
            </div>

            <div class="sm:col-span-2">
              <label for="country" class="block text-sm font-medium text-gray-700"
                >Country</label
              >
              <div class="mt-1">
                <select
                  id="country"
                  v-model="currentState.address.country"
                  name="country"
                  autocomplete="country-name"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
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
                  <option value="Antigua and Barbuda">Antigua and Barbuda</option>
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
                  <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
                  <option value="Botswana">Botswana</option>
                  <option value="Bouvet Island">Bouvet Island</option>
                  <option value="Brazil">Brazil</option>
                  <option value="British Indian Ocean Territory">
                    British Indian Ocean Territory
                  </option>
                  <option value="Brunei Darussalam">Brunei Darussalam</option>
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
                  <option value="Christmas Island">Christmas Island</option>
                  <option value="Cocos (Keeling) Islands">Cocos (Keeling) Islands</option>
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
                  <option value="Dominican Republic">Dominican Republic</option>
                  <option value="Ecuador">Ecuador</option>
                  <option value="Egypt">Egypt</option>
                  <option value="El Salvador">El Salvador</option>
                  <option value="Equatorial Guinea">Equatorial Guinea</option>
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
                  <option value="French Polynesia">French Polynesia</option>
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
                  <option value="Korea, Republic of">Korea, Republic of</option>
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
                  <option value="Libyan Arab Jamahiriya">Libyan Arab Jamahiriya</option>
                  <option value="Liechtenstein">Liechtenstein</option>
                  <option value="Lithuania">Lithuania</option>
                  <option value="Luxembourg">Luxembourg</option>
                  <option value="Macao">Macao</option>
                  <option value="Macedonia, the Former Yugoslav Republic of">
                    Macedonia, the Former Yugoslav Republic of
                  </option>
                  <option value="Madagascar">Madagascar</option>
                  <option value="Malawi">Malawi</option>
                  <option value="Malaysia">Malaysia</option>
                  <option value="Maldives">Maldives</option>
                  <option value="Mali">Mali</option>
                  <option value="Malta">Malta</option>
                  <option value="Marshall Islands">Marshall Islands</option>
                  <option value="Martinique">Martinique</option>
                  <option value="Mauritania">Mauritania</option>
                  <option value="Mauritius">Mauritius</option>
                  <option value="Mayotte">Mayotte</option>
                  <option value="Mexico">Mexico</option>
                  <option value="Micronesia, Federated States of">
                    Micronesia, Federated States of
                  </option>
                  <option value="Moldova, Republic of">Moldova, Republic of</option>
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
                  <option value="Netherlands Antilles">Netherlands Antilles</option>
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
                  <option value="Papua New Guinea">Papua New Guinea</option>
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
                  <option value="Russian Federation">Russian Federation</option>
                  <option value="Rwanda">Rwanda</option>
                  <option value="Saint Barthelemy">Saint Barthelemy</option>
                  <option value="Saint Helena">Saint Helena</option>
                  <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
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
                  <option value="Sao Tome and Principe">Sao Tome and Principe</option>
                  <option value="Saudi Arabia">Saudi Arabia</option>
                  <option value="Senegal">Senegal</option>
                  <option value="Serbia">Serbia</option>
                  <option value="Serbia and Montenegro">Serbia and Montenegro</option>
                  <option value="Seychelles">Seychelles</option>
                  <option value="Sierra Leone">Sierra Leone</option>
                  <option value="Singapore">Singapore</option>
                  <option value="Sint Maarten">Sint Maarten</option>
                  <option value="Slovakia">Slovakia</option>
                  <option value="Slovenia">Slovenia</option>
                  <option value="Solomon Islands">Solomon Islands</option>
                  <option value="Somalia">Somalia</option>
                  <option value="South Africa">South Africa</option>
                  <option value="South Georgia and the South Sandwich Islands">
                    South Georgia and the South Sandwich Islands
                  </option>
                  <option value="South Sudan">South Sudan</option>
                  <option value="Spain">Spain</option>
                  <option value="Sri Lanka">Sri Lanka</option>
                  <option value="Sudan">Sudan</option>
                  <option value="Suriname">Suriname</option>
                  <option value="Svalbard and Jan Mayen">Svalbard and Jan Mayen</option>
                  <option value="Swaziland">Swaziland</option>
                  <option value="Sweden">Sweden</option>
                  <option value="Switzerland">Switzerland</option>
                  <option value="Syrian Arab Republic">Syrian Arab Republic</option>
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
                  <option value="Trinidad and Tobago">Trinidad and Tobago</option>
                  <option value="Tunisia">Tunisia</option>
                  <option value="Turkey">Turkey</option>
                  <option value="Turkmenistan">Turkmenistan</option>
                  <option value="Turks and Caicos Islands">
                    Turks and Caicos Islands
                  </option>
                  <option value="Tuvalu">Tuvalu</option>
                  <option value="Uganda">Uganda</option>
                  <option value="Ukraine">Ukraine</option>
                  <option value="United Arab Emirates">United Arab Emirates</option>
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
                  <option value="Virgin Islands, British">Virgin Islands, British</option>
                  <option value="Virgin Islands, U.s.">Virgin Islands, U.s.</option>
                  <option value="Wallis and Futuna">Wallis and Futuna</option>
                  <option value="Western Sahara">Western Sahara</option>
                  <option value="Yemen">Yemen</option>
                  <option value="Zambia">Zambia</option>
                  <option value="Zimbabwe">Zimbabwe</option>
                </select>
              </div>
            </div>

            <div class="sm:col-span-3">
              <label for="street-address" class="block text-sm font-medium text-gray-700"
                >Address Line 1</label
              >
              <div class="mt-1">
                <input
                  type="text"
                  v-model="currentState.address.address1"
                  name="address-1"
                  id="address-1"
                  autocomplete="address-line1"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                />
              </div>
            </div>

            <div class="sm:col-span-3">
              <label for="street-address" class="block text-sm font-medium text-gray-700"
                >Address Line 2</label
              >
              <div class="mt-1">
                <input
                  type="text"
                  v-model="currentState.address.address2"
                  name="address-2"
                  id="address-2"
                  autocomplete="address-line2"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                />
              </div>
            </div>

            <div class="sm:col-span-3">
              <label for="street-address" class="block text-sm font-medium text-gray-700"
                >Address Line 3</label
              >
              <div class="mt-1">
                <input
                  type="text"
                  v-model="currentState.address.address3"
                  name="address-3"
                  id="address-3"
                  autocomplete="address-line3"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                />
              </div>
            </div>

            <div class="sm:col-span-2">
              <label for="city" class="block text-sm font-medium text-gray-700"
                >City</label
              >
              <div class="mt-1">
                <input
                  type="text"
                  v-model="currentState.address.city"
                  name="city"
                  id="city"
                  placeholder="City"
                  autocomplete="address-level2"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                />
              </div>
            </div>

            <div class="sm:col-span-2">
              <label for="region" class="block text-sm font-medium text-gray-700"
                >State / Province</label
              >
              <div class="mt-1">
                <input
                  type="text"
                  v-model="currentState.address.state"
                  name="region"
                  id="region"
                  autocomplete="address-level1"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                />
              </div>
            </div>

            <div class="sm:col-span-2">
              <label for="postal-code" class="block text-sm font-medium text-gray-700"
                >ZIP / Postal code</label
              >
              <div class="mt-1">
                <input
                  type="text"
                  v-model="currentState.address.zip"
                  name="postal-code"
                  id="postal-code"
                  autocomplete="postal-code"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="pt-5 w-full">
        <div class="flex justify-end mb-12">
          <button
            type="button"
            class="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="ml-3 inline-flex justify-center rounded-md border border-transparent bg-orange-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          >
            Finish Setup
          </button>
        </div>
      </div>
    </form>
</template>
