import React from 'react';
function USGDisclaimer(){
    /*const[showDisclaimer,setShowDisclaimer] = useState(true);
    const handleClose=()=>{
        setShowDisclaimer(false);
    } */
    return(
        <div className='modal' role='dialog' id="myModal">
            <div className="modal-dialog" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">US Government Disclaimer</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                You are accessing a U.S. Government (USG) Information System (IS) that is provided for USG-authorized use only.
                    <p>
                    By using this IS (which includes any device attached to this IS), you consent to the following conditions:
                    <ul>
                        <li>
                            The USG routinely intercepts and monitors communications on this IS for purposes including, but not limited to, penetration testing, COMSEC monitoring, network operations and defense, personnel misconduct (PM), law enforcement (LE), and counterintelligence (CI) investigations.
                        </li>
                        <li>
                            At any time, the USG may inspect and seize data stored on this IS.
                        </li>
                        <li>
                            Communications using, or data stored on, this IS are not private, are subject to routine monitoring, interception, and search, and may be disclosed or used for any USG-authorized purpose.
                        </li>
                        <li>
                            This IS includes security measures (e.g., authentication and access controls) to protect USG interests—not for your personal benefit or privacy.
                        </li>
                        <li>
                            Notwithstanding the above, using this IS does not constitute consent to PM, LE or CI investigative searching or monitoring of the content of privileged communications, or work product, related to personal representation or services by attorneys, psychotherapists, or clergy, and their assistants. Such communications and work product are private and confidential. See User Agreement for details.
                        </li>
                    </ul>
                </p>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal"><a href="/main">I Agree</a></button>
            </div>
            </div>
            </div>
</div>
    )
}

export default USGDisclaimer