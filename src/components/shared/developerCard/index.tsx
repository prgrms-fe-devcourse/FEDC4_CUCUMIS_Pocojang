import { CardContent, Grid, Typography } from '@mui/material';
import styled from '@emotion/styled';

import type BasicAvatarProps from '@/types/components/BasicAvatarProps';
import BasicAvatar from '@/components/shared/avatar';
import BasicChip from '@/components/shared/chip';
import ChipGroup from '@/components/shared/chipGroup';
import BasicCard from '@/components/shared/card';

interface Props {
  AvatarProps: BasicAvatarProps;
  oneLiner: string;
  name: string;
  description: string;
  to: string;
  techStack: string[];
}

const DeveloperCardItem = ({
  AvatarProps,
  oneLiner,
  name,
  description,
  techStack,
  to,
}: Props) => {
  return (
    <BasicCard to={`/developers/${to}`}>
      <CardContent>
        <Grid container alignItems="center">
          <Grid item xs={3}>
            <BasicAvatar {...AvatarProps} />
          </Grid>
          <Grid item xs={9}>
            <Typography variant="body1" component="p" noWrap={true}>
              {oneLiner}
            </Typography>
            <Typography variant="body1" component="p">
              {name}
            </Typography>
            <ChipGroup>
              {techStack &&
                Array.isArray(techStack) &&
                techStack.map((stack) => (
                  <ChipStyled key={stack} label={stack} />
                ))}
            </ChipGroup>
          </Grid>
        </Grid>

        <Typography variant="body1" component="p" noWrap={true}>
          {description}
        </Typography>
      </CardContent>
    </BasicCard>
  );
};
const ChipStyled = styled(BasicChip)({
  maxWidth: '70px',
});
export default DeveloperCardItem;
