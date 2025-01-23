import { useState } from "react";
import toast from "react-hot-toast";
import SessionApprovalModal from "../Modal/SessionApprovalModal";


const SessionDataRow = ({sessionData, onApprove, onReject, onUpdate, onDelete}) => {
    const {
        _id,
        sessionTitle,
         tutorName, 
         tutorEmail,
         sessionDuration, 
         registrationStartDate, 
         registrationEndDate, 
         classStartDate,
         classEndDate, 
         registrationFee, 
         status, 
         sessionDescription
        } = sessionData || {}

    const [isOpen, setIsOpen] = useState(false);
    const [isPaid, setIsPaid] = useState(false);
    const [fee, setFee] = useState(0);

    const handleApproval = () => {
        if(isPaid && fee <= 0){
            toast.error('Please enter a valid fee amount')
            return;
        }
        onApprove(_id, isPaid? fee: 0);
        setIsOpen(false);
    }



    return (
       
            <tr>
                <td></td>
                <td>{sessionTitle}</td>
                <td>{tutorName}</td>
                <td>{tutorEmail}</td>
                <td>{sessionDuration}</td>
                <td>{registrationStartDate}</td>
                <td>{registrationEndDate}</td>
                <td>{classStartDate}</td>
                <td>{classEndDate}</td>
                <td>{registrationFee}</td>
                <td>{status}</td>
                <td>{sessionDescription}</td>
                <td className="flex gap-2">
                   { status === 'pending' && ( 
                    <>
                    <button className="btn btn-xs btn-accent " onClick={() => setIsOpen(true)}> 
                    Approve </button>
                    <SessionApprovalModal handleApproval={handleApproval} isOpen={isOpen} setIsOpen={setIsOpen} 
                    isPaid={isPaid} setIsPaid={setIsPaid} fee={fee} setFee={setFee}></SessionApprovalModal>
                    <button className="btn btn-xs btn-error text-white "  onClick={() => onReject(_id)}>
                    
                    Reject</button>
                    </>
                   )}
                   {status === 'approved' && (
                    <>
                      <button 
                        className="btn btn-xs btn-outline btn-info"
                         onClick={() => onUpdate(_id)}>
                            Update
                      </button>
                      <button
                       className="btn btn-xs btn-outline btn-error"
                        onClick={() => onDelete(_id)}>
                            Delete
                      </button>
                    </>
                   )}
                </td>
            </tr>
       
    );
};

export default SessionDataRow;