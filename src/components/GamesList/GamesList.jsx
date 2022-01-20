import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Box, Button, Flex } from '@chakra-ui/react';
import { getGames } from '../../store/main/mainSlice';
import { Poster } from './GamesList.styled';

export const GamesList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGames(1));
  }, []);

  const results = useSelector((state) => state.games.gamesData?.results);
  const games = useSelector((state) => state.games);
  console.log(games);
  let page = useSelector(state => state.games?.currentPage);

  const handleLoadForwardPage = () => {
    page++;
    dispatch(getGames(page));
    console.log(page);
  };
  const handleLoadPreviousPage = () => {
    if (page > 1) {
      page--;
    } else {
      dispatch(getGames(page));
      console.log(page);
      console.log('Prev page');
    }
  };
  console.log(`Внешний лог ${page}`);
  if (games.status === 'success') {
    return (
      <>
        <Flex
          justifyContent={'space-around'}
          flexWrap={'wrap'}
          backgroundColor={'black'}
        >
          {results.map((item) => {
            return (
              <Box
                key={item.name}
                m={'1vw'}
                backgroundColor={'gray'}
                borderRadius={'10px'}
                overflow={'hidden'}
                border={'solid 1px white'}
              >
                <Poster background={item.background_image} />
                <Box textAlign={'center'} py={'1vw'}>
                  {item.name}
                </Box>
              </Box>
            );
          })}
        </Flex>
        <Flex justifyContent={'center'}>
          <Button onClick={() => handleLoadPreviousPage()}>Back</Button>
          <Button onClick={() => handleLoadForwardPage()}>Forward</Button>
        </Flex>
      </>
    );
  } else return null;
};
