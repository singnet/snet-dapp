import React, { Component } from "react";

export default function asyncComponent(importComponent) {
    class AsyncComponent extends Component {
        state = {
            component: null,
        };

        async componentDidMount() {
            const { default: component } = await importComponent();
            this.setState({ component: component });
        }

        render() {
            const { component: ImportedComponent } = this.state;
            return ImportedComponent ? <ImportedComponent {...this.props} /> : null;
        }
    }

    return AsyncComponent;
}
