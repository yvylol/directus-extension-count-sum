import { defineDisplay, useStores } from '@directus/extensions-sdk';
import DisplayComponent from './display.vue';


export default defineDisplay({
	id: 'display-count-sum',
	name: '累计或者求和',
	icon: 'box',
	description: '求和或者累计',
	component: DisplayComponent,
	types: ['alias', 'string', 'uuid', 'integer', 'bigInteger', 'json'],
	localTypes: ['m2m', 'm2o', 'o2m', 'translations', 'm2a', 'file', 'files'],
	options: ({ editing, relations }) => {
		const relatedCollection =
			relations.o2m?.meta?.junction_field != null ? relations.m2o?.related_collection : relations.o2m?.collection;

		const junction_table = relations.o2m?.meta?.junction_field != null ? relations.o2m?.collection : null;
		const { useFieldsStore } = useStores();
		const fieldsStore = useFieldsStore();

		let displayTemplateMeta;

		if (editing === '+') {
			displayTemplateMeta = {
				interface: 'presentation-notice',
				options: {
					text: 'Please complete the field before attempting to configure the display.',
				},
				width: 'full',
			};
		} else {
			const fields = fieldsStore.getFieldsForCollection(relatedCollection!);
			const field_choices: any[] = [];

			fields.forEach((field) => {
				field_choices.push({
					text: field.meta?.field,
					value: junction_table ? `${relations.o2m?.meta?.junction_field}.${field.meta?.field}` : field.meta?.field,
				});
			});

		

			displayTemplateMeta = {
				interface: 'select-dropdown',
				options: {
					choices: field_choices,
				},
				width: 'full',
			};
		}

		return [
			{
				field: 'column',
				name: 'Choose a column',
				meta: displayTemplateMeta as any,
			},
			{
				field: 'sum',
				type: 'boolean',
				name: 'Calulate Sum',
				meta: {
					interface: 'boolean',
					options: {
						label: 'Yes',
					},
					width: 'half',
				},
			},
			{
				field: 'mode',
				type: 'string',
				name: '显示方式',
				meta:{
					interface:'select-radio',
					options:{
						choices:[
							{text:'求和',value:'sum'},
							{text:'计数',value:'count'},
							{
								text:'文本逗号分隔',
								value:'plain_text'
							},
						]
					}
				}

			},
			// {
			// 	field: 'plain_text',
			// 	type: 'boolean',
			// 	name: 'plain text split with comma',
			// 	meta: {
			// 		interface: 'boolean',
			// 		options: {
			// 			label: 'Yes',
			// 		},
			// 		width: 'half',
			// 	},
			// },
			{
				field: 'prefix',
				type: 'string',
				name: 'Prefix',
				meta: {
					interface: 'input',
					options: {
						font: 'monospace',
					},
					width: 'half',
				},
			},
			{
				field: 'suffix',
				type: 'string',
				name: 'Suffix',
				meta: {
					interface: 'input',
					options: {
						font: 'monospace',
					},
					width: 'half',
				},
			},
		];
	},
	fields: (options) => {
		return [options.column];
	},
});
