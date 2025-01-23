


const SessionApprovalModal = ({handleApproval, 
    isOpen, setIsOpen, isPaid, setIsPaid, fee, setFee}) => {

    return (
        <div>
            {
                isOpen && (
                <div className="modal modal-open">
                    <div className="modal-box">
                      <p className="py-4 text-xl font-medium">
                        Is this session free or paid? Specify the amount if it's paid. 
                      </p>
                      <div className="form-control">
                        <label className="label cursor-pointer">
                            <span className="label-text font-medium">Free</span>
                            <input type="radio" name="sessionType" 
                            className="radio" onChange={() => {
                                setIsPaid(false);
                                setFee(0);
                            }} />
                        </label>
                        <label className="label cursor-pointer">
                            <span className="label-text font-medium">Paid</span>
                                <input type="radio"
                                name="sessionType" className="radio"
                                onChange={()=> setIsPaid(true)}
                                />
                        </label>
                        {
                            isPaid && (
                                <input type="number" className="input input-bordered mt-4"
                                placeholder="Enter fee amount" 
                                onChange={(e) => setFee(Number(e.target.value))} />
                            )}

                      </div>
                      <div className="modal-action">
                        <button className="btn btn-xs btn-accent " onClick={handleApproval}>
                            Approve
                        </button>
                        <button className="btn btn-xs btn-error text-white "
                        onClick={() => setIsOpen(false)}>
                            Cancel
                        </button>

                      </div>

                    </div>

                </div>

            )}
            
        </div>
    );
};

export default SessionApprovalModal;