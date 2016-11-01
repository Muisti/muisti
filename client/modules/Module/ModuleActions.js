import callApi from '../../util/apiCaller';

export function fetchModules() {
    return callApi('modules', 'get')
      .then(res => res.modules);
}

export function addModuleRequest(module) {
    console.log(module);
    return callApi('modules', 'post', {module})
            .then(res => res.module);
}