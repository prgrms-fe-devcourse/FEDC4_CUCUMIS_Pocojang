export const getTitle = (location: string) => {
  if (location === '/') return 'home';
  if (location === '/projects') return 'project';
  return location;
};
