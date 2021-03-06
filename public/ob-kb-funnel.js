// Include the angular controller
import './ob-kb-funnel.css';
import './funnelController';

import optionsTemplate from 'plugins/ob-kb-funnel/funnelEditor.html';
import template from 'plugins/ob-kb-funnel/ob-kb-funnel.html';

import { CATEGORY } from 'ui/vis/vis_category';
import { VisFactoryProvider } from 'ui/vis/vis_factory';
import { VisSchemasProvider } from 'ui/vis/editors/default/schemas';
import { VisTypesRegistryProvider } from 'ui/registry/vis_types';

VisTypesRegistryProvider.register(FunnelProvider);

// The provider function, which must return our new visualization type
function FunnelProvider(Private) {
	const VisFactory = Private(VisFactoryProvider);
	const Schemas = Private(VisSchemasProvider);

	// Describe our visualization
	return VisFactory.createAngularVisualization({
		name: 'obFunnel', // The internal id of the visualization (must be unique)
		title: 'Funnel View', // The title of the visualization, shown to the user
		icon: 'fa-toggle-down', // The font awesome icon of this visualization
		description: 'Funnel visualization', // The description of this vis
		category: CATEGORY.OTHER,
		visConfig: {
			template: template,
			defaults: {
				sumOption: "byBuckets",
				absolute: true,
				percent: false,
				percentFromTop: false,
				percentFromAbove: false,
				funnelOptions : "\
{\n\
  \"block\": { \n\
    \"dynamicHeight\": true,\n\
    \"minHeight\": 30,\n\
    \"highlight\": true\n\
  },\n\
  \"chart\": {\n\
    \"curve\": {\n\
      \"enabled\": true\n\
    }\n\
  }\n\
}"
			}
		},	
		responseHandler: 'none',
		editorConfig:	{
			optionsTemplate: optionsTemplate,
			// Define the aggregation your visualization accepts
			schemas: new Schemas([
				{
					group: 'metrics',
					name: 'tagsize',
					title: 'Value',
					min: 1,
					max: 1,
					aggFilter: ['count', 'avg', 'sum', 'min', 'max', 'cardinality', 'std_dev']
				},
				{
					group: 'buckets',
					name: 'tags',
					title: 'Aggregation',
					min: 1,
					max: 1,
					aggFilter: '!geohash_grid'
				}
			]),
		},
	
	});
}

export default FunnelProvider;
