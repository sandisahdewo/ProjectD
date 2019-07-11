import Get from './get'

const search = (query) => Get(`unit/search?q=${query}`);

const serviceUnit = {
  search
}
export default serviceUnit;