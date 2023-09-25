import { Box } from '@mui/material';

import ItemWithAvatar from '@/components/shared/itemWithAvatar';
import ProjectCardItem from '@/components/shared/projectCard';
import type { UserType } from '@/types';

interface Type {
  userState: UserType | undefined;
  value: string;
}

const NavigationProfileContent = ({ userState, value }: Type) => {
  return (
    <Box>
      {userState && (
        <Box>
          {value === '0' &&
            userState.following.map(({ user }) => (
              <ItemWithAvatar
                name={user}
                AvatarProps={{ imgSrc: user }}
                to={`/profile/${user}`}
              />
            ))}
          {value === '1' &&
            userState.followers.map(({ follower }) => (
              <ItemWithAvatar
                name={follower}
                AvatarProps={{ imgSrc: follower }}
                to={`/profile/${follower}`}
              />
            ))}
          {['2', '3'].includes(value) &&
            userState.posts.map(({ _id, title, image }) => (
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
