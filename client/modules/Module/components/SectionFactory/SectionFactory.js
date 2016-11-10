import React, { PropTypes, Component } from 'react';
import { addSectionRequest, deleteSectionRequest, fetchSections } from '../../SectionActions'
import { Button, ButtonToolbar, Well, DropdownButton, MenuItem } from 'react-bootstrap'
import ModulePage from '../../pages/ModulePage'

export class SectionFactory extends Component {
	constructor(props){
		super(props);
		this.state = { sections: []};
		this.numberOfSecs = 1;
		}
	


	createSections = (button, sectionsCount = 1) => {
		
		var testContent = "";	
		sectionsCount = this.numberOfSecs;	
		
		for(var i = 0; i < sectionsCount; i++){
			
			if(i%2) testContent = "http://i.imgur.com/4PD98.gif";
				else testContent = "koe sisältöä sectioihin " + i;
			
			addSectionRequest({
				moduleCuid: this.props.moduleCuid,
				content: testContent,
				title: "koeotsikko " + i,
				orderNumber: i
			}).then(newSection => {this.setState({sections: [...this.state.sections, newSection]});
					this.props.addSectionToRender(newSection)});
		};

	};

	deleteSections = () => {
		
		
		fetchSections(this.props.moduleCuid)
			.then(sections => sections.forEach(section => {
					
					if(section.title)
						if (section.title.indexOf("koeotsikko") !== -1){
							deleteSectionRequest(section.cuid); 
						}
		})); 
		//this.state.sections
	//		.forEach(section => deleteSectionRequest(section.cuid));
		//this.setState({sections: []});
	};
	

	render(){
		
		return(
			<div>
				<Well>
				<ButtonToolbar>
					<Button bsStyle="danger" onClick={this.createSections}>Create Sections</Button>
					
					<DropdownButton onSelect={(eventKey) => this.numberOfSecs = eventKey * 100} title="numbers of sections" id="bg-nested-dropdown">
      			<MenuItem eventKey="1"> 100 </MenuItem>
      			<MenuItem eventKey="2"> 200 </MenuItem>
						<MenuItem eventKey="3"> 300 </MenuItem>
      			<MenuItem eventKey="3"> 400 </MenuItem>
					</DropdownButton>	
					<Button bsStyle="danger" onClick={this.deleteSections}>Delete Sections</Button>
				</ButtonToolbar>
				</Well>
			</div>
			);
	}
}
SectionFactory.PropTypes = {
	moduleCuid: PropTypes.string.isRequired,
	addSectionToRender: PropTypes.func.isRequired,
}


export default SectionFactory;