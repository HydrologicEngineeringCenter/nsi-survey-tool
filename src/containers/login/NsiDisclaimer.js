import React, { useState } from 'react';
import { connect } from 'redux-bundler-react';

function USGDisclaimer(props) {

  const { doAuthKeycloakAuthenticate } = props;
  const [showLogin, setShowLogin] = useState(false);

  const handleLoginClickKC = () => {
    doAuthKeycloakAuthenticate();
    setShowLogin(true);
  };

  const renderDisclaimer = function() {
    return (
      <React.Fragment>
        <div>
          You are accessing a U.S. Government (USG) Information System (IS) that is provided for USG-authorized use only.
          <p>
            By using this IS (which includes any device attached to this IS), you consent to the following conditions:
          </p>
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
        </div>

        <div className="modal-footer">
          <button type="button" className="btn btn-secondary lg-btn-secondary" onClick={handleLoginClickKC}>I Agree</button>
        </div>
      </React.Fragment>
    )
  }

  const renderLogin = function() {
    return (
      <React.Fragment>
        <center>
          <div>
            Logging into the NSI Survey Server
          </div>
          <div style={{ "height": "20px" }} />
          <div>
            <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
          </div>
        </center>
      </React.Fragment>
    )
  }

  return (
    <div className="disclaimer">
      {showLogin ? renderLogin() : renderDisclaimer()}
    </div>
  )
}

export default connect(
  'doAuthKeycloakAuthenticate',
  USGDisclaimer
);
