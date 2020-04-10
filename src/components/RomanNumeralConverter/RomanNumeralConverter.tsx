import * as React from "react";
import axios, { AxiosResponse } from "axios";
import config from "../../../config";

export default class RomanNumeralConverter extends React.Component<object, { toFromToggle: boolean }> {

    state: React.ComponentState = {
        toFromToggle: true,
        inputValue: "",
        convertedValue: ""
    };

    private toggleConversion() {

        this.setState(state => ({
            ...state,
            toFromToggle: !state.toFromToggle,
            inputValue: "",
            convertedValue: ""
        }));
    }

    private handleInputChange(event: any) {

        event.persist();

        this.setState(state => ({
            ...state,
            inputValue: event.target.value
        }));
    }

    private convertInput() {

        const from = this.state.toFromToggle ? "roman" : "arabic";
        const inputValue = this.state.inputValue;

        axios.get(config.romanNumeralService.apiEndpoint + "/" + from + "/" + inputValue)
            .then((response: AxiosResponse) => {

                this.setState(state => ({
                    ...state,
                    convertedValue: response.data.convertedValue.toString()
                }));
            },
            (error) => {
                console.error(error);
            });
    }

    public render() {

        return (
            <div>
                <input name="inputValue" value={this.state.inputValue} onChange={this.handleInputChange.bind(this)} />
                <button className="convert" onClick={this.convertInput.bind(this)}>
                    Convert
                </button>
                <button className="conversion-toggle" onClick={this.toggleConversion.bind(this)}>
                    {this.state.toFromToggle ? "Roman" : "Arabic"}
                </button>
                <p>
                    Converts {this.state.toFromToggle ? "Roman" : "Arabic"} {!this.state.inputValue.length ? "_" : this.state.inputValue} to {this.state.toFromToggle ?  "Arabic" : "Roman"} {!this.state.convertedValue.length ? "_" : this.state.convertedValue}
                </p>
            </div>
        );
    }

}