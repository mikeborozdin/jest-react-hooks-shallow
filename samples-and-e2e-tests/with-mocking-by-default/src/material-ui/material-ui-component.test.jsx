import React from 'react';
import { mount } from 'enzyme';
import { withoutHooks } from 'vitest-react-hooks-shallow';
import { describe, test, expect } from 'vitest';

import MaterialUiComponent from './material-ui-component';

describe('MaterialUiComponent', () => {
  test('Renders a component with Material-UI without errors when using withoutHooks', async () => {
    await withoutHooks(() => {
      expect(() => mount(<MaterialUiComponent />)).not.toThrow();
    });
	});

});
