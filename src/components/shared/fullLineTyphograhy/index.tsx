import styled from '@emotion/styled';
import { Typography, TypographyProps } from '@mui/material';

interface FullLineTyphographyProps extends TypographyProps {}

const FullLineTyphography = ({
  children,
  ...props
}: FullLineTyphographyProps) => {
  return <WordWrapTypography {...props}>{children}</WordWrapTypography>;
};

const WordWrapTypography = styled(Typography)({
  wordWrap: 'break-word',
  whiteSpace: 'pre-wrap',
});

export default FullLineTyphography;
