import React, {Component} from "react";

// const Family =(props)=> {
//     <div className="family">
//       <Unsupported/>
//     </div>
//
// }
class Channel extends Component {
    onClick(e) {
        e.preventDefault();
        // const {setChannel,channel } = this.props;
        // setChannel(channel);
    }

    render() {
        const {channel} = this.props;
        return (
            <div className="channnl" >

                <p> Here I am in the channel</p>
                <li>
                    <a onClick={this.onClick.bind(this)}>
                        <p>Here I am .....</p>
                    </a>
                </li>

            </div>


        )
    }

}

//
// Channel.propTypes = {
//     channel: React.PropTypes.object.isRequired,
//     setChannel: React.PropTypes.func.isRequired
// }

export default Channel;