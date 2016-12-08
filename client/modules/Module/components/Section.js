import React, { Component, PropTypes } from 'react';
import { PageHeader, Panel, Button } from 'react-bootstrap';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import validator from 'validator';
import QuizPanel from '../../Quiz/components/QuizPanel';
import QuizCreateModal from '../../Quiz/components/QuizCreateModal';
import SectionCreateModal from './SectionCreateModal';
import { getTokenPayload } from '../../../util/authStorage';
import { show } from '../../../util/styles';
import { deleteSectionRequest } from '../SectionActions'

import styles from './ModuleList.css';
import { addQuizRequest, editQuizRequest } from '../../Quiz/QuizActions';

export class Section extends Component {

  constructor(props){
    super(props);
    this.state = { showEditModal: false, editingQuiz: {} };
  }

  checkMultimediaFileType = (link) => {
    if(validator.contains(link, ".webm") || validator.contains(link, ".mp4") || validator.contains(link, ".ogg"))
      return "video";
    if(validator.contains(link, ".jpg") || validator.contains(link, ".jpeg") || validator.contains(link, ".gif"))
      return "image";
    if(validator.contains(link, "youtube.com") || validator.contains(link, "youtu.be"))
      return "youtube";
    else
      return "error";
  };

  renderMultimediaFileType = (type, section) => {
    if (type === "video") {
      return(
        <video width="640"  controls>
          <source src={section.link} type="video/webm" />
        </video>
      );
    }else if (type === "image"){
      return( <img src={section.link} width="480" /> );
    } else if (type === "youtube") {
      //Parse 3 types of links. v=id, embed/id and tu.be/id
      var re = /(v=|embed\/|tu.be\/)(\w+)/g;
      var v = re.exec(section.link);
      var link = "https://www.youtube.com/embed/";
      link += v[2];
      return (<iframe width="560" height="315"
                      src={link}
                      frameBorder="0" allowFullScreen></iframe> );
    } else {
      return ( <div> Filetype not supported!</div> );
    }
  };
  
  startEditingQuiz = quiz => {
      this.setState({ editingQuiz: quiz, showEditModal: true });
  };

  startCreatingQuiz = () => this.startEditingQuiz({
      question: '',
      options: [{text: '', answer: false}]
  });

  saveQuiz = quiz => {
    const isNewQuiz = !this.state.editingQuiz.cuid;
    if(isNewQuiz){
        this.addQuiz(quiz);
    }else{
        this.updateQuiz(quiz);
    }
  };

  updateQuiz = quiz => {
    quiz.cuid = this.state.editingQuiz.cuid;
    editQuizRequest(quiz).then(() => {
        const oldQuiz = this.state.editingQuiz;
        if(oldQuiz){
            oldQuiz.question = quiz.question;
            oldQuiz.options = quiz.options;
        }
        this.setState({ showEditModal: false });
      });
  };

  addQuiz = quiz => {
    quiz.sectionCuid = this.props.section.cuid;
    addQuizRequest(quiz).then(savedQuiz => {
        this.props.section.quizzes.push(savedQuiz); 
        this.setState({ showEditModal: false });
    });
  };

  deleteQuiz = (quiz) => {
    this.props.section.quizzes = this.props.section.quizzes.filter(qu => qu.cuid !== quiz.cuid);
    this.setState({});
  };
  
  cancelEdit = () => this.setState({ showEditModal: false });
  

  render(){
    var section = this.props.section;
    const token = getTokenPayload();

    return (
      <div>
        <div className={styles.textarea}>{section.content ? section.content : ''}</div>
        {section.link ? this.renderMultimediaFileType(this.checkMultimediaFileType(section.link), section) : ''}
        <div style={show(section.quizzes && section.quizzes.length > 0)}>
          <br />
          <QuizPanel quizzes={section.quizzes}
                deleteQuizRender={this.deleteQuiz} handleEditQuiz={this.startEditingQuiz} />
        </div>
        <div style={show(token && token.isAdmin)}>
          <Button onClick={this.startCreatingQuiz} bsStyle="primary">
                <FormattedMessage id='addQuiz' />
          </Button>
          <QuizCreateModal quiz={this.state.editingQuiz} cancel={this.cancelEdit} 
                  save={this.saveQuiz} show={this.state.showEditModal}/>
        </div>
      </div>
    );
  }
}

Section.propTypes = {
  section: PropTypes.shape({
    cuid: PropTypes.string,
    content: PropTypes.string,
    title: PropTypes.string,
    link: PropTypes.string,
    quizzes: PropTypes.array,
    orderNumber: PropTypes.number
  }).isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(Section);
