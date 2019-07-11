import Get from './get'
import Post from './post';
import Patch from './patch';
import Delete from './delete';

// Services
const findServiceById = (id) => Get(`pitstop-sarana/find/${id}`);
const findByCreatorWithDetail = (id) => Get(`pitstop-sarana/find-by-creator-with-detail/${id}`);
const getAllService = (params) => Get(`pitstop-sarana?line=${params.line}`);
const storeService = (data) => Post('pitstop-sarana/store', data);
const updateService = (data, id) => Patch(`pitstop-sarana/update/${id}`, data);
const deleteService = (id) => Delete('pitstop-sarana/delete', id);

// Logsheet
const findLogsheetById = (id) => Get(`pitstop-sarana-detail/find/${id}`);
const getAllLogsheet = () => Get('pitstop-sarana-detail');
const storeLogsheet = (data) => Post('pitstop-sarana-detail/store', data);
const updateLogsheet = (data, id) => Patch(`pitstop-sarana-detail/update/${id}`, data);
const deleteLogsheet = (id) => Delete('pitstop-sarana-detail/delete', id);

const ServicePitstopSarana = {
  findServiceById,
  findByCreatorWithDetail,
  getAllService,
  storeService,
  updateService,
  deleteService,

  findLogsheetById,
  getAllLogsheet,
  storeLogsheet,
  updateLogsheet,
  deleteLogsheet
}

export default ServicePitstopSarana