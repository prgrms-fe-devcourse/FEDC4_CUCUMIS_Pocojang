import styled from '@emotion/styled';
import { Box, Divider, Stack, Typography } from '@mui/material';

import BasicAvatar from '@/components/shared/avatar';
import ItemWithAvatar from '@/components/shared/itemWithAvatar';

export default function ProjectDetailPage() {
  const { userName, date, title, contents, comments } = DUMMY_DATA;

  return (
    <Stack spacing={3}>
      <ProjectImageStyled component="img" src="/Logo96.svg" alt="참외" />
      <Stack direction="row" alignItems="center" spacing={2}>
        <BasicAvatar />
        <TitleBoxStyled>
          <Typography noWrap>{userName}</Typography>
          <Typography variant="subtitle2" color="gray">
            {date}
          </Typography>
        </TitleBoxStyled>
      </Stack>
      <Typography variant="h4">{title}</Typography>
      <Stack spacing={1}>
        <Typography color="gray">요구사항</Typography>
        <Typography>{contents}</Typography>
      </Stack>
      <Divider variant="middle" />
      <Box>
        <Typography color="gray">댓글</Typography>
        {comments.map((data, i) => (
          <ItemWithAvatar {...data} key={i} isComment={true} />
        ))}
      </Box>
    </Stack>
  );
}

const ProjectImageStyled = styled(Box)({
  width: '100%',
  height: '40vh',
  objectFit: 'cover',
}) as typeof Box;

const TitleBoxStyled = styled(Box)({
  minWidth: 0,
  marginRight: '16px',
});

const DUMMY_DATA = {
  userName:
    '사용자사용자사용자사용자사용자사용자사용자사용자사용자사용자사용자사용자사용자사용자사용자사용자사용자사용자사용자사용자사용자사용자사용자사용자사용자사용자사용자사용자',
  date: '2022.03.14',
  title: 'This is Title',
  contents: `We need DesignerIt is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.`,
  comments: [
    {
      AvatarProps: {
        onClick: () => console.log('hi'),
        isUserOn: false,
      },
      name: '댓글 List',
      message:
        'Check out this linkCheck out this linkCheck out this linkCheck out this linkCheck out this linkCheck out this linkCheck out this linkCheck out this link.',
    },
    {
      AvatarProps: {
        onClick: () => console.log('hi'),
        isUserOn: false,
      },
      name: '댓글 List',
      message:
        'Check out this linkCheck out this linkCheck out this linkCheck out this linkCheck out this linkCheck out this linkCheck out this linkCheck out this link.',

      isLastItem: true,
    },
  ],
};
