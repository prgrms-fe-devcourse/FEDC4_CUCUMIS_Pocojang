import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import styled from '@emotion/styled';
import CardActionArea from '@mui/material/CardActionArea';
interface Props {
  name: string;
  imageUrl: string;
  projectTitle: string;
  onClick: () => void;
}

const ProjectCard = ({
  name,
  imageUrl,
  projectTitle,
  onClick,
  ...props
}: Props) => {
  return (
    <StyledCard raised={true} onClick={onClick} {...props}>
      <CardActionArea>
        <CardMedia component="img" alt={name} height={194} src={imageUrl} />
        <CardContent>
          <Typography align="left" noWrap={true} variant="h3" component="h3">
            {projectTitle}
          </Typography>
          <Typography align="left" noWrap={true} variant="h5" component="h5">
            {name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </StyledCard>
  );
};

const StyledCard = styled(Card)(() => ({
  '&.MuiCard-root': {
    transition: 'transform .2s ',
    '&:hover': {
      transform: 'scale(1.01)',
    },
  },
}));
export default ProjectCard;
