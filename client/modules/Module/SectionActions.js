import callApi from '../../util/apiCaller';

export function addSectionRequest(section) {
  return callApi('sections', 'post', {section})
    .then(res => res.section);
}

export function deleteSectionRequest(cuid) {
	return callApi(`sections/${cuid}`, 'delete')
		.then(res => res);
}

export function fetchSections(moduleCuid){
	return callApi(`sections/${moduleCuid}`)
      .then(res => res.sections);
}
