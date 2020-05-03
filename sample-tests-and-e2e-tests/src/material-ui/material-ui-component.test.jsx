import React from 'react';
import { mount } from 'enzyme';
import MaterialUiComponent from './material-ui-component';
import { disableHooks } from 'jest-react-hooks-shallow';

describe('MaterialUiComponent', () => {
	it('Renders a component with Material-UI without errors', () => {
    disableHooks();

    expect(() => mount(<MaterialUiComponent />)).not.toThrow();
	});
});
