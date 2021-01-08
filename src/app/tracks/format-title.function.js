const format_title = (title) => {
  switch (title) {
    case 'djs':
      title = 'DJs';
      break;
    case 'live-tracks':
      title = 'Live Tracks';
      break;
    default:
      title = title.charAt(0).toUpperCase() + title.slice(1);
      break;
  }

  return title;
}
