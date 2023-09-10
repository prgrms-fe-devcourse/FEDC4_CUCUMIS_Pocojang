import { CardContent, Grid, Typography } from '@mui/material';

import type BasicAvatarProps from '@/types/components/BasicAvatarProps';
import BasicAvatar from '@/components/shared/avatar';
import BasicChip from '@/components/shared/chip';
import ChipGroup from '@/components/shared/chipGroup';
import BasicCard from '@/components/shared/card';

interface Props {
  AvatarProps: BasicAvatarProps;
  oneliner: string;
  name: string;
  description: string;
  to: string;
}

//TODO 스택은 반복문으로 변경하기,
const DeveloperCard = ({
  AvatarProps,
  oneliner,
  name,
  description,
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
              {oneliner}
            </Typography>
            <Typography variant="body1" component="p">
              {name}
            </Typography>
            <ChipGroup>
              <BasicChip color="primary" label="test1"></BasicChip>
              <BasicChip color="primary" label="test2"></BasicChip>
              <BasicChip color="primary" label="test3"></BasicChip>
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

export default DeveloperCard;
