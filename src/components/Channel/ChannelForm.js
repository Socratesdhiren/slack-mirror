import React, {Component} from "react";


class ChannelForm extends Component {
    state = {};
    onSubmit = (e) => {
        let {channelName} = this.state;

        this.setState({
            channelName: ''
        });
        this.props.addChannel(channelName);
        e.preventDefault();
        console.log(channelName);
    };
    onChange = (e) => {
        this.setState({
            channelName: e.target.value
        });
    };

    render() {

        return (
                <form onSubmit={this.onSubmit}>
                    <div className='form-group'>
                        <input className="form-control" placeholder="Add Channel" type='text' onChange={this.onChange} value={this.state.channelName}/>

                    </div>
                </form>
        )
    }

}


export default ChannelForm;