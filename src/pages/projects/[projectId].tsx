import styled from '@emotion/styled';
import { Box, Divider, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import BasicAvatar from '@/components/shared/avatar';
import ItemWithAvatar from '@/components/shared/itemWithAvatar';

export default function ProjectDetailPage() {
  const {
    projectImage,
    profileImage,
    userName,
    _id,
    date,
    title,
    contents,
    comments,
  } = DUMMY_DATA;

  const navigate = useNavigate();

  const onClickProfile = (id: number) => {
    navigate('/profile/' + id);
  };

  return (
    <Stack spacing={3}>
      <ProjectImageStyled component="img" src={projectImage} alt="참외" />
      <Stack direction="row" alignItems="center" spacing={2}>
        <BasicAvatar
          imgSrc={profileImage}
          alt={userName + "'s profile"}
          onClick={() => onClickProfile(_id)}
        />
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
          <ItemWithAvatar
            {...data}
            key={i}
            isComment={true}
            AvatarProps={{ onClick: () => onClickProfile(data._id) }}
          />
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
  projectImage: '/assets/Logo96.svg',
  profileImage:
    'https://img.freepik.com/free-photo/world-smile-day-emojis-arrangement_23-2149024491.jpg?q=10&h=200',
  _id: 1,
  userName:
    '사용자사용자사용자사용자사용자사용자사용자사용자사용자사용자사용자사용자사용자사용자사용자사용자사용자사용자사용자사용자사용자사용자사용자사용자사용자사용자사용자사용자',
  date: '2022.03.14',
  title: 'This is Title',
  contents: `We need DesignerIt is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.`,
  comments: [
    {
      AvatarProps: {
        isUserOn: false,
      },
      _id: 2,
      name: '댓글 List',
      message:
        'Check out this linkCheck out this linkCheck out this linkCheck out this linkCheck out this linkCheck out this linkCheck out this linkCheck out this link.',
    },
    {
      AvatarProps: {
        isUserOn: false,
      },
      _id: 3,
      name: '댓글 List',
      message:
        'Check out this linkCheck out this linkCheck out this linkCheck out this linkCheck out this linkCheck out this linkCheck out this linkCheck out this link.',

      isLastItem: true,
    },
  ],
};
