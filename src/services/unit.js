import {Get, Post, Patch, Delete} from './methods';

const search = (query) => Get(`unit/search?q=${query}`);
const find = (id) => Get(`unit/find/${id}`);
const findByKode = (kode) => Get(`unit/find-by-kode/${kode}`)
const get = (query) => Get(`unit/get?page=${query.page}&q=${query.q}`)
const store = (data) => Post('unit/store', data)
const update = (id, data) => Patch(`unit/update/${id}`, data)
const destroy = (id) => Delete(`unit/destroy`, id)

const serviceUnit = {
  search,
  find,
  findByKode,
  get,
  store,
  update,
  destroy
}
export default serviceUnit;