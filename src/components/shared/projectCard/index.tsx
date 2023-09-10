import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import BasicCard from '@/components/shared/card';

interface Props {
  name: string;
  imageUrl: string;
  projectTitle: string;
  onClick: () => void;
}

const ProjectCard = ({ name, imageUrl, projectTitle, onClick }: Props) => {
  return (
    <BasicCard onClick={onClick}>
      <CardMedia component="img" alt={name} height={194} src={imageUrl} />
      <CardContent>
        <Typography align="left" noWrap={true} variant="h3" component="h3">
          {projectTitle}
        </Typography>
        <Typography align="left" noWrap={true} variant="h5" component="h5">
          {name}
        </Typography>
      </CardContent>
    </BasicCard>
  );
};

export default ProjectCard;
