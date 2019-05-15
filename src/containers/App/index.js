import React ,{Fragment} from 'react';
import Channel from "../../components/Channel/Channel";

const App = () => (
    <Fragment>

        <Channel/>
        {/*here we implement the route  types : public , private and restricted*/}
        {/*<Route path="/403" component={AsyncForbidden} />*/}
        {/*<Route path="/500" component={AsyncInternalServer} />*/}
        {/*<Route path="/404" component={AsyncNotFound} />*/}

    </Fragment>

);

export default App;



