import React, { PropTypes, Component } from 'react';
import {  Button, Grid, Row, Col, PageHeader, Panel, Well } from 'react-bootstrap';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

import SectionCreateModal from '../components/SectionCreateModal';
import SectionFactory from '../components/SectionFactory'
import ModuleListItem from '../components/ModuleListItem';
import Section from '../components/Section';

import { fetchModule } from '../ModuleActions';
import { fetchSections, deleteSectionRequest, addSectionRequest, editSectionRequest } from '../SectionActions';
import { getTokenPayload } from '../../../util/authStorage';
import { fetchScores } from '../../Quiz/QuizActions';

import { show } from '../../../util/styles';
import styles from '../components/ModuleList.css';

class ModulePage extends Component {

  constructor(props){
    super(props);
    this.state = {module: this.props.module, sections: [] };
  }

  /*
   * gets all sections associated the module then
   * gets the scores for all sections then
   * goes through all quizzes within sections and lastly
   * set the quiz points as they're saved inside scores
   */
  componentWillMount() {
      console.log("componentWillMountissa Modulepagella");
      fetchSections(this.props.module.cuid)
        .then(sections => fetchScores()
          .then(scoreboard => {
            if (!sections) sections = [];
            if (scoreboard) {
              sections.forEach(sec =>
                sec.quizzes.forEach(qui => {
                  var poi = scoreboard.scores.find(sco => sco.quizCuid == qui.cuid);
                  qui.points = poi ? poi.quizPoints : 0;
                })
              );
            }
            this.setState({ sections });
          }));
  }
  
  //Sections have to be sorted or edited section would be rendered as last.
  addToState = (newSection) => {
    var newSections = [];
    newSections = this.state.sections.filter(sec => sec.cuid !== newSection.cuid);
    newSections.push(newSection);
    newSections.sort((a, b) => a.orderNumber-b.orderNumber);
    this.setState({sections: newSections});
  }

  handleAddSection = (newSection) => {
    newSection.moduleCuid = this.state.module.cuid;
    newSection.orderNumber = this.state.sections.length;
    newSection.quizzes = [];
    addSectionRequest(newSection).then(savedSection => {
        this.addToState(savedSection);
    });
  };
  
  handleEditSection = (oldSection) => (content, title, link) => {
    let editedSection = {};
    //constructed by combining old and new
    const thisSection = oldSection;
    editedSection.cuid = thisSection.cuid;
    editedSection.content = content;
    editedSection.title = title;
    editedSection.link = link;
    editedSection.quizzes = thisSection.quizzes;
      
    //Order number changing is not implemented yet.
    editedSection.orderNumber = thisSection.orderNumber;
      
    this.addToState(editedSection);
  
    editSectionRequest(editedSection);
  }

  panelHeader = (section) => {
    return (
      <div className="clearfix">
        <div className={styles['panel-heading']}>
          {section.title ? section.title : ''}
          {this.panelButtonsForAdmin(section)}
        </div>
      </div>
    );
  };

  panelButtonsForAdmin = (section) => {
    if (getTokenPayload() && getTokenPayload().isAdmin && section.cuid) {
      return (
        <span>
          <Button className="pull-right" bsStyle="danger" bsSize="xsmall" onClick={() => this.handleDeleteSection(section)}>
            Poista section
          </Button>
          <SectionCreateModal editSection={this.handleEditSection(section)} section={section} />
        </span>
      );
    }
  };

  handleDeleteSection = (section) => {
  //  if (window.confirm('Haluatko varmasti poistaa sectionin?')) {
      deleteSectionRequest(section.cuid).then(this.setState({ sections: this.state.sections.filter(sec => sec.cuid !== section.cuid) }));
  //  }
  };


  render() {
    var i = 0;
    return (
      <div>
        <PageHeader> <Button onClick={()=> this.props.addElementFunctionToMainview()}>&larr;<FormattedMessage id={'submitBack'} /></Button> {this.state.module.title}</PageHeader>
        <Well>
          <div className={styles.textarea}>{this.state.module.info}</div>
        </Well>

        {this.state.sections.map(section => (
          <Panel collapsible defaultExpanded header={this.panelHeader(section)} eventKey={++i} key={i}>
            <Section section={section} />
          </Panel>
        ))}

        <div style={show(getTokenPayload() && getTokenPayload().isAdmin)}>
          <SectionCreateModal moduleCuid={this.state.module.cuid} addSection={this.handleAddSection} />
        </div>
      </div>
    );
  }
}

ModulePage.propTypes = {
  module: PropTypes.shape({
    title: PropTypes.string.isRequired,
    info: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  }).isRequired,

};




export default ModulePage;
