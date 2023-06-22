<template>
    <a-table :columns="columns" :data-source="data" bordered>
        <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'dateJob'">
                <DateFormat :date="record.dateJob"/>
            </template>
            <template v-if="column.key === 'startTimeJob'">
                <DateFormat :date="record.startTimeJob" :is-time="true"/>
            </template>
            <template v-if="column.key === 'endTimeJob'">
                <DateFormat :date="record.endTimeJob" :is-time="true"/>
            </template>
            <template v-if="column.key === 'status'">
                <StatusJob :day="record.dateJob" :start-time="record.startTimeJob" :end-time="record.endTimeJob"/>
            </template>
        </template>
    </a-table>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useApi } from '@/composables/useApi';
import DateFormat from '@/components/DateFormat.vue';
import StatusJob from '@/components/StatusJob.vue';

const { $get, $post } = useApi();

const props = defineProps({
    roomId: {
        type: Number,
        required: true
    }
});

const data = ref([]);
const columns = [{
    title: 'Name',
    dataIndex: 'memberName',
    key: 'memberName',
}, {
    title: 'Date',
    dataIndex: 'dateJob',
    key: 'dateJob',
}, {
    title: 'From.',
    dataIndex: 'startTimeJob',
    key: 'startTimeJob',
}, {
    title: 'To.',
    dataIndex: 'endTimeJob',
    key: 'endTimeJob',
},{
    title: 'status',
    key: 'status',
}];

onMounted(async () => {
    await onUpdate();
});

const onUpdate = async () => {
    const respone = await $get('book/job/' + props.roomId); 
    if(respone.data.status){
        data.value = respone.data.data;
    }
    //console.log(data.value);
}

defineExpose({
    onUpdate
});

</script>

<style lang="scss" scoped>

</style>