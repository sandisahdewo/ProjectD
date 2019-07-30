import {Get, Post, Patch} from './methods'

const findPetugasById = (id) => Get(`petugas/find/${id}`);
const getAllPetugas = () => Get('petugas');
const savePetugas = (data) => Post('petugas/store', data);
const updatePetugas = (data, id) => Patch(`petugas/update/${id}`, data);
const toggleStatus = (id) => Patch(`petugas/toggle-status/${id}`, {})
const updatePassword = (data, id) => Patch(`petugas/change-password/${id}`, data)

const ServicePetugas = {
  findPetugasById,
  getAllPetugas,
  savePetugas,
  updatePetugas,
  toggleStatus,
  updatePassword
}

export default ServicePetugas