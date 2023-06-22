<template>
    <div>
        
            <a-row justify="center" style="margin-top: 50px;">
                <a-col :span="6" style="padding: 0 20px;">
                    <template v-for="item in items.data">
                        <a-card class="room-card-item" hoverable style="width: 100%">
                            <template #cover>
                                <img
                                    alt="example"
                                    src="https://www.car.chula.ac.th/images/meeting_room/DSC_3325.jpg"
                                />
                            </template>
                            <template #actions>
                                <a-button v-if="checkBtnRoom(item.startDate, item.endDate)" type="primary" @click="showDrawer(item.id)">จองห้อง</a-button>
                            </template>
                            <a-card-meta :title="item.name" >
                                <template #description>เปิดให้บริการเวลา {{ item.startDate }} ถึง {{ item.endDate }} </template>
                            </a-card-meta>
                        </a-card>   
                    </template>             
                </a-col>
                <a-col :span="10">
                    <TableJob ref="refTableJob" :room-id="1" />
                </a-col>
            </a-row>
        

        <a-drawer
            :width="500"
            title="จองห้อง"
            placement="right"
            :visible="visible"
            @close="onClose" >

            <a-form
                ref="formRef"
                :model="formState"
                v-bind="layout"
                @submit="onSubmit" >

                <a-form-item name="memberName" label="ชื่อผู้จอง" :rules="[{ required: true }]">
                    <a-input v-model:value="formState.memberName" />
                </a-form-item>

                <a-form-item name="dateJob" label="วันที่จอง" :rules="[{ required: true }]">
                    <a-date-picker v-model:value="formState.dateJob" />
                </a-form-item>

                <a-form-item name="startTimeJob" label="เวลาจอง" :rules="[{ required: true }]">
                    <a-time-picker v-model:value="formState.startTimeJob" format="HH:mm"/>
                </a-form-item>
                {{ labels.msgTime }}
                

                <a-form-item :wrapper-col="{ span: 14, offset: 4}" style="margin-top: 20px; margin-bottom: 20px;">
                    <a-button type="primary" html-type="submit">Submit</a-button>
                </a-form-item>
            </a-form>

            <div v-if="alertJob">
                <a-alert message="บันทึกไม่สำเร็จ ช่วงเวลานี้มีผู้ฝช้งานจองแล้วกรุณาตรวจสอบ" type="warning" style="margin-bottom: 15px;" />
                <ListJob :data="dataListJob"/>
            </div>
        </a-drawer>
    </div>
</template>

<script setup>
import { onMounted, ref, reactive, watchEffect, onBeforeUpdate } from 'vue';
import { notification } from 'ant-design-vue';
import { useApi } from '@/composables/useApi';
import dayjs from 'dayjs';

import TableJob from '@/components/TableJob.vue';
import ListJob from '@/components/ListJob.vue';

const { $get, $post } = useApi();

const formRef = ref();
const refTableJob = ref();


const items = ref([]);
const visible = ref(false);
const alertJob = ref(false);
const dataListJob = ref([]);
const formState = reactive({   
    roomId: '',
    memberName: '',
    dateJob: '',
    startTimeJob: '',
    endTimeJob: ''
});
const labels = reactive({
    msgTime: ''
});

onMounted( async () => {
    items.value = await $get('room');
    //console.log(items.value.data);
})

watchEffect(() => {
    if(formState.startTimeJob){
        const start = dayjs(formState.startTimeJob, 'HH:mm');
        const end = start.add(1, 'hour');
        labels.msgTime = `เริ่มเวลา ${dayjs(start).format('HH:mm')} ถึง ${dayjs(end).format('HH:mm')}`;
        formState.endTimeJob = dayjs(end);
    }else{
        formState.endTimeJob = '';
    }
});

const checkBtnRoom = (startTime, endTime) => {
    const start = dayjs(dayjs().format('YYYY-MM-DD') + ' ' + startTime, 'YYYY-MM-DD HH:mm:ss');
    const end = dayjs(dayjs().format('YYYY-MM-DD') + ' ' + endTime, 'YYYY-MM-DD HH:mm:ss');
    const now = dayjs();
    //const now = dayjs('2023-06-22 17:59:00', 'YYYY-MM-DD HH:mm:ss');
    //((now.diff(start, 'minute') > 0) && (now.diff(end, 'minute') > 0))
    // console.log(
    //     'DATE : ' + now.format('YYYY-MM-DD HH:mm:ss'), 
    //     'END : ' + end.format('YYYY-MM-DD HH:mm:ss'),
    //     now.diff(end, 'minute'))
    return ((now.diff(start, 'minute') > 0) && (now.diff(end, 'minute') < 0))
}
const showDrawer = (roomId) => {
    formState.roomId = roomId;
    visible.value = true;
    //console.log(formState);
};
const onClose = () => {
    visible.value = false;
    labels.msgTime = '';
    formState.roomId = '';
    alertJob.value = false;
    dataListJob.value = [];
    formRef.value.resetFields();
};
const onSubmit = async () => {

    const attrib = {
        ...formState,
        dateJob: dayjs(formState.dateJob).format('YYYY-MM-DD'),
        startTimeJob: dayjs(formState.startTimeJob).format('HH:mm'),
        endTimeJob: dayjs(formState.endTimeJob).format('HH:mm'),
    }
    // console.log(refTableJob.value);
    // refTableJob.value.onUpdate();

    const respone = await $post('book', attrib);
    
    if(respone.status == 200){
        if(respone.data.status == true){
            notification['success']({
                message: 'แจ้งเตือน',
                description: 'ระบบบันทึกการจองเรียบร้อย',
            });
            refTableJob.value.onUpdate();
            onClose();
        }else{
            alertJob.value = true;
            dataListJob.value = respone.data.data;
            notification['warning']({
                message: 'แจ้งเตือน',
                description: 'ระบบบันทึกไม่สำเร็จ',
            });
        }
    }else{
        notification['error']({
            message: 'แจ้งเตือน',
            description: respone.data,
        });
    }
};
</script>

<style lang="scss" scoped>

</style>