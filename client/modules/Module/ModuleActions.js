import callApi from '../../util/apiCaller';

export function fetchModules() {
    return callApi('modules', 'get')
      .then(res => res.modules);
}

export function deleteModuleRequest(cuid) {
	return callApi(`modules/${cuid}`, 'delete')
		.then(res => res);
}

 export function fetchModule(title) {
    return callApi(`modules/${title}`)
      .then(res => res.module);
}

export function fetchSections(moduleCuid){
	return callApi(`sections/${moduleCuid}`)
      .then(res => res.sections);
}

export function addModuleRequest(module) {
    return callApi('modules', 'post', {module})
            .then(res => res.module);

}