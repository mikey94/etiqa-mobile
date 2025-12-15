import { fetchRatings } from '@/services/ratings.service';
import { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import { setData } from "../../redux/slices/ratings-slice";
import type { RootState } from "../../redux/store";
import type { Rating } from "../../types/ratingType";

const RatingItem = ({ rating }: { rating: Rating }) => {
    return (
        <View style={styles.ratingCardContainer}>
            <Text style={styles.ratingCardTitle}>{rating.name}</Text>
            <Text style={styles.ratingCardDescription}>{rating.description}</Text>
            <View style={styles.subElementContainer}>
                <View style={styles.userDataWrapper}>
                    <Image source={{ uri: rating.owner.avatar_url }} alt="avatar" width={30} height={30} style={styles.userImage} />
                    <Text style={styles.ownerName}>{rating.owner.login}</Text>
                </View>
                <Text style={styles.starCount}>⭐ {rating.stargazers_count}</Text>
            </View>
        </View>
    )
};

export default function RatingsScreen() {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageCount, setPageCount] = useState(10);
  const dispatch = useDispatch();
  const savedData = useSelector((state: RootState) => state.rating.data);

  const getRatings = async() => {
        const response = await fetchRatings(pageNumber);
        const data = await response;
        return data
  };

  useEffect(() => {
        const loadRatings = async () => {
              try {
                  const ratingsData = await getRatings();
                  
                  const dataRating = ratingsData.items as Rating[]
                  
                  dispatch(setData(dataRating));
                  setPageCount(Math.ceil(ratingsData.total_count / 20));
                }
                catch (error) {
                  console.error("Error fetching ratings:", error);
                }
        }
        loadRatings();
  }, [pageNumber]);

  return (
    <View style={styles.container}>
      <FlatList
        data={savedData}
        renderItem={({ item }) => <RatingItem rating={item} />}
        keyExtractor={(item) => item.id.toString()}
        onEndReachedThreshold={0.05}
        onEndReached={() => {
          setPageNumber(pageNumber+1)
        }}
        style={{ backgroundColor: '#24035e', width: '100%' }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#24035e'
  },
  ratingCardContainer: {
    margin: 10,
    width: '95%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  ratingCardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#fff',
  },
  ratingCardDescription: {
    fontSize: 14,
    color: '#e2e2e2ff',
    marginBottom: 10,
    marginTop: 5,
  },
  subElementContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10
  },
  userDataWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  ownerName: {
    color: '#fff',
  },
  starCount: {
    color: '#fff',
  },
});
