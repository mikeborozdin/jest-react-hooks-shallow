
import React from 'react'
import { shallow } from 'enzyme';
import { act } from 'react-dom/test-utils';

import { expensiveOperation1, expensiveOperation2, expensiveOperation3, expensiveOperation4 } from './expensiveOperations'

import ComponentWithProps from './use-effect-component-with-props'

jest.mock('./expensiveOperations', () => ({
    expensiveOperation1: jest.fn(),
    expensiveOperation2: jest.fn(),
    expensiveOperation3: jest.fn(),
    expensiveOperation4: jest.fn(),
}))

describe('Component with props', () => {
    const originalString = "A String"
    const originalArray = ["An", "Array", "Of", "Strings"]

    let wrapper = shallow(<ComponentWithProps strProp={originalString} arrProp={originalArray}/>);

    beforeEach(() => {
        expensiveOperation1.mockClear();
        expensiveOperation2.mockClear();
        expensiveOperation3.mockClear();
        expensiveOperation4.mockClear();

        wrapper = shallow(<ComponentWithProps strProp={originalString} arrProp={originalArray}/>);
    })

    it("Should create and call expensive operation 1", () => {
        expect(expensiveOperation1).toHaveBeenCalledTimes(1);
    })

    it("Should create and call expensive operation 2", () => {
        expect(expensiveOperation2).toHaveBeenCalledTimes(1);
    })

    it("Should create and call expensive operation 3", () => {
        expect(expensiveOperation3).toHaveBeenCalledTimes(1);
    })

    it("Should create and call expensive operation 4", () => {
        expect(expensiveOperation4).toHaveBeenCalledTimes(1);
    })

    it("Should render a button", () => {
        expect(wrapper.find('button').length).toBe(1);
    })

    it('Should render a button containing "Not Clicked"', () => {
        expect(wrapper.find('button').text()).toBe("Not Clicked");
    })

    it('Should update the text when the button is clicked', () => {
        act(() => { wrapper.find('button').simulate('click'); });

        expect(wrapper.find('button').text()).toBe("Clicked");
    })

    it('Should rerun the effect with no deps on re-render', () => {
        act(() => { wrapper.find('button').simulate('click'); });

        expect(expensiveOperation1).toBeCalledTimes(2);
    })

    it('Should not rerun the effect with unchanged string dep on re-render', () => {
        act(() => { wrapper.find('button').simulate('click'); });

        expect(expensiveOperation2).toBeCalledTimes(1);
    })

    it('Should not rerun the effect with unchanged array dep on re-render', () => {
        act(() => { wrapper.find('button').simulate('click'); });

        expect(expensiveOperation3).toBeCalledTimes(1);
    })

    it('Should not rerun the effect with unchanged str/array deps on re-render', () => {
        act(() => { wrapper.find('button').simulate('click'); });

        expect(expensiveOperation4).toBeCalledTimes(1);
    })

    it('Should rerun the effect with no deps on re-render', () => {
        wrapper.setProps({strProp: originalString, arrProp: originalArray});
        wrapper.update();

        expect(expensiveOperation1).toBeCalledTimes(2);
    })

    it('Should rerun the effect with changed string dep', () => {
        wrapper.setProps({strProp: "A New String", arrProp: originalArray});
        wrapper.update();

        expect(expensiveOperation2).toBeCalledTimes(2);
    })

    it("Should not rerun the effect if the string didn't change", () => {
        wrapper.setProps({strProp: originalString, arrProp: ["A", "New", "Array"]});
        wrapper.update();

        expect(expensiveOperation2).toBeCalledTimes(1);
    })

    it("Should not rerun the effect if the string is the same", () => {
        wrapper.setProps({strProp: "A String", arrProp: ["A", "New", "Array"]});
        wrapper.update();

        expect(expensiveOperation2).toBeCalledTimes(1);
    })

    it('Should rerun the effect with changed array dep', () => {
        wrapper.setProps({strProp: originalString, arrProp: ["A", "New", "Array"]});
        wrapper.update();

        expect(expensiveOperation3).toBeCalledTimes(2);
    })

    it("Should not rerun the effect if the array didn't change", () => {
        wrapper.setProps({strProp: "A New Strring", arrProp: originalArray});
        wrapper.update();

        expect(expensiveOperation3).toBeCalledTimes(1);
    })

    it('Should rerun the effect with multiple deps with changed string dep', () => {
        wrapper.setProps({strProp: "A New String", arrProp: originalArray});
        wrapper.update();

        expect(expensiveOperation4).toBeCalledTimes(2);
    })

    it("Should rerun the effect with multiple deps with changed array dep", () => {
        wrapper.setProps({strProp: originalString, arrProp: ["A", "New", "Array"]});
        wrapper.update();

        expect(expensiveOperation4).toBeCalledTimes(2);
    })

    it("Should not rerun the effect with multiple deps if nothing changed", () => {
        wrapper.setProps({strProp: originalString, arrProp: originalArray});
        wrapper.update();

        expect(expensiveOperation4).toBeCalledTimes(1);
    })

    it("Should not rerun the effect with multiple deps for a string with the same value", () => {
        wrapper.setProps({strProp: "A String", arrProp: originalArray});
        wrapper.update();

        expect(expensiveOperation4).toBeCalledTimes(1);
    })
})