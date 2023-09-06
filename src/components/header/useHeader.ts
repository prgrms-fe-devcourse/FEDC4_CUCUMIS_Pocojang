import { useEffect, useState } from 'react';

import { MainHeader, PageNavigator } from './HeaderNavigation';

const useHeader = () => {
  const [page, setPage] = useState('Main'); // store/router에서 page 정보
  const [header, setHeader] = useState(
    MainHeader({
      isLoggedIn: true,
      event: () => console.log('hi'),
    }),
  );

  useEffect(() => {
    const headerData = PageNavigator({
      isLoggedIn: true,
      pageName: 'temp',
      event: () => console.log('hi'), // 이벤트 핸들러에 이벤트 객체를 전달
    })[page];

    setHeader(headerData);
    setPage('Main');
  }, [page]);

  return {
    header,
  };
};

export default useHeader;
