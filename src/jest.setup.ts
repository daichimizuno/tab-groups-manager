import { configure } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
Object.assign(global, require('jest-chrome'))
configure({ adapter: new EnzymeAdapter() });
