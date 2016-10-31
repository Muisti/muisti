import callApi from '../../util/apiCaller';

export function fetchModules() {
    return callApi('modules', 'get')
      .then(res => res.modules);
}