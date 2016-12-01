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
    this.state = {module: {}, sections: [] };
  }

  componentDidMount() {
    fetchModule(this.props.params.title)
      .then(module => fetchSections(module.cuid)
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
            this.setState({ module, sections });
          })))
  }

  handleAddSection = (newSection) => {
    newSection.moduleCuid = this.state.module.cuid;
    newSection.orderNumber = this.state.sections.length;
    newSection.quizzes = [];
    addSectionRequest(newSection).then(savedSection => {
        this.setState({sections: [...this.state.sections, savedSection]});
    });
  };
  
  handleEditSection = (editedSection) => {
    var newSections = [];
    newSections = this.state.sections.filter(sec => sec.cuid !== editedSection.cuid);
    newSections.push(editedSection);
    this.setState({sections: newSections});
  
    editSectionRequest(editedSection);
  }

  panelHeader = (section) => {
    return (
      <div className="clearfix">
        <div className={styles['panel-heading']}>
          {section.title ? section.title : ''}
          {this.panelDeleteButtonForAdmin(section)}
        </div>
      </div>
    );
  };

  panelDeleteButtonForAdmin = (section) => {
    if (getTokenPayload() && getTokenPayload().isAdmin && section.cuid) {
      return (
        <Button className="pull-right" bsStyle="danger" bsSize="xsmall" onClick={() => this.handleDeleteSection(section)}>
          Poista section
        </Button>
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
        <PageHeader> <Button href={"/"}>&larr;<FormattedMessage id={'submitBack'} /></Button> {this.state.module.title}</PageHeader>
        <Well>
          {this.state.module.info}
        </Well>

        {this.state.sections.map(section => (
          <Panel collapsible defaultExpanded header={this.panelHeader(section)} eventKey={++i} key={i}>
            <Section section={section} editSection={this.handleEditSection} />
          </Panel>
        ))}

        <div style={show(getTokenPayload() && getTokenPayload().isAdmin)}>

          <SectionCreateModal moduleCuid={this.state.module.cuid}
                              addSection={this.handleAddSection} />
        </div>

        <div style={show(getTokenPayload() && getTokenPayload().isAdmin)}>
          <SectionFactory moduleCuid={this.state.module.cuid} addSectionToRender={this.handleAddSection}></SectionFactory>
        </div>

      </div>

    );
  }
}

export default ModulePage;
