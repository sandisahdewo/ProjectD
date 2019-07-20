import {Get, Post, Patch, Delete, GetBlob} from './methods'
import RNFetchBlob from 'rn-fetch-blob';

const dirs = RNFetchBlob.fs.dirs;

// Services
const findServiceById = (id) => Get(`pitstop-sarana/find/${id}`);
const findByCreatorWithDetail = (id) => Get(`pitstop-sarana/find-by-creator-with-detail/${id}`);
const getAllService = (params) => Get(`pitstop-sarana?line=${params.line}&nomor=${params.nomor}&tanggal=${params.tanggal}&shift=${params.shift}&status=${params.status}`);
const storeService = (data) => Post('pitstop-sarana/store', data);
const updateService = (data, id) => Patch(`pitstop-sarana/update/${id}`, data);
const deleteService = (id) => Delete('pitstop-sarana/delete', id);

// Logsheet
const findLogsheetById = (id) => Get(`pitstop-sarana-detail/find/${id}`);
const getAllLogsheet = () => Get('pitstop-sarana-detail');
const storeLogsheet = (data) => Post('pitstop-sarana-detail/store', data);
const updateLogsheet = (data, id) => Patch(`pitstop-sarana-detail/update/${id}`, data);
const deleteLogsheet = (id) => Delete('pitstop-sarana-detail/delete', id);
const findLastLogsheet = () => Get(`pitstop-sarana-detail/find-last`)

// Approval
const getServiceIgnoreLineWithParams = (params) => Get(`pitstop-sarana/with-filter?nomor=${params.nomor}`);
const findServiceWithDetail = (id) => Get(`pitstop-sarana/find-with-detail/${id}`);
const approve = (id) => Get(`pitstop-sarana/approve/${id}`);
const reject = (id) => Get(`pitstop-sarana/reject/${id}`);
const exportExcel = (id, title) => GetBlob(`pitstop-sarana/export-excel/${id}`, {
  path: dirs.DocumentDir,
  addAndroidDownloads : {
    useDownloadManager : true,
    notification : true,
    title: title,
    path: dirs.DownloadDir,
    description : 'Laporan Excel Pitstop Sarana'
  }
});

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
  deleteLogsheet,
  findLastLogsheet,

  getServiceIgnoreLineWithParams,
  findServiceWithDetail,
  approve,
  reject,
  exportExcel
}

export default ServicePitstopSarana