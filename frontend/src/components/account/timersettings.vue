<script lang="ts">

export default {
    name: "TimerSettings",
    data() {
        return {
            editpayment: false,
            selectedMethod: 0,
            paymentMethods: [],
            loading: true,
            paymentMethod: {
                cardType: "",
                last4: "",
                expMonth: "",
                expYear: "",
                brand: "",
                id: "",
            },
        }
    },
}


</script>
<template>
    <div aria-labelledby="plan-heading">
        <div class="shadow sm:overflow-hidden sm:rounded-md">
            <div class="space-y-6 bg-white py-6 px-4 sm:p-6">
                <div class="space-y-8 divide-y divide-gray-200">
                    <div class="space-y-8 divide-y divide-gray-200">
                        <div>
                            <div>
                                <h3 class="text-xl font-medium leading-6 text-gray-900">
                                    Settings
                                </h3>
                                <p class="mt-1 text-sm text-gray-500">
                                    Customize your Exam timing and other settings.
                                </p>
                            </div>

                            <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                                <div class="sm:col-span-4 space-y-2 ">
                                    <label for="username" class="block text-sm font-medium text-gray-700">General<a
                                            class="text-red-600">
                                            *</a></label>
                                    <div class="mt-1 flex rounded-md">
                                        <span
                                            class="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">Sync
                                            Timers</span>
                                        <input type="checkbox" name="examname" id="examname"
                                            class="h-6 w-5 rounded-none rounded-r-md border-gray-300 focus:border-orange-500 focus:ring-orange-500 sm:text-sm" />
                                    </div>
                                    <div class="mt-1 flex rounded-md">
                                        <span
                                            class="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">Autostart
                                            Exams</span>
                                        <input type="checkbox" name="examname" id="examname"
                                            class="h-6 w-5 rounded-none rounded-r-md border-gray-300 focus:border-orange-500 focus:ring-orange-500 sm:text-sm" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
                <button type="submit"
                    class="inline-flex justify-center rounded-md border border-transparent bg-gray-800 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2">
                    Save Changes
                </button>
            </div>
        </div>
    </div>

    <!-- Plan -->
    <!-- <div aria-labelledby="plan-heading">
        <div class="shadow sm:overflow-hidden sm:rounded-md">
            <div class="space-y-6 bg-white py-6 px-4 sm:p-6">
                <div>
                    <h2 id="plan-heading" class="text-lg font-medium leading-6 text-gray-900">
                        Plan
                    </h2>
                </div>

                <RadioGroup v-model="selectedPlan">
                    <RadioGroupLabel class="sr-only"> Pricing plans </RadioGroupLabel>
                    <div class="relative -space-y-px rounded-md bg-white">
                        <RadioGroupOption as="template" v-for="(plan, planIdx) in plans" :key="plan.name" :value="plan"
                            v-slot="{ checked, active }">
                            <div :class="[
                                planIdx === 0 ? 'rounded-tl-md rounded-tr-md' : '',
                                planIdx === plans.length - 1
                                    ? 'rounded-bl-md rounded-br-md'
                                    : '',
                                checked
                                    ? 'bg-orange-50 border-orange-200'
                                    : 'border-gray-200',
                                plan.disabled ? 'cursor-not-allowed disabled opacity-50' : '',
                                'relative border p-4 flex flex-col cursor-pointer md:pl-4 md:pr-6 md:grid md:grid-cols-3 focus:outline-none'
                            ]" :disabled="plan.disabled">
                                <span class="flex items-center text-sm">
                                    <span :class="[
                                        checked
                                            ? 'bg-orange-500 border-transparent'
                                            : 'bg-white border-gray-300',
                                        active ? 'ring-2 ring-offset-2 ring-gray-900' : '',
                                        'h-4 w-4 rounded-full border flex items-center justify-center'
                                    ]" aria-hidden="true">
                                        <span class="rounded-full bg-white w-1.5 h-1.5" />
                                    </span>
                                    <RadioGroupLabel as="span" class="ml-3 font-medium text-gray-900">{{ plan.name }}
                                    </RadioGroupLabel>
                                </span>
                                <RadioGroupDescription as="span" class="ml-6 pl-1 text-sm md:ml-0 md:pl-0 md:text-center">
                                    <span :class="[
                                        checked ? 'text-orange-900' : 'text-gray-900',
                                        'font-medium'
                                    ]">${{ plan.priceMonthly }} / mo</span>
                                    {{ " " }}
                                    <span :class="checked ? 'text-orange-700' : 'text-gray-500'">(${{ plan.priceYearly }} /
                                        yr)</span>
                                </RadioGroupDescription>
                                <RadioGroupDescription as="span" :class="[
                                    checked ? 'text-orange-700' : 'text-gray-500',
                                    'ml-6 pl-1 text-sm md:ml-0 md:pl-0 md:text-right'
                                ]">{{ plan.limit }}</RadioGroupDescription>
                            </div>
                        </RadioGroupOption>
                    </div>
                </RadioGroup>

                <SwitchGroup as="div" class="flex items-center">
                    <Switch v-model="annualBillingEnabled" :class="[
                        annualBillingEnabled ? 'bg-orange-500' : 'bg-gray-200',
                        'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2'
                    ]">
                        <span aria-hidden="true" :class="[
                            annualBillingEnabled ? 'translate-x-5' : 'translate-x-0',
                            'inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                        ]" />
                    </Switch>
                    <SwitchLabel as="span" class="ml-3">
                        <span class="text-sm font-medium text-gray-900">Annual billing</span>
                        <span class="text-sm text-gray-500">(Save 10%)</span>
                    </SwitchLabel>
                </SwitchGroup>
            </div>
            <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
                <button type="submit"
                    class="inline-flex justify-center rounded-md border border-transparent bg-gray-800 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2">
                    Update Plan
                </button>
            </div>
        </div>
    </div> -->

    <!-- Payment Method -->
    <div class="space-y-6">
    </div>
</template>