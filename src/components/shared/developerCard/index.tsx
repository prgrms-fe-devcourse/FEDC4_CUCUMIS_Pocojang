import { CardContent, Grid, Typography } from '@mui/material';

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
      <CardContent>
        <Grid container alignItems="center">
          <Grid item xs={3}>
            <BasicAvatar />
          </Grid>
          <Grid item xs={9}>
            <Typography variant="body1" noWrap={true}>
              {oneline}
            </Typography>
            <Typography variant="body1">{name}</Typography>
            <ChipGroup>
              <BasicChip color="primary" label="test1"></BasicChip>
              <BasicChip color="primary" label="test2"></BasicChip>
              <BasicChip color="primary" label="test3"></BasicChip>
            </ChipGroup>
          </Grid>
        </Grid>

        <Typography component="h5" variant="body1" noWrap={true}>
          {description}
        </Typography>
      </CardContent>
    </BasicCard>
  );
};

export default DeveloperCard;
