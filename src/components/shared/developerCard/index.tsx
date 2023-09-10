import { Grid, Typography } from '@mui/material';

import BasicAvatar from '@/components/shared/avatar';
import BasicChip from '@/components/shared/chip';
import ChipGroup from '@/components/shared/chipGroup';
import BasicCard from '@/components/shared/card';

interface Props {
  oneline: string;
  name: string;
  description: string;
}

//chip은 반복문으로 변경
const DeveloperCard = ({ oneline, name, description }: Props) => {
  return (
    <BasicCard>
      <Grid container alignItems="center">
        <Grid textAlign="center" item xs={3}>
          <BasicAvatar sx={{ margin: '0 auto' }} />
        </Grid>
        <Grid item xs={9}>
          <Typography component="h5" variant="h5" noWrap={true}>
            {oneline}
          </Typography>
          <Typography component="h3" variant="h3">
            {name}
          </Typography>
          <ChipGroup>
            <BasicChip color="primary" label="test1"></BasicChip>
            <BasicChip color="primary" label="test2"></BasicChip>
            <BasicChip color="primary" label="test3"></BasicChip>
          </ChipGroup>
        </Grid>
      </Grid>
      <Typography component="h5" variant="h5" noWrap={true}>
        {description}
      </Typography>
    </BasicCard>
  );
};

export default DeveloperCard;
