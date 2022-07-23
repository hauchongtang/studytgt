export const determineLevel = (points) => {
  var levels = [];
  for (var i = 0; i < 9900; i+=5) {
    levels.push(i);
  }
  
  var level = 0;
  var experience = points;

  levels.forEach((v, i) => {
   if(experience >= v) {
     level = i+1;
   }
  });
  return {level: level, nextLevel: level+1, points: points, targetPointsToNextLevel: levels[level]};
}