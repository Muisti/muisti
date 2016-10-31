import callApi from '../../util/apiCaller';

export function fetchModules() {
//    return callApi('modules', 'get')
//      .then(res => res.user);
      console.log("fetchModules kutsuttiin");
      return Promise.resolve([{ title: "11nimi", content: "11sisalto" }, { title: "22nimi", content: "22sisalto" }]);
}