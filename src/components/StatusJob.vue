<template>
    <a-badge v-bind="statusButton()"/>
</template>

<script setup>
import { reactive } from 'vue';
import dayjs from 'dayjs';

const props = defineProps({
    day: {
        type: String,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    }
});

const attribs = reactive({
    count: '',
    numberStyle: {}
});

const statusButton = () => {
    const start = dayjs(dayjs(props.day).format('YYYY-MM-DD') + ' ' + props.startTime, 'YYYY-MM-DD HH:mm:ss');
    const end = dayjs(dayjs(props.day).format('YYYY-MM-DD') + ' ' + props.endTime, 'YYYY-MM-DD HH:mm:ss');
    const now = dayjs();
    //const now = dayjs('2023-06-22 12:22:00', 'YYYY-MM-DD HH:mm:ss');

    if((now.diff(start, 'minute') > 0) && (now.diff(end, 'minute') < 0)){
        return {
            count: 'ใช้งาน',
            numberStyle: { backgroundColor: '#e58828fa' }
        }
    }
    if((now.diff(start, 'minute') < 0) && (now.diff(end, 'minute') < 0)){
        return {
            count: 'รอคิว',
        }
    }
    if((now.diff(start, 'minute') > 0) && (now.diff(end, 'minute') > 0)){
        return {
            count: 'เสร็จสิ้น',        
            numberStyle: { backgroundColor: '#52c41a' }
        }
    }    
}

// { backgroundColor: '#52c41a' }
</script>

<style lang="scss" scoped>

</style>