import React, {Component} from "react";


class Channel extends Component {

    onClick = () => {
        console.log("herea i am ", this.props.name);
        // e.preventDefault();
        // const {setChannel,channel } = this.props;
        // setChannel(channel);
    };

    render() {
        const { channel, activeChannel} = this.props;
        console.log('prop',this.props);
        const active = channel === activeChannel ? 'active' :  '';
        return (
            <li className={active}>
                <a onClick={this.onClick}>
                    {this.props.name}
                </a>
               </li>

        )
    }

}

export default Channel;