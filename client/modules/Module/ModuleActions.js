import callApi from '../../util/apiCaller';

export function fetchModules() {
    return callApi('modules', 'get')
      .then(res => res.modules);
}

export function addModuleRequest(module) {
    console.log(module);
    return Promise.resolve({ title: 'Otsikko', info: 'Sisältö' })
//    return callApi('modules', 'post', {module})
//            .then(res => res.module);
}