import React, {Component, Fragment} from 'react';
import ChannelSection from "../../components/Channel/ChannelSection";
import LoginForm from "../../components/Auth/loginForm";

class App extends Component {


    state = {
        channels: [
            {name: 'City-Remit'},
            {name: 'ABR'},
        ]
    };

    addChannel = (name) => {
        let {channels} = this.state;
        channels.push({
            id: channels.length,
            name: name
        });
        this.setState({
            chaneels: channels
            //TODO : sent to a server
        })
    };

    setChannel = (activeChannel) => {
        this.setState({activeChannel});
        // here we get the channel Message
    };

    render() {
        return (
            <Fragment>
                <div className='app'>
                    <div className='nav'>
                        {/*<ChannelSection*/}
                            {/*{...this.state}*/}
                            {/*addChannel={this.addChannel}*/}
                            {/*setChannel={this.setChannel}/>*/}
                        <LoginForm/>
                    </div>

                </div>

            </Fragment>

        )
    }

}

export default App;



