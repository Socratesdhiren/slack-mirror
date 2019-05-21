import React, {Component} from "react";
import ChannelList from "./ChannelList";
import ChannelForm from "./ChannelForm";

import './index.css';

class ChannelSection extends Component {

    render() {

        return (
            <div className='support panel panel-primary'>
                <div className='panel-heading'>
                    <strong>Channels</strong>
                </div>
                <div className='panel-body-channels'>
                    <ChannelList {...this.props}/>
                    <ChannelForm {...this.props} />
                </div>

            </div>
        )
    }

}

export default ChannelSection;