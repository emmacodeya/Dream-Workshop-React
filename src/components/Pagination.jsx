import PropTypes from "prop-types";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <nav>
      <ul className="pagination justify-content-center pt-3">
      <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
        <button className="page-link bg-transparent text-white border-0" onClick={handlePrev}>
          <img src="https://dream-workshop-api.onrender.com/assets/images/icons/outline-chevron-left.png" alt="上一頁" width="24" height="24" />
        </button>
      </li>

        {Array.from({ length: totalPages }, (_, i) => (
          <li key={i + 1} className={`page-item  ${currentPage === i + 1 ? "active" : ""}`}>
            <button className="page-link   bg-transparent border-0" onClick={() => onPageChange(i + 1)}>
              {i + 1}
            </button>
          </li>
        ))}
        <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
          <button className="page-link bg-transparent text-white border-0" onClick={handleNext}>
            <img src="https://dream-workshop-api.onrender.com/assets/images/icons/baseline-chevron-right.png" alt="下一頁" width="24" height="24" />
          </button>
        </li>

      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
