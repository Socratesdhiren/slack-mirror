import React, {useContext} from 'react';
import {FamilyContext} from './FamilyContext';


const GrandMotherUseContext = () => {
    return (
        <FamilyContext.Provider value="Aryal">
            <Mother/>
        </FamilyContext.Provider>

    )
}
export default GrandMotherUseContext();

const Mother = () => {

    return (


            <Child/>


    )

};

const Child = () => {
    const value = useContext(FamilyContext);
    console.log("last", value);
    return <p>{value}</p>
}
