import { post, get, patch,deleted } from '../services';
import routes from './route';

const RoleServices = {
    
  GetRoles: async () => {
    const data = await get(routes.GetRoles);
    return data;
  },

  CreateRole: async (obj) => {
    const data = await post(routes.CreateRole, obj);
    return data;
  },
 
  UpdateRole: async (obj) => {
    const data = await patch(routes.UpdateRole, obj);
    return data;
  },

  getEdges: async (params) => {
    const data = await get(routes.getEdges, params);
    return data;
  },

  DeleteRole: async (id) => {
    const data = await deleted(routes.DeleteRole + `?id=${id}`);
    return data;
  },

 

 
 
 



  
}

export default RoleServices