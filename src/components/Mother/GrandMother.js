import React from "react";
import {FamilyConsumer, FamilyProvider} from "./FamilyContext";

export class GrandMother extends React.Component {
    state = {
        lastName: "Aryal"
    };

    render() {
        return (
            <FamilyProvider value={this.state.lastName}>
                <Mother/>
            </FamilyProvider>
        );
    }
}

const Mother = () => {
    return <Child/>;
};

const Child = () => {
    return <FamilyConsumer>
            {object => <p>{object}</p>}
    </FamilyConsumer>
}