import React, { Component, PropTypes } from 'react';
import { PageHeader, Panel, Button } from 'react-bootstrap';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import validator from 'validator';
import QuizPanel from '../../Quiz/components/QuizPanel';
import QuizCreateModal from '../../Quiz/components/QuizCreateModal';
import { getTokenPayload } from '../../../util/authStorage';
import { show } from '../../../util/styles';
import { deleteSectionRequest } from '../SectionActions'
import styles from './ModuleList.css';

export class Section extends Component {

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

  addQuiz = (quiz) => {
   this.props.section.quizzes.push(quiz); this.setState({});
  };

  panelHeader = (section) => {
    return (
      <div className="clearfix">
        <div className={styles['panel-heading']}>
          {section.title ? section.title : ''}
          {this.panelDeleteButtonForAdmin()}
        </div>
      </div>
    );
  };

  panelDeleteButtonForAdmin = () => {
    if (getTokenPayload() && getTokenPayload().isAdmin) {
      return (
        <Button className="pull-right" bsStyle="danger" bsSize="xsmall" onClick={() => this.handleDeleteSection()}>
         Poista section
        </Button>
      );
    }
  };

  handleDeleteSection = (section) => {
    if (window.confirm('Haluatko varmasti poistaa sectionin?')) {
      deleteModuleRequest(section.cuid).then(this.setState({ sections: this.state.sections.filter(sec => sec.cuid !== section.cuid) }));
    }
  };

  render(){
    var section = this.props.section;
    const token = getTokenPayload();

    return (
      <Panel collapsible defaultExpanded header={this.panelHeader(section)} >
        <div>{section.content ? section.content : ''}</div>
        {section.link ? this.renderMultimediaFileType(this.checkMultimediaFileType(section.link), section) : ''}
        <div style={show(section.quizzes && section.quizzes.length > 0)}>
          <br />
          <QuizPanel quizzes={section.quizzes} />
        </div>
        <div style={show(token && token.isAdmin)}>
          <QuizCreateModal addQuiz={this.addQuiz} sectionCuid={section.cuid} />
        </div>
      </Panel>
    );
  }
}

Section.propTypes = {
  section: PropTypes.shape({
    cuid: PropTypes.string,
    content: PropTypes.string,
    title: PropTypes.string,
    link: PropTypes.string,
    quizzes: PropTypes.array
  }).isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(Section);
