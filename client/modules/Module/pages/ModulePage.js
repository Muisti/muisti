import React, { PropTypes, Component } from 'react';
import { Button, Grid, Row, Col, PageHeader, Panel } from 'react-bootstrap';

import ModuleListItem from '../components/ModuleListItem/ModuleListItem';
import { fetchModule, fetchSections } from '../ModuleActions';


class ModulePage extends Component {

  constructor(){
    super(props);
    this.state = {module: {}, sections: [] };

  }
  componentDidMount() {
    fetchModule('eka osa').then(module => this.setState({module}));
    fetchSections(module.cuid).then(sections => this.setState({sections}));
  }


  render() {

    return (
      <div>
      <PageHeader>Moduulin sisältö</PageHeader>

      <Panel header={module.title} eventKey="1">
        Sisältö <br />
        <br />
        {sections[0].text}
        <br />
        At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.
      </Panel>
      </div>
    );

  }

}



/*ModulePage.propTypes = {
  module: PropTypes.shape({
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  }).isRequired,
};*/


export default ModulePage;
