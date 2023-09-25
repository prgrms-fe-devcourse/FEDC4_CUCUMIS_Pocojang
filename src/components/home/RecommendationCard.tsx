import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { Stack, Box, Typography } from '@mui/material';

import BasicAvatarProps from '@/types/components/BasicAvatarProps';
import AvatarWithChip from '@/components/shared/avatarWithChip';
interface DeveloperType {
  _id: string;
  label: string;
  AvatarProps: BasicAvatarProps;
}

const RecommendationCard = ({
  developers,
}: {
  developers: DeveloperType[];
}) => {
  return (
    <Box mt={2}>
      <Typography variant="body2" gutterBottom>
        Developer Recommendation
      </Typography>
      <Stack direction="row" spacing={2} justifyContent="space-evenly">
        {developers.map(({ _id: avatarId, AvatarProps, label }) => (
          <LinkStyled to={`/developers/${avatarId}`} key={avatarId}>
            <AvatarWithChip
              key={avatarId}
              AvatarProps={AvatarProps}
              label={label}
            />
          </LinkStyled>
        ))}
      </Stack>
    </Box>
  );
};

const LinkStyled = styled(Link)({
  textDecoration: 'none',
});

export default RecommendationCard;
