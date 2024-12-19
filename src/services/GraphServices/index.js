import { post, get, patch,deleted } from '../services';
import routes from './routes';

const CustomerServices = {
  requestBuyerId: async (obj) => {
    const data = await post(routes.requestBuyerId, obj);
    return data;
  },
  DeleteNode: async (params) => {
    const data = await deleted(routes.DeleteNode, params);
    return data;
  },
  DeleteEdge: async (params) => {
    const data = await deleted(routes.DeleteEdge, params);
    return data;
  },
  CreateEdge: async (obj) => {
    const data = await post(routes.CreateEdge, obj);
    return data;
  },
  CreateNode: async (obj) => {
    const data = await post(routes.CreateNode, obj);
    return data;
  },
  UpdateWPStatus: async (obj) => {
    const data = await patch(routes.UpdateWPStatus, obj);
    return data;
  },
  updateNode: async (obj) => {
    const data = await patch(routes.updateNode, obj);
    return data;
  },
  updateEdge: async (obj) => {
    const data = await patch(routes.updateEdge, obj);
    return data;
  },

  

  getNodes: async (params) => {
    const data = await get(routes.getNodes, params);
    return data;
  },
  getEdges: async (params) => {
    const data = await get(routes.getEdges, params);
    return data;
  },



 

 
 
 



  
}

export default CustomerServices