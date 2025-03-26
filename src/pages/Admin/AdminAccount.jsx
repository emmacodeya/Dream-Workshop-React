import React from 'react';
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Modal, Button } from "react-bootstrap";

const API_URL = import.meta.env.VITE_API_URL;
const MySwal = withReactContent(Swal);

const AdminAccount = () => {
  const [members, setMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [filterVerify, setFilterVerify] = useState("");
  const [selectedMember, setSelectedMember] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);   
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [projects, setProjects] = useState([]);
  const [investors, setInvestors] = useState([]);

 

      useEffect(() => {
        fetchMembers();
        fetchProjects();
        fetchInvestors();
      }, []);
      
      const fetchProjects = async () => {
        const res = await axios.get(`${API_URL}/projects`);
        setProjects(res.data);
      };
      
      const fetchInvestors = async () => {
        const res = await axios.get(`${API_URL}/investors`);
        setInvestors(res.data);
      };

      useEffect(() => {
        const filtered = members.filter((member) => {
          const searchMatch = `${member.useraccount}${member.name}${member.email}`
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
      
          const verifyStatus = member.identityVerification?.status || "";
      
          let verifyMatch = false;
      
          if (filterVerify === "" || filterVerify === "all") verifyMatch = true;
          if (filterVerify === "approved" && verifyStatus === "approved") verifyMatch = true;
          if (filterVerify === "pending" && verifyStatus === "pending") verifyMatch = true;
          if (filterVerify === "empty" && verifyStatus === "") verifyMatch = true;
      
          return searchMatch && verifyMatch;
        });
      
        setFilteredMembers(filtered);
      }, [searchTerm, filterVerify, members]);
      
  

  const fetchMembers = async () => {
    try {
      const res = await axios.get(`${API_URL}/members`);
      setMembers(res.data);
    } catch (err) {
      console.error("讀取會員失敗", err);
    }
  };

  const handleDelete = (id) => {
    MySwal.fire({
      title: "確定刪除這位會員？",
      text: "刪除後將無法恢復！",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "確認刪除",
      cancelButtonText: "取消",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${API_URL}/members/${id}`);
          fetchMembers();
          MySwal.fire("刪除成功!", "", "success");
        } catch (err) {
          console.error("刪除失敗", err);
          MySwal.fire("刪除失敗!", "請稍後再試", "error");
        }
      }
    });
  };
  const translateVerifyStatus = (status) => {
    if (status === "approved") return "審核成功";
    if (status === "pending") return "審核中";
    return "未提交審核";
  };

  const handleVerifyUpdate = async (status) => {
    try {
      await axios.patch(`${API_URL}/members/${selectedMember.id}`, {
        identityVerification: {
          ...selectedMember.identityVerification,
          status: status,
        },
      });
      MySwal.fire("更新成功", "", "success");
      fetchMembers(); 
      setShowVerifyModal(false);
    } catch (err) {
      console.error("更新失敗", err);
      MySwal.fire("更新失敗", "請稍後再試", "error");
    }
  };

  
  return (
    <div className="admin-account text-white">
      <h2 className="mb-4">會員管理</h2>

      <div className="d-flex mb-3">
        <input
          type="text"
          className="form-control me-2"
          placeholder="搜尋會員帳號 / 姓名 / 電子郵箱"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
         <select
          className="form-select me-2"
          value={filterVerify}
          onChange={(e) => setFilterVerify(e.target.value)}
        >
          <option value="" disabled hidden>審核狀態</option>
          <option value="all">全部</option>
          <option value="approved">已審核</option>
          <option value="pending">審核中</option>
          <option value="empty">未提交審核</option>
        </select>
      </div>

      <table className="table table-dark table-striped">
        <thead>
          <tr>
            <th>會員帳號</th>
            <th>姓名</th>
            <th>Email</th>
            <th>審核狀態</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {filteredMembers.length > 0 ? (
            filteredMembers.map((member) => (
              <tr key={member.id}>
                <td>{member.useraccount}</td>
                <td>{member.name}</td>
                <td>{member.email}</td>
                <td>
                  <button
                    className={`btn btn-sm 
                      ${translateVerifyStatus(member.identityVerification?.status) === "未提交審核" ? "btn-outline-gray-400" : ""}
                      ${translateVerifyStatus(member.identityVerification?.status) === "審核中" ? "btn-outline-primary-600" : ""}
                      ${translateVerifyStatus(member.identityVerification?.status) === "審核成功" ? "btn-outline-danger" : ""}`}
                    onClick={() => {
                      setSelectedMember(member);
                      setShowVerifyModal(true);
                    }}
                    disabled={translateVerifyStatus(member.identityVerification?.status) === "未提交審核"}
                  >
                    {translateVerifyStatus(member.identityVerification?.status)}
                  </button>
                </td>
                <td>
                  <button 
                    className="btn btn-outline-primary-600 btn-sm me-2" 
                    onClick={() => { setSelectedMember(member); setShowViewModal(true); }}
                  >
                    查看
                  </button>
                  <button className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(member.id)}>
                    刪除
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">找不到符合的會員</td>
            </tr>
          )}
        </tbody>
              </table>
   
          {/* 詳細資料 */}
          <Modal show={showViewModal} onHide={() => setShowViewModal(false)}  centered>
          <Modal.Header closeButton className="bg-primary-600">
            <Modal.Title className="fs-3 fw-bold">會員詳細資料</Modal.Title>
          </Modal.Header>
          <Modal.Body >
            {selectedMember && (
              <>
                <h4 className="fs-4 fw-bold mb-3">基本資訊</h4>
                <p className=" text-dark "><strong>會員帳號：</strong>{selectedMember.useraccount}</p>
                <p className=" text-dark "><strong>姓名：</strong>{selectedMember.name}</p>
                <p className=" text-dark "><strong>電子郵箱：</strong>{selectedMember.email}</p>
                <p className=" text-dark "><strong>性別：</strong>{selectedMember.gender}</p>
                <p className=" text-dark "><strong>聯絡電話：</strong>{selectedMember.mobile}</p>

                <hr />
                <h4 className="fs-4 fw-bold mb-3">查看權限</h4>

                <h5>創業項目</h5>
                <table className="table mb-6">
                  <thead>
                    <tr>
                      <th style={{ width: "100px" }}>項目</th>
                      <th style={{ width: "120px" }}>權限</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects.filter(project => project.useraccount === selectedMember.useraccount).map(project => (
                      <tr key={project.id}>
                        <td>{project.name}</td>
                        <td>
                          <input type="checkbox" disabled /> 合作聯繫
                          <input type="checkbox" className="ms-2" disabled /> 內容解鎖
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <h5 >投資人</h5>
                <table className="table">
                  <thead>
                    <tr>
                      <th style={{ width: "100px" }}>投資人</th>
                      <th style={{ width: "120px" }}>權限</th>
                    </tr>
                  </thead>
                  <tbody>
                    {investors.filter(investor => investor.useraccount === selectedMember.useraccount).map(investor => (
                      <tr key={investor.id}>
                        <td>{investor.name}</td>
                        <td>
                          <input type="checkbox" disabled /> 合作聯繫
                          <input type="checkbox" className="ms-2" disabled /> 內容解鎖
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button className="rounded" variant="secondary" onClick={() => setShowViewModal(false)}>關閉</Button>
          </Modal.Footer>
        </Modal>

        {/* 會員審核        */}
        <Modal show={showVerifyModal} onHide={() => setShowVerifyModal(false)}  centered>
          <Modal.Header closeButton className="bg-primary-600">
            <Modal.Title className="fw-bold text-gray-800 fs-3">會員審核</Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-dark text-center">
            {selectedMember && (
              <>
                <p className="text-gray-800 mb-3">
                  <strong>目前審核狀態：</strong>{translateVerifyStatus(selectedMember.identityVerification?.status)}
                </p>

                <div className="mb-3">
                  <h6 className="fw-bold text-gray-800 mb-3">身分證圖片</h6>
                  <div className=" gap-3 ">
                    <div>
                      <p className="mb-1 text-dark">正面</p>
                      <img  className="mb-2" src={selectedMember.identityVerification?.frontId} alt="身分證正面" style={{ width: "300px", border: "1px solid #ccc" }} />
                    </div>
                    <div>
                      <p className="mb-1 text-dark">反面</p>
                      <img  className="mb-2" src={selectedMember.identityVerification?.backId} alt="身分證反面" style={{ width: "300px", border: "1px solid #ccc" }} />
                    </div>
                    <div>
                      <p className="mb-1 text-dark">第二證件</p>
                      <img  src={selectedMember.identityVerification?.secondId} alt="第二證件" style={{ width: "300px", border: "1px solid #ccc" }} />
                    </div>
                  </div>
                </div>
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button className="btn btn-primary-600 rounded me-2" onClick={() => handleVerifyUpdate("approved")}>通過審核</Button>
            <Button className="btn btn-secondary rounded" onClick={() => handleVerifyUpdate("rejected")}>未通過</Button>
          </Modal.Footer>
        </Modal>



    </div>
  );
};

export default AdminAccount;
