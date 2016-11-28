import React, { PropTypes, Component } from 'react';
import { Accordion, Button, Grid, Row, Col, PageHeader, Panel, Well } from 'react-bootstrap';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

import SectionCreateModal from '../components/SectionCreateModal';
import SectionFactory from '../components/SectionFactory'
import ModuleListItem from '../components/ModuleListItem';
import Section from '../components/Section';

import { fetchModule } from '../ModuleActions';
import { fetchSections } from '../SectionActions';
import { getTokenPayload } from '../../../util/authStorage';
import { fetchScores } from '../../Quiz/QuizActions';

import { show } from '../../../util/styles';

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

  addSectionToRender = (newSection) => {
    this.setState({sections: [...this.state.sections, newSection]});
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


  render() {
    return (
      <div>
        <PageHeader> <Button href={"/"}>&larr;<FormattedMessage id={'submitBack'} /></Button> {this.state.module.title}</PageHeader>
        <Well>
          {this.state.module.info}
        </Well>

        {this.state.sections.map((section,key) => <Section key={key} section={section} />)}

        <Accordion>
          {this.state.sections.map(section => (
            <Panel header={this.panelHeader(section)} eventKey={++i} key={i}>
              <ModuleListItem module={section}/>
            </Panel>
          ))
          }

        </Accordion>
        <div style={show(getTokenPayload() && getTokenPayload().isAdmin)}>

          <SectionCreateModal moduleCuid={this.state.module.cuid}
                              orderNumber={this.state.sections.length}
                              addSectionToRender={this.addSectionToRender} />
        </div>

        <div style={show(getTokenPayload() && getTokenPayload().isAdmin)}>
          <SectionFactory moduleCuid={this.state.module.cuid} addSectionToRender={this.addSectionToRender}></SectionFactory>
        </div>

      </div>

    );
  }
}

export default ModulePage;
