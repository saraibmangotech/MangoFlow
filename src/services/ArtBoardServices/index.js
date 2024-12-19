import { post, get, patch,deleted } from '../services';
import routes from './routes';

const ArtBoardServices = {



  

  getArtBoards: async (params) => {
    const data = await get(routes.getArtBoards, params);
    return data;
  },
 
  CreateArtBoard: async (obj) => {
    const data = await post(routes.CreateArtBoard, obj);
    return data;
  },
  UpdateArtBoard: async (obj) => {
    const data = await patch(routes.UpdateArtBoard, obj);
    return data;
  },
 
 
  DeleteArtBoard: async (params) => {
    const data = await deleted(routes.DeleteArtBoard, params);
    return data;
  },


 

 
 
 



  
}

export default ArtBoardServices