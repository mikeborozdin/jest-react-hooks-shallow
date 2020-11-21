import React from 'react';
import { mount } from 'enzyme';
import MaterialUiComponent from './material-ui-component';
import { disableHooks,withoutHooks } from 'jest-react-hooks-shallow';

describe('MaterialUiComponent', () => {
  test('Renders a component with Material-UI without errors when using withoutHooks', () => {
    withoutHooks(() => {
      expect(() => mount(<MaterialUiComponent />)).not.toThrow();
    });
	});

	test('Renders a component with Material-UI without errors when using disableHooks', () => {
    disableHooks();

    expect(() => mount(<MaterialUiComponent />)).not.toThrow();
	});
});
