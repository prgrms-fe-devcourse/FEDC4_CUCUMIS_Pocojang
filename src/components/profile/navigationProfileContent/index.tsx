import { Box } from '@mui/material';

import ItemWithAvatar from '@/components/shared/itemWithAvatar';
import ProjectCardItem from '@/components/shared/projectCard';
import type { UserType } from '@/types';

interface Type {
  userState: UserType | undefined;
  value: string;
}

const NavigationProfileContent  = ({ userState, value } : Type) => {
  return (
    <Box>
      {userState && (
        <Box>
          {['0', '1'].includes(value) && userState[value === '0' ? 'following' : 'followers'].map(({ user, follower }) => (
            <ItemWithAvatar
              key={user || follower}
              name={user || follower}
              AvatarProps={{ imgSrc: user || follower }}
              to={`/profile/${user || follower}`}
            />
          ))}

          {['2', '3'].includes(value) && userState.posts.map(({ _id, title, image }) => (
            <Box key={_id}>
              <ProjectCardItem
                name={JSON.parse(title).requirements}
                imageUrl={image}
                to={`${_id}`}
                projectTitle={JSON.parse(title).title}
              />
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default NavigationProfileContent;