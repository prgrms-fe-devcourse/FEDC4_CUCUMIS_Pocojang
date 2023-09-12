import { Stack } from '@mui/material';
import styled from '@emotion/styled';

import DeveloperCardItem from '@/components/shared/developerCard';
import AvatarWithChip from '@/components/shared/avatarWithChip';

//TODO key는 id로
const DevelopersPage = () => {
  return (
    <>
      <StyledStack direction="row" spacing={3}>
        {dummyUsingDevelopers.map((developer) => (
          <AvatarWithChip
            AvatarProps={developer.AvatarProps}
            label={developer.label}
          />
        ))}
      </StyledStack>

      <Stack direction="column" alignItems="center" spacing={2}>
        {dummyDevelopers.map((developer, index) => {
          return (
            <DeveloperCardItem
              AvatarProps={developer.AvatarProps}
              name={developer.name}
              oneliner={developer.oneliner}
              description={developer.description}
              to={(index + 1).toString()}
            />
          );
        })}
      </Stack>
    </>
  );
};

const StyledStack = styled(Stack)({
  margin: 'auto',
  width: '350px',
  overflowX: 'scroll',
  overflowY: 'visible',
  '&::-webkit-scrollbar': {
    width: '0',
    height: '0',
  },
});

export default DevelopersPage;

const AvatarProps = {
  imageSrc: 'https://source.unsplash.com/random',
  isUserOn: true,
};

const dummyUsingDevelopers = [
  { AvatarProps, label: 'UsingUser1' },
  { AvatarProps, label: 'UsingUser1' },
  { AvatarProps, label: 'UsingUser1' },
  { AvatarProps, label: 'UsingUser1' },
  { AvatarProps, label: 'UsingUser1' },
  { AvatarProps, label: 'UsingUser1' },
  { AvatarProps, label: 'UsingUser1' },
  { AvatarProps, label: 'UsingUser1' },
  { AvatarProps, label: 'UsingUser1' },
  { AvatarProps, label: 'UsingUser1' },
  { AvatarProps, label: 'UsingUser1' },
  { AvatarProps, label: 'UsingUser1' },
  { AvatarProps, label: 'UsingUser1' },
  { AvatarProps, label: 'UsingUser1' },
  { AvatarProps, label: 'UsingUser1' },
];

const dummyDevelopers = [
  {
    AvatarProps,
    oneliner: '동해물과 백두산이 마르고 닳도록 ',
    name: '어쩌구씨',
    description:
      '사람들은 다양한 이유로 웹 앱 또는 네이티브 앱을 선호합니다. React는 동일한 기술을 사용하여 웹 앱과 네이티브 앱을 모두 만들 수 있습니다. 각 플랫폼의 강점을 활용하여 모든 플랫폼에 적합한 인터페이스를 구현할 수 있습니다.',
  },
  {
    AvatarProps,
    oneliner: '동해물과 백두산이 마르고 닳도록 ',
    name: '어쩌구씨',
    description:
      '사람들은 다양한 이유로 웹 앱 또는 네이티브 앱을 선호합니다. React는 동일한 기술을 사용하여 웹 앱과 네이티브 앱을 모두 만들 수 있습니다. 각 플랫폼의 강점을 활용하여 모든 플랫폼에 적합한 인터페이스를 구현할 수 있습니다.',
  },
  {
    AvatarProps,
    oneliner: '동해물과 백두산이 마르고 닳도록 ',
    name: '어쩌구씨',
    description:
      '사람들은 다양한 이유로 웹 앱 또는 네이티브 앱을 선호합니다. React는 동일한 기술을 사용하여 웹 앱과 네이티브 앱을 모두 만들 수 있습니다. 각 플랫폼의 강점을 활용하여 모든 플랫폼에 적합한 인터페이스를 구현할 수 있습니다.',
  },
  {
    AvatarProps,
    oneliner: '동해물과 백두산이 마르고 닳도록 ',
    name: '어쩌구씨',
    description:
      '사람들은 다양한 이유로 웹 앱 또는 네이티브 앱을 선호합니다. React는 동일한 기술을 사용하여 웹 앱과 네이티브 앱을 모두 만들 수 있습니다. 각 플랫폼의 강점을 활용하여 모든 플랫폼에 적합한 인터페이스를 구현할 수 있습니다.',
  },
  {
    AvatarProps,
    oneliner: '동해물과 백두산이 마르고 닳도록 ',
    name: '어쩌구씨',
    description:
      '사람들은 다양한 이유로 웹 앱 또는 네이티브 앱을 선호합니다. React는 동일한 기술을 사용하여 웹 앱과 네이티브 앱을 모두 만들 수 있습니다. 각 플랫폼의 강점을 활용하여 모든 플랫폼에 적합한 인터페이스를 구현할 수 있습니다.',
  },
  {
    AvatarProps,
    oneliner: '동해물과 백두산이 마르고 닳도록 ',
    name: '어쩌구씨',
    description:
      '사람들은 다양한 이유로 웹 앱 또는 네이티브 앱을 선호합니다. React는 동일한 기술을 사용하여 웹 앱과 네이티브 앱을 모두 만들 수 있습니다. 각 플랫폼의 강점을 활용하여 모든 플랫폼에 적합한 인터페이스를 구현할 수 있습니다.',
  },
  {
    AvatarProps,
    oneliner: '동해물과 백두산이 마르고 닳도록 ',
    name: '어쩌구씨',
    description:
      '사람들은 다양한 이유로 웹 앱 또는 네이티브 앱을 선호합니다. React는 동일한 기술을 사용하여 웹 앱과 네이티브 앱을 모두 만들 수 있습니다. 각 플랫폼의 강점을 활용하여 모든 플랫폼에 적합한 인터페이스를 구현할 수 있습니다.',
  },
  {
    AvatarProps,
    oneliner: '동해물과 백두산이 마르고 닳도록 ',
    name: '어쩌구씨',
    description:
      '사람들은 다양한 이유로 웹 앱 또는 네이티브 앱을 선호합니다. React는 동일한 기술을 사용하여 웹 앱과 네이티브 앱을 모두 만들 수 있습니다. 각 플랫폼의 강점을 활용하여 모든 플랫폼에 적합한 인터페이스를 구현할 수 있습니다.',
  },
  {
    AvatarProps,
    oneliner: '동해물과 백두산이 마르고 닳도록 ',
    name: '어쩌구씨',
    description:
      '사람들은 다양한 이유로 웹 앱 또는 네이티브 앱을 선호합니다. React는 동일한 기술을 사용하여 웹 앱과 네이티브 앱을 모두 만들 수 있습니다. 각 플랫폼의 강점을 활용하여 모든 플랫폼에 적합한 인터페이스를 구현할 수 있습니다.',
  },
];

// export default function DeveloperList() {
//   const [data, setData] = useState('');
//   const navigate = useNavigate();
//   const [searchParams, setSearchParams] = useSearchParams();
//   const inputValue = searchParams.get('keyword');

//   console.log(inputValue);
//   console.log(setSearchParams); // TODO : 주석처리 => 일단 참조를 하지 않으면 error => 억지로 참조..
//   return (
//     <div>
//       <form
//         onSubmit={(e) => {
//           e.preventDefault();
//           if (data.length > 0) {
//             alert(data);
//             navigate(`/developers?keyword=${data}`);
//           } else {
//             alert('1글자는 입력해주세요1');
//           }
//         }}
//       >
//         <input
//           type="text"
//           placeholder="Search developer!"
//           onChange={(e) => {
//             setData(e.target.value);
//           }}
//         />
//         <button>제출!</button>
//       </form>

//       <ul>
//         <li>
//           <Link to="/developers/1">1번 개발자</Link>
//         </li>
//         <li>
//           <Link to="/developers/2">2번 개발자</Link>
//         </li>
//         <li>
//           <Link to="/developers/3">3번 개발자</Link>
//         </li>
//         <li>
//           <Link to="/developers/4">4번 개발자</Link>
//         </li>
//         <li>
//           <Link to="/developers/5">5번 개발자</Link>
//         </li>
//       </ul>
//     </div>
//   );
// }
