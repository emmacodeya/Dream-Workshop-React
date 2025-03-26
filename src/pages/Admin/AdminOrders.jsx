/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Modal, Button } from "react-bootstrap";

const AdminOrders = () => {

    const [orderData, setOrderData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        paymentMethod: (["credit","convenience_store","ATM"]),
      });
      
    return (
        <div className="admin-account text-white">
            <div className="d-flex mb-3 mt-4">
               <button type='button' className='btn btn-primary-600'>新增點數方案</button>
            </div>


            <table className="table table-dark table-striped">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>點數</th>
                    <th>價格</th>
                    <th>狀態</th>
                    <th></th>
                </tr>
            </thead>

            <tbody>
                <tr>
                    <td>1</td>
                    <td>100</td>
                    <td>100</td>
                    <td>啟用</td>
                    <td>
                        <button type="button" className='btn btn-outline-primary-600 btn-sm me-2'>編輯</button>
                        <button type="button" className="btn btn-outline-danger btn-sm">刪除</button>
                    </td>
                </tr>
            </tbody>
        </table>

        </div>
    )
}

export default AdminOrders;