import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import enableHooks from 'vitest-react-hooks-shallow';

configure({ adapter: new Adapter() });

enableHooks(vi, { dontMockByDefault: true });
