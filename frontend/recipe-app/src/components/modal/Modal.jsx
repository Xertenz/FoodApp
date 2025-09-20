import "./Modal.css";

export default function Modal({ onClose, children }) {
  return (
    <div className="backdrop">
      <div className="modal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content h-100 rounded-0">
            <div className="modal-header">
              <button
                onClick={onClose}
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
							{children}
            </div>
            <div className="modal-footer">
              <button
                onClick={onClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
