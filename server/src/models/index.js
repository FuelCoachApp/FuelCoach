// 모델을 한곳에서 불러오기: const { User, Trip } = require('./models');
module.exports = {
  User: require('./User'),
  Vehicle: require('./Vehicle'),
  Place: require('./Place'),
  SavedRoute: require('./SavedRoute'),
  Trip: require('./Trip'),
  CoachingPoint: require('./CoachingPoint'),
  CarModel: require('./CarModel'),
  FuelPrice: require('./FuelPrice'),
};
