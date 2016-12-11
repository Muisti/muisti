import callApi from '../../util/apiCaller';

// Export Constants
export const ADD_MODULE = 'ADD_MODULE';
export const ADD_MODULES = 'ADD_MODULES';
export const DELETE_MODULE = 'DELETE_MODULE';
export const EDIT_MODULE = 'EDIT_MODULE';


// Export Actions

export function addModule(module) {
  return {
    type: ADD_MODULE,
    module,
  };
}

/**  */

export function editModule(module) {
  return {
    type: EDIT_MODULE,
    module,
  };
}

export function addModules(modules) {
  return {
    type: ADD_MODULES,
    modules,
  };
}


export function deleteModule(cuid) {
  return {
    type: DELETE_MODULE,
    cuid,
  };
}

export function fetchModules() {
  return (dispatch) => {
    return callApi('modules', 'get')
      .then(res => {
        dispatch(addModules(res.modules));
        return res.modules;
      });
  };
}

export function deleteModuleRequest(cuid) {
	return (dispatch) => {
    return callApi(`modules/${cuid}`, 'delete')
		.then(() => dispatch(deleteModule(cuid)));
  };
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
  return (dispatch) => {
    return callApi('modules', 'post', {module})
            .then(res => dispatch(addModule(res.module)));
  };
}

export function editModuleRequest(module) {
    return callApi('modules', 'put', {module})
            .then(res => res.module);
}
