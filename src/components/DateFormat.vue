<template>
    {{ convert(props.date) }}
</template>

<script setup>
import dayjs from 'dayjs';

const props = defineProps({
    isTime: {
        type: Boolean,
        default: () => false
    },
    date: {
        type: String,
        required: true
    }
});

const convert = (date) => {
    if(props.isTime){
        return dayjs(date, 'HH:mm:ss').format('HH:mm');
    }
    return dayjs(date, 'YYYY-MM-DD').format('YYYY-MM-DD');
}
</script>

<style lang="scss" scoped>

</style>