import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import BasicCard from '@/components/shared/card';

interface Props {
  name: string;
  imageUrl: string;
  projectTitle: string;
  to: string;
}
const ProjectCard = ({ name, imageUrl, projectTitle, to }: Props) => {
  return (
    <BasicCard to={`/projects/${to}`}>
      <CardMedia component="img" alt={name} height={141} src={imageUrl} />
      <CardContent>
        <Typography align="left" noWrap={true} variant="h5" component="h5">
          {projectTitle}
        </Typography>
        <Typography align="left" noWrap={true} variant="body2" component="p">
          {name}
        </Typography>
      </CardContent>
    </BasicCard>
  );
};

export default ProjectCard;
