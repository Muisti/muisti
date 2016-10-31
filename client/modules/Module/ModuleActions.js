import callApi from '../../util/apiCaller';

export function fetchModules() {
    return callApi('modules', 'get')
      .then(res => res.modules);
}

export function fetchModule(title){
	return {module: {cuid: 1111, title: 'eka osa'}}

}

export function fetchSections(cuid){
	return {sections: [{cuid: 1111, text: 'sisältöä tässä'},{cuid: 1111, text: 'toinen tässä'}]}

}