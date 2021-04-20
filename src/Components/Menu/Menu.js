import React from 'react';
import {useDispatch} from "react-redux";
import {menuClicked} from "../../actions";

import './menu.css'

const Menu = () => {
    let dispatch = useDispatch();
    return (
        <div className={'grid-container p-0'} >



            <div className={'grid-container p-0'} id={'menuSection'}>
                <div className={'row p-0 mb-3 d-block'} id = "menuSectionTitle">Login Information</div>
                <div className={'row p-0'}>
                    <div className={'border'} id = 'loginInfo'>Admin</div>
                </div>
                <div className={'row p-0'}>
                    <div className={'border'}  id = 'loginInfo'>Admin</div>
                </div>
            </div>



            <div className={'grid-container'} id={'menuSection'}>
            <div className={'row p-0 mb-3 d-block'} id = "menuSectionTitle">User Management</div>
            <div className={'row p-0'}>
                <button className={'btn btn-success border'} onClick={(event)=>{dispatch(menuClicked(event.target.value))}} id = 'btn1' value={'form'}>User Creation</button>
            </div>
            <div className={'row p-0'}>
                <button className={'btn btn-success border'} onClick={(event)=>{dispatch(menuClicked(event.target.value))}} id = 'btn2' value={'userList'} id ='btn2'>User List</button>
            </div>
            <div className={'row p-0'}>
                <button className={'btn btn-success border'} onClick={(event)=>{dispatch(menuClicked(event.target.value))}} id = 'btn1' value={'idCard'} id ='btn2'>Generate ID</button>
            </div>
            </div>



        </div>
    );
};

export default Menu;