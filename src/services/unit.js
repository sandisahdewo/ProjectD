import {Get} from './methods';

const search = (query) => Get(`unit/search?q=${query}`);

const serviceUnit = {
  search
}
export default serviceUnit;