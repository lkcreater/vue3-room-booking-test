<template>
    <a-table :columns="columns" :data-source="props.data" bordered>
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
        </template>
    </a-table>
</template>

<script setup>
import DateFormat from '@/components/DateFormat.vue';

const props = defineProps({
    data: {
        type: Array,
        default: () => []
    }
});

const columns = [{
    title: 'Name',
    dataIndex: 'memberName',
    key: 'memberName',
},
{
    title: 'Date',
    dataIndex: 'dateJob',
    key: 'dateJob',
},
{
    title: 'From.',
    dataIndex: 'startTimeJob',
    key: 'startTimeJob',
}, {
    title: 'To.',
    dataIndex: 'endTimeJob',
    key: 'endTimeJob',
}];
</script>

<style lang="scss" scoped>

</style>