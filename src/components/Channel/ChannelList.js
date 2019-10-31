import React, {Component} from "react";
import Channel from "./Channel";

// const Family =(props)=> {
//     <div className="family">
//       <Unsupported/>
//     </div>
//
// }
class ChannelList extends Component {

    onClick = () => {

        console.log("herea i am ");
        // e.preventDefault();
        // const {setChannel,channel } = this.props;
        // setChannel(channel);
    }

    render() {
        const channels =this.props.channels;
        console.log(channels);
        return (
            <ul>
                {channels && channels.map( (channel,index) => {
                    return(
                        <div key={index}>
                        <Channel key = {channel.id} name = {channel.name}/>
                        </div>

                    )
                })

                }


            </ul>

        )
    }

}
export default ChannelList;