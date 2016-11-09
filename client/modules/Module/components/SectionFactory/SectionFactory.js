import React, { PropTypes, Component } from 'react';
import SectionActions from '../../SectionActions'
import { Button } from 'react-bootstrap'
import ModulePage from '../../pages/ModulePage'

export class SectionFactory extends Component {
	constructor(props){
		super(props);
		var sections = [];
	}
	

	createSections = () => {
		
			console.log(props.moduleCuid);
		/*for(var i = 0; i < sectionsCount; i++){
			addSectionRequest({
				moduleCuid: props.moduleCuid,
				content: "koe sisältö " + i,
				title: "koeotsikko " + i,
				orderNumber: i
			}).then(section => sections.push(section));
		};*/

	};

	deleteSections = () => {
		sections.forEach(section => deleteSectionRequest(section.cuid));

	};
	render(){
		return(
			<div>
				<Button bsStyle="primary" onClick={this.createSections}>Luo</Button>
				<Button bsStyle="primary" onClick={this.deleteSections}>Tuhoa</Button>
			</div>
			);
	}
}



export default SectionFactory;