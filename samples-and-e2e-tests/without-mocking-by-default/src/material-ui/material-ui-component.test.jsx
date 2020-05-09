import React from 'react';
import { mount } from 'enzyme';
import MaterialUiComponent from './material-ui-component';

describe('MaterialUiComponent', () => {
	test('Renders a component with Material-UI without errors', () => {
    expect(() => mount(<MaterialUiComponent />)).not.toThrow();
	});
});
