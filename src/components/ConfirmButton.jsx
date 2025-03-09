import { useState } from "react";
import PropTypes from "prop-types";

const ConfirmButton = ({ onConfirm, children, className = "btn btn-primary-600 fw-bolder ms-3 px-9" }) => {
  const [showModal, setShowModal] = useState(false);

  const handleConfirm = () => {
    setShowModal(false);
    if (onConfirm) {
      onConfirm(); 
    }
  };

  return (
    <>
      {/* 主要按鈕 */}
      <button onClick={() => setShowModal(true)} className={className}>
        {children || "儲存變更"}
      </button>

      {/*  Modal */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content bg-dark text-center p-4">
              <button type="button" className="btn-close position-absolute end-0 m-3" onClick={() => setShowModal(false)}></button>
              <h3 className="text-primary-400 fw-bold mt-4">儲存成功</h3>
              <div className="mt-3">
                <button onClick={handleConfirm} className="btn btn-success px-5 py-2">
                  確認
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

ConfirmButton.propTypes = {
  onConfirm: PropTypes.func.isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
};

export default ConfirmButton;
