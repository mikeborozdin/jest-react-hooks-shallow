import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import enableHooks from 'vitest-react-hooks-shallow';
import { vi, beforeAll } from 'vitest';

configure({ adapter: new Adapter() });

beforeAll(async () => {
 await enableHooks(vi);
});
