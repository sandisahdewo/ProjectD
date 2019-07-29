import UnitIndex from "../pages/unit/index";
import UnitCreate from "../pages/unit/create";
import UnitEdit from "../pages/unit/edit";

export default RouteUnit = {
  UnitIndex: { 
    screen: UnitIndex,
    navigationOptions: () => ({
      title: 'Data Unit',
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#3C8DBC',
      }
    }) 
  },
  UnitCreate: { 
    screen: UnitCreate,
    navigationOptions: () => ({
      title: 'Tambah Unit',
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#3C8DBC',
      }
    }) 
  },
  UnitEdit: { 
    screen: UnitEdit,
    navigationOptions: () => ({
      title: 'Perbarui Unit',
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#3C8DBC',
      }
    }) 
  },
}