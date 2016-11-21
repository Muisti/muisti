import React, { PropTypes, Component } from 'react';
import { Button, Grid, Row, Col, PageHeader, Panel, Well } from 'react-bootstrap';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
 
import SectionCreateModal from '../components/SectionCreateModal';
import SectionFactory from '../components/SectionFactory'
import ModuleListItem from '../components/ModuleListItem';
import Section from '../components/Section';

import { fetchModule } from '../ModuleActions';
import { fetchSections } from '../SectionActions';
import { getTokenPayload } from '../../../util/authStorage';
import { fetchScores } from '../../Quiz/QuizActions';


class ModulePage extends Component {

  constructor(props){
    super(props);
    this.state = {module: {}, sections: [] };
  }

  componentDidMount() {
    fetchModule(this.props.params.title)
      .then(module => fetchSections(module.cuid)
        .then(sections => {
          if (!sections) sections = [];
          this.setState({ module, sections });
          return sections;
        }))
    .then(sections => fetchScores()
      .then(scoreboard =>
        sections.forEach(sec =>
          sec.quizzes.forEach(qui =>
            qui.points = scoreboard.scores.find(
              sco => sco.quizCuid == qui.cuid)))));
    
  }

  addSectionToRender = (newSection) => {
    this.setState({sections: [...this.state.sections, newSection]});
  };


  render() {

    return (
      <div>
        <PageHeader> <Button href={"/"}>&larr;<FormattedMessage id={'submitBack'} /></Button> {this.state.module.title}</PageHeader>
        <Well>
          {this.state.module.info}
        </Well>

        {this.state.sections.map(section => <Section section={section} />)}

        <div className={ getTokenPayload() && getTokenPayload().isAdmin ? '' : 'hidden'}>
          <SectionCreateModal moduleCuid={this.state.module.cuid}
                              orderNumber={this.state.sections.length}
                              addSectionToRender={this.addSectionToRender} />
        </div>
        <div className={ getTokenPayload() && getTokenPayload().isAdmin ? '' : 'hidden'}>
          <SectionFactory moduleCuid={this.state.module.cuid} addSectionToRender={this.addSectionToRender}></SectionFactory>
        </div>
      </div>
    );
  }
}

export default ModulePage;
