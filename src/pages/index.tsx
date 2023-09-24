import { Stack, Box } from '@mui/material';
import { useCallback } from 'react';

import useHome from '@/components/home/useHome';
import ProjectCardItem from '@/components/shared/projectCard';
import FixedProgress from '@/components/shared/fixedPorgress';
import RecommendationCard from '@/components/home/RecommendationCard';
// TODO 추천 개발자 컴포넌트로 빼기
const HomePage = () => {
  const { homeList, target, isFetching, isEndOfList } = useHome({
    onGetFail: useCallback((error) => {
      console.log(error);
    }, []),
  });
  return (
    <>
      {isFetching && <FixedProgress />}
      <Stack spacing={2} mt={1}>
        {homeList.map(({ _id, projectTitle, imageUrl, name, developers }) => {
          return (
            <Box key={_id}>
              <ProjectCardItem
                name={name}
                imageUrl={imageUrl}
                projectTitle={projectTitle}
                to={_id}
              />

              {developers && <RecommendationCard developers={developers} />}
            </Box>
          );
        })}
        {!isEndOfList && <Box ref={target}></Box>}
      </Stack>
    </>
  );
};

export default HomePage;
