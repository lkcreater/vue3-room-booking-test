<template>
    <a-card class="room-card-itme" hoverable style="width: 300px">
        <template #cover>
            <img
                alt="example"
                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            />
        </template>
        <template #actions>
            <a-button type="primary">Primary Button</a-button>
        </template>
        <a-card-meta :title="props.title" >
            <template #description>This is the description</template>
        </a-card-meta>
    </a-card>
</template>

<script setup>
import { SettingOutlined, EditOutlined, EllipsisOutlined } from '@ant-design/icons-vue';
 
const props = defineProps({
    title: {
        type: String,
        required: true
    },
    startTime: {
        type: String,
    },
    endTime: {
        type: String,
    },
});

</script>

<style lang="scss" scoped>

</style>