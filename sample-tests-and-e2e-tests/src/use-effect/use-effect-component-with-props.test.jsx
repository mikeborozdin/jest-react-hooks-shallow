
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
    let wrapper;

    const originalString = "A String"
    const originalArray = ["An", "Array", "Of", "Strings"]

    beforeEach(() => {
        expensiveOperation1.mockClear();
        expensiveOperation2.mockClear();
        expensiveOperation3.mockClear();
        expensiveOperation4.mockClear();

        wrapper = shallow(<ComponentWithProps strProp={originalString} arrProp={originalArray}/>);
    })

    it("Should create and call all the expensive operations", () => {
        expect(expensiveOperation1).toHaveBeenCalledTimes(1);
        expect(expensiveOperation2).toHaveBeenCalledTimes(1);
        expect(expensiveOperation3).toHaveBeenCalledTimes(1);
        expect(expensiveOperation4).toHaveBeenCalledTimes(1);
    })

    it('Should only re-run the effect with no dependencies on re-render due to button click', () => {
        wrapper.find('button').simulate('click');

        expect(expensiveOperation1).toBeCalledTimes(2);
        expect(expensiveOperation2).toBeCalledTimes(1);
        expect(expensiveOperation3).toBeCalledTimes(1);
        expect(expensiveOperation4).toBeCalledTimes(1);
    });

    it('Should only re-run the effect with no deps on re-render due to prop change', () => {
        wrapper.setProps({strProp: originalString, arrProp: originalArray});

        expect(expensiveOperation1).toBeCalledTimes(2);
        expect(expensiveOperation2).toBeCalledTimes(1);
        expect(expensiveOperation3).toBeCalledTimes(1);
        expect(expensiveOperation4).toBeCalledTimes(1);
    })

    it('Should re-run the effect with no deps, and string prop deps on string prop change', () => {
        wrapper.setProps({strProp: "A New String", arrProp: originalArray});

        expect(expensiveOperation1).toBeCalledTimes(2);
        expect(expensiveOperation2).toBeCalledTimes(2);
        expect(expensiveOperation3).toBeCalledTimes(1);
        expect(expensiveOperation4).toBeCalledTimes(2);
    })

    it("Should re-run the effect with no deps, and array prop deps on array prop change", () => {
        wrapper.setProps({strProp: originalString, arrProp: ["A", "New", "Array"]});

        expect(expensiveOperation1).toBeCalledTimes(2);
        expect(expensiveOperation2).toBeCalledTimes(1);
        expect(expensiveOperation3).toBeCalledTimes(2);
        expect(expensiveOperation4).toBeCalledTimes(2);
    })

    it("Should re-run all effects if both string and array props change, effect with two deps should only re-run once", () => {
        wrapper.setProps({strProp: "A New String", arrProp: ["A", "New", "Array"]});

        expect(expensiveOperation1).toBeCalledTimes(2);
        expect(expensiveOperation2).toBeCalledTimes(2);
        expect(expensiveOperation3).toBeCalledTimes(2);
        expect(expensiveOperation4).toBeCalledTimes(2);
    })
})
