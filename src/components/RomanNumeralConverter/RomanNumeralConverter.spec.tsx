import * as React from "react";
import {shallow} from "enzyme";
import axios, {AxiosResponse} from "axios";
import RomanNumeralConverter from "./RomanNumeralConverter";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("RomanNumeralConverter", () => {

    it("should display conversion text", () => {

        const wrapper = shallow(<RomanNumeralConverter />);
        const text = wrapper.find("p").text();

        expect(text).toEqual("Converts Roman _ to Arabic _");

    });

    it("should toggle conversion between roman numerals and arabic numbers", () => {

        const wrapper = shallow(<RomanNumeralConverter />);

        expect(wrapper.find("button.conversion-toggle").text()).toEqual("Roman");

        const toggle = wrapper.find("button.conversion-toggle");
        toggle.simulate("click");

        expect(wrapper.find("button.conversion-toggle").text()).toEqual("Arabic");

    });

    it("should reset converted text value on change of input value", () => {

        const wrapper = shallow(<RomanNumeralConverter />);
        const input = wrapper.find("input");

        input.simulate("change", { persist: () => {}, target: { value: "V" } });

        expect(wrapper.find("p").text()).toEqual("Converts Roman V to Arabic _");

        input.simulate("change", { persist: () => {}, target: { value: "" } });

        expect(wrapper.find("p").text()).toEqual("Converts Roman _ to Arabic _");

    });

    it.only("should reset conversion text on to/from roman toggle", async () => {

        const mockResponse: AxiosResponse = {
            data: { convertedValue: 5 },
            status: 200,
            statusText: "OK",
            config: {},
            headers: {},
        };

        mockedAxios.get.mockResolvedValue(mockResponse);

        const wrapper = shallow(<RomanNumeralConverter />);
        const toggle = wrapper.find("button.conversion-toggle");
        const input = wrapper.find("input");
        const convertBtn = wrapper.find("button.convert");

        input.simulate("change", { persist: () => {}, target: { value: "V" } });
        await convertBtn.simulate("click");

        expect(wrapper.find("p").text()).toEqual("Converts Roman V to Arabic 5");

        toggle.simulate("click");

        expect(wrapper.find("p").text()).toEqual("Converts Arabic _ to Roman _");

    });

});