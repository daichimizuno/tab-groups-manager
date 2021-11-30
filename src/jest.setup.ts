import { configure } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import "@testing-library/jest-dom";
Object.assign(global, require("jest-chrome"));
configure({ adapter: new EnzymeAdapter() });
