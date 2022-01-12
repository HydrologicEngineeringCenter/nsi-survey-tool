import Modal from "../components/UI/Modal"
import FunctionTitle from "../components/UI/FunctionTitle"
import AllSurveyList from "./form-components/AllSurveyList"

const ManageAllSurveyPrompt = (props) => {

  return (
    <Modal onClose={props.onClose}>
      <div className="modal-header">
        <FunctionTitle>Manage All Surveys</FunctionTitle>
      </div>

      <div className="modal-body">
        <AllSurveyList />
      </div>
    </Modal>
  )
}

export default ManageAllSurveyPrompt
