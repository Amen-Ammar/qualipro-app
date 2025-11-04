<template>
    <q-dialog v-model="show">
        <q-card class="w-full max-w-md p-6">
            <h2 class="text-xl font-bold mb-4">Create New User</h2>

            <q-input v-model="form.first_name" label="First Name" outlined class="mb-3" />
            <q-input v-model="form.last_name" label="Last Name" outlined class="mb-3" />
            <q-input v-model="form.email" label="Email" type="email" outlined class="mb-3" />
            <q-input v-model="form.password" label="Password" type="password" outlined class="mb-3" />
            <q-select v-model="selectedRole" :options="roles" option-value="id" option-label="roleName"
                label="Select Role" outlined class="mb-3" />

            <div class="flex justify-end gap-2 mt-4">
                <q-btn flat label="Cancel" color="gray" @click="close" />
                <q-btn color="primary" label="Create" @click="submit" />
            </div>
        </q-card>
    </q-dialog>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { useRoleStore } from '@/stores/roleStore'

const show = ref(false)
const form = ref({ first_name: '', last_name: '', email: '', password: '', roleId: null })
const userStore = useUserStore()
const roleStore = useRoleStore()
const selectedRole = ref(null)
const roles = ref([])

onMounted(async () => {
  await roleStore.fetchRoles()
  roles.value = roleStore.roles
})

function open() {
    form.value = { first_name: '', last_name: '', email: '', password: '', roleId: null }
    selectedRole.value = null
    show.value = true
}

function close() {
    show.value = false
}

async function submit() {
    if (!selectedRole.value) {
        alert('Please select a role')
        return
    }

    try {
        await userStore.createUser({ ...form.value, roleId: selectedRole.value.id })
        await userStore.getUsers()
        close()
    } catch (err) {
        console.error(err)
    }
}

defineExpose({ open, close })
</script>
