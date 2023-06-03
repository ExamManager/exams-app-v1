<script lang="ts">



export default (await import("vue")).defineComponent({
  data() {
    return {
      sizes: [
        {
          id: 'personal',
          name: "Personal",
          description: "Personal use"
        },
        {
          id: 'smmall',
          name: "Small",
          description: "Less than 200 students"
        },
        {
          id: 'medium',
          name: "Medium",
          description: "Less than 400 students"
        },
        {
          id: 'large',
          name: "Large",
          description: "Less than 500 students"
        },
        {
          id: 'verybig',
          name: "Contact Us :)",
          description: "More than 500 students"
        }
      ]
    }
  }
})
  


</script>
<template>
  <form class="space-y-8 divide-y divide-gray-200">
    <div class="space-y-8 divide-y divide-gray-200m xl:mx-96 lg:mx-72 md:mx-52 sm:mx-36 mx-12 mt-12">
      <div>
        <div>
          <h3 class="text-lg font-medium leading-6 text-gray-900">Profile</h3>
        </div>

        <div class="sm:col-span-6">
          <label for="photo" class="block text-sm font-medium text-gray-700">Photo</label>
          <div class="mt-1 flex items-center">
            <span class="h-12 w-12 overflow-hidden rounded-full bg-gray-100">
              <svg class="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </span>
            <button type="button" class="ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Change</button>
          </div>
        </div>

        <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <div class="sm:col-span-4">
            <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
            <div class="mt-1 flex rounded-md shadow-sm">
              <span class="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">Username</span>
              <input type="text" name="username" id="username" autocomplete="username" class="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
            </div>
          </div>

          <div class="sm:col-span-6">
            <label for="about" class="block text-sm font-medium text-gray-700">School Size</label>
            <p class="text-sm text-gray-500 mb-2">How big is your school?</p>
            <div class="mt-1">
              <fieldset>
                <legend class="sr-only">Plan</legend>
                <div class="space-y-5">
                  <div v-for="size in sizes" :key="size.id" class="relative flex items-start">
                    <div class="flex h-5 items-center">
                      <input :id="size.id" :aria-describedby="`${size.id}-description`" name="plan" type="radio" :checked="size.id === 'small'" class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                    </div>
                    <div class="ml-3 text-sm">
                      <label :for="size.id" class="font-medium text-gray-700">{{ size.name }}</label>
                      <p :id="`${size.id}-description`" class="text-gray-500">{{ size.description }}</p>
                    </div>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
        </div>
      </div>

      <div class="pt-8">
        <div>
          <h3 class="text-lg font-medium leading-6 text-gray-900">Personal Information</h3>
          <p class="mt-1 text-sm text-gray-500">Use a permanent address where you can receive mail.</p>
        </div>
        <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <div class="sm:col-span-3">
            <label for="first-name" class="block text-sm font-medium text-gray-700">First name</label>
            <div class="mt-1">
              <input type="text" name="first-name" id="first-name" autocomplete="given-name" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
            </div>
          </div>

          <div class="sm:col-span-3">
            <label for="last-name" class="block text-sm font-medium text-gray-700">Last name</label>
            <div class="mt-1">
              <input type="text" name="last-name" id="last-name" autocomplete="family-name" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
            </div>
          </div>

          <div class="sm:col-span-4">
            <label for="email" class="block text-sm font-medium text-gray-700">Email address</label>
            <div class="mt-1">
              <input id="email" name="email" type="email" autocomplete="email" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
            </div>
          </div>

          <div class="sm:col-span-3">
            <label for="country" class="block text-sm font-medium text-gray-700">Country</label>
            <div class="mt-1">
              <select id="country" name="country" autocomplete="country-name" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                <option>United States</option>
                <option>Canada</option>
                <option>Mexico</option>
              </select>
            </div>
          </div>

          <div class="sm:col-span-6">
            <label for="street-address" class="block text-sm font-medium text-gray-700">Address Line 1</label>
            <div class="mt-1">
              <input type="text" name="address-1" id="address-1" autocomplete="address-line1" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
            </div>
          </div>

          <div class="sm:col-span-6">
            <label for="street-address" class="block text-sm font-medium text-gray-700">Address Line 2</label>
            <div class="mt-1">
              <input type="text" name="address-2" id="address-2" autocomplete="address-line2" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
            </div>
          </div>

          <div class="sm:col-span-6">
            <label for="street-address" class="block text-sm font-medium text-gray-700">Address Line 3</label>
            <div class="mt-1">
              <input type="text" name="address-3" id="address-3" autocomplete="address-line3" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
            </div>
          </div>

          <div class="sm:col-span-2">
            <label for="city" class="block text-sm font-medium text-gray-700">City</label>
            <div class="mt-1">
              <input type="text" name="city" id="city" autocomplete="address-level2" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
            </div>
          </div>

          <div class="sm:col-span-2">
            <label for="region" class="block text-sm font-medium text-gray-700">State / Province</label>
            <div class="mt-1">
              <input type="text" name="region" id="region" autocomplete="address-level1" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
            </div>
          </div>

          <div class="sm:col-span-2">
            <label for="postal-code" class="block text-sm font-medium text-gray-700">ZIP / Postal code</label>
            <div class="mt-1">
              <input type="text" name="postal-code" id="postal-code" autocomplete="postal-code" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="pt-5 xl:mx-96 lg:mx-72 md:mx-52 sm:mx-36 mx-12">
      <div class="flex justify-end mb-12">
        <button type="button" class="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Cancel</button>
        <button type="submit" class="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Save</button>
      </div>
    </div>
  </form>
</template>

