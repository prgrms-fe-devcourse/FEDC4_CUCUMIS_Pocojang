import Card, { CardProps } from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import styled from '@emotion/styled';

const BasicCard = ({ children, ...props }: CardProps) => {
  return (
    <StyledCard raised={true} {...props}>
      <CardActionArea>{children}</CardActionArea>
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
export default BasicCard;
