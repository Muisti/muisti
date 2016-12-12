import { ADD_MODULE, EDIT_MODULE, ADD_MODULES, DELETE_MODULE } from './ModuleActions';

const initialState = { modules: [] };

const ModuleReducer = (state = initialState, action) => {
	switch (action.type) {
    case ADD_MODULE :
      return {
        modules: [action.module, ...state.modules],
      };

    case ADD_MODULES :
      return {
        modules: action.modules,
      };

    case DELETE_MODULE :
      return {
        modules: state.modules.filter(module => module.cuid !== action.cuid),
      };


    case EDIT_MODULE :{

      return {
        modules: [action.module, ...state.modules.filter(module => module.cuid !== action.module.cuid)],
      };
  }

    default:
      return state;
  }
};

export const getModules = state => state.modules.modules.sort(
						(m1, m2) => m1.orderNumber - m2.orderNumber );


export default ModuleReducer;