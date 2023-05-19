<script lang="ts">
import { HomeIcon, ChevronRightIcon } from '@heroicons/vue/20/solid'
export default {
  name: 'Docs',
  components: {
    HomeIcon,
    ChevronRightIcon
  }
}
</script>

<template>
    <nav class="flex pt-4 pl-6" aria-label="Breadcrumb">
      <ol role="list" class="flex space-x-4 rounded-md bg-white px-6 shadow">
        <li class="flex">
          <div class="flex items-center">
            <a href="#" class="text-gray-400 flex items-center hover:text-gray-500">
                <HomeIcon class="h-10 w-4 flex-shrink-0 text-gray-400" aria-hidden="true" />
                <a class="ml-2 text-sm font-medium text-gray-500 hover:text-gray-700">Home</a>
            </a>
          </div>
        </li>
        <li class="flex">
          <div class="flex items-center">
            <ChevronRightIcon class="h-10 w-6 flex-shrink-0 text-gray-400" aria-hidden="true" />
            <a href="#" class="mx-4 text-sm font-medium text-gray-500 hover:text-gray-700">Premium</a>
          </div>
          <div class="flex items-center">
            <ChevronRightIcon class="h-10 w-6 flex-shrink-0 text-gray-400" aria-hidden="true" />
            <a href="#" class="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">Premium</a>
          </div>
        </li>
      </ol>
    </nav>
  </template>