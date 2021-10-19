const getDuration = (mins) => {
  let hours = Math.trunc(mins/60);
  let minutes = mins % 60;

  return hours + 'ч' + minutes + 'м';
};

export default getDuration;