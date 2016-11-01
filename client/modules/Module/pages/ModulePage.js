import React, { PropTypes, Component } from 'react';
import { Button, Grid, Row, Col, PageHeader, Panel } from 'react-bootstrap';

import ModuleListItem from '../components/ModuleListItem/ModuleListItem';
import { fetchModule, fetchSections } from '../ModuleActions';


class ModulePage extends Component {

  constructor(){
    super();
    this.state = {module: {}, sections: [] };

  }
  componentDidMount() {
    console.log(fetchModule('eka osa'));
    //fetchModule('eka osa').then(module => this.setState({module}));
    
    this.setState({module: fetchModule('eka osa')});
    //fetchSections(module.cuid).then(sections => this.setState({sections}));
    //console.log(this.state.module);
  }


  render() {

    return (
      <div>
      <PageHeader>Moduulin sisältö</PageHeader>

      <Panel header={this.state.module.title} eventKey="1">
        Sisältö <br />
        <br />
        
        <br />
        At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.
      </Panel>
      </div>
    );

  }

}





export default ModulePage;
