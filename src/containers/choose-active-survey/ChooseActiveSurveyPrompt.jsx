import Modal from "../components/UI/Modal"
import FunctionTitle from "../components/UI/FunctionTitle"
import ActiveSurveyList from "./form-components/ActiveSurveys"

const ActiveSurveyPrompt = (props) => {

  return (
    <Modal onClose={props.onClose}>
      <div className="modal-header">
        <FunctionTitle>Choose Active Survey</FunctionTitle>
      </div>

      <div className="modal-body">
        <ActiveSurveyList />
      </div>
    </Modal>
  )
}

export default ActiveSurveyPrompt
