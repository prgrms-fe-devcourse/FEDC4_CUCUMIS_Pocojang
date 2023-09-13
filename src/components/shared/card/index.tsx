import Card, { CardProps } from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

interface Props extends CardProps {
  to: string;
}

const BasicCard = ({ children, to }: Props) => {
  return (
    <LinkStyled to={to}>
      <CardStyled raised={true}>
        <CardActionArea>{children}</CardActionArea>
      </CardStyled>
    </LinkStyled>
  );
};

const CardStyled = styled(Card)(() => ({
  '& ': {
    transition: 'transform .2s ',
    '&:hover': {
      transform: 'scale(1.01)',
    },
  },
}));

const LinkStyled = styled(Link)(() => ({
  textDecoration: 'none',
}));
export default BasicCard;
