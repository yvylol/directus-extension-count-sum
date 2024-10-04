<script lang="ts" setup>
import { ref, toRaw } from 'vue';
import { useApi, useStores } from '@directus/extensions-sdk';
import './types.d.ts'


const props = defineProps({
	value:{
		type: Object,
		default: null
	},
	column:{
		type:String,
		default:null

	},
	sum:{
		type:Boolean,
		default:false
	},
	mode:{
		type:String,
		default:'sum'
	},
	prefix:{
		type: String,
		default: null
	},
	suffix:{
		type: String,
		default: null
	
	}
})

const calculatedValue = ref<string | number>(0)

if (props.mode=='sum'){


	props.value.forEach(item => {
			const columns = props.column.split('.');

			columns.forEach(col => {
				item = item[col];
			});

			calculatedValue.value = calculatedValue.value as number + parseFloat(item) ;
		});
}
else if (props.mode=='count') {
	
	calculatedValue.value = props.value.length;
}
else if (props.mode=='plain_text'){
	props.value.forEach(item => {
			const columns = props.column.split('.');

			columns.forEach(col => {
				item = item[col];
			});

			calculatedValue.value = calculatedValue.value + ',' + item
		});

	
		
}

</script>

<template>

<!-- {{ JSON.stringify(props,null,2) }} -->
<div v-if="calculatedValue">{{ prefix }}{{ calculatedValue }}{{ suffix }}</div>
<value-null v-else />

</template>
