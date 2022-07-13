const humanDuration = (duration: number) => {
  let hours = Math.floor(duration / 3600);
  duration = duration % 3600;

  let minutes = String(Math.floor(duration / 60)).padStart(2, '0');
  let seconds = String(Math.floor(duration % 60)).padStart(2, '0');

  if (hours > 0) {
    return `${String(hours).padStart(2, '0')}:${minutes}:${seconds}`;
  }

  return `${minutes}:${seconds}`;
};

export default humanDuration;
