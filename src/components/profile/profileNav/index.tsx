import { BottomNavigation, BottomNavigationAction } from '@mui/material';

interface ProfileNavType {
  value: string | number;
  navigationData: { label: number; title: string }[];
  onChange:
    | ((event: React.SyntheticEvent<Element, Event>, value: string) => void)
    | undefined;
}
const ProfileNav = ({ value, navigationData, onChange }: ProfileNavType) => {
  return (
    <BottomNavigation value={value} onChange={onChange} showLabels>
      {navigationData.map(({ label, title }) => (
        <BottomNavigationAction label={label} icon={title} />
      ))}
    </BottomNavigation>
  );
};

export default ProfileNav;
