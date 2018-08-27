import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
require('stacktrace-parser');

// React 16 Enzyme adapter
configure({ adapter: new Adapter() });
