import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from "react-native";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase";
import useAuth from "../hooks/useAuth";
import {
  ChatBubbleLeftRightIcon,
  HeartIcon,
  XMarkIcon,
} from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import Swiper from "react-native-deck-swiper";
import {
  DocumentSnapshot,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import generateId from "../lib/generateId";

const DUMMY_DATA = [
  {
    id: 123,
    firstName: "bernice",
    lastName: "first",
    job: "photographe ",
    photoURL:
      "https://cdn.pixabay.com/photo/2017/10/19/09/13/model-2866905_960_720.jpg",
    age: 27,
  },
  {
    id: 124,
    firstName: "James",
    lastName: "second",
    job: "acteur cinema",
    photoURL:
      "https://cdn.pixabay.com/photo/2021/02/08/16/55/man-5995588_640.jpg",
    age: 27,
  },
  {
    id: 129,
    firstName: "Merveille",
    lastName: "third",
    job: "cute girl",
    photoURL:
      "https://cdn.pixabay.com/photo/2016/03/23/04/11/beautiful-1274064_640.jpg",
    age: 27,
  },
  {
    id: 125,
    firstName: "Toni",
    lastName: "fourd",
    job: "toni univer",
    photoURL:
      "https://cdn.pixabay.com/photo/2017/12/30/11/58/man-3049894_640.jpg",
    age: 27,
  },
];

const HomeScreen = () => {
  const navigation = useNavigation();
  const { user, logout } = useAuth();
  const [profiles, setProfiles] = useState([]);
  const swipeRef = useRef(null);

  useLayoutEffect(() => {
    onSnapshot(doc(db, "users", user.uid), (snapshot) => {
      if (!snapshot.exists()) {
        navigation.navigate("Modal");
      }
    });
  }, []);

  useEffect(() => {
    const fetchCard = async () => {
      const passes = await getDocs(
        collection(db, "users", user.uid, "passes")
      ).then((snapshot) => snapshot.docs.map((doc) => doc.id));
      const swipes = await getDocs(
        collection(db, "users", user.uid, "swipes")
      ).then((snapshot) => snapshot.docs.map((doc) => doc.id));
      const passedUserIds = passes.length > 0 ? passes : ["test"];
      const swipedUserIds = swipes.length > 0 ? swipes : ["test"];

      console.log([...passedUserIds, ...swipedUserIds]);
      const unsub = onSnapshot(
        query(
          collection(db, "users"),
          where("id", "not-in", [...passedUserIds, ...swipedUserIds])
        ),
        (snapshot) => {
          setProfiles(
            snapshot.docs
              .filter((doc) => doc.id !== user.uid)
              .map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }))
          );
        }
      );
      return () => unsub();
    };
    fetchCard();
  }, [db, user.uid]);

  // useEffect(() => {
  //   const fetchCard = async () => {
  //     let unsub;
  //     const passes = await getDocs(
  //       collection(db, "users", user.uid, "passes")
  //     ).then((snapshot) => snapshot.docs.map((doc) => doc.id));
  //     const swipes = await getDocs(
  //       collection(db, "users", user.uid, "swipes")
  //     ).then((snapshot) => snapshot.docs.map((doc) => doc.id));
  //     const passedUserIds = passes.length > 0 ? passes : ["test"];
  //     const swipedUserIds = swipes.length > 0 ? swipes : ["test"];

  //     console.log([...passedUserIds, ...swipedUserIds]);
  //     unsub = onSnapshot(
  //       query(
  //         collection(db, "users"),
  //         where("id", "not-in", [...passedUserIds, ...swipedUserIds])
  //       ),
  //       (snapshot) => {
  //         setProfiles(
  //           snapshot.docs
  //             .filter((doc) => doc.id !== user.uid)
  //             .map((doc) => ({
  //               id: doc.id,
  //               ...doc.data(),
  //             }))
  //         );
  //       }
  //     );
  //   };
  //   fetchCard();
  //   return unsub;
  // }, [db]);

  const swipeLeft = async (cardIndex) => {
    if (!profiles[cardIndex]) return;
    const userSwiped = profiles[cardIndex];
    setDoc(doc(db, "users", user.uid, "passes", userSwiped.id), userSwiped);
  };
  const swipeRight = async (cardIndex) => {
    if (!profiles[cardIndex]) return;
    const userSwiped = profiles[cardIndex];

    const loggedInprofiles = await (
      await getDoc(doc(db, "users", user.uid))
    ).data();
    // chek if the user swiped on you
    getDoc(doc(db, "users", userSwiped.id, "swipes", user.uid)).then(
      (documentSnapshot) => {
        if (documentSnapshot.exists()) {
          //user had matched with you before you matched with then...

          console.log(`you matches whive ${userSwiped.job}`);
          setDoc(
            doc(db, "users", user.uid, "swipes", userSwiped.id),
            userSwiped
          );
          // create a Matche

          setDoc(doc(db, 'matches', generateId(user.uid, userSwiped.id)),{
            users : {
              [user.uid]: loggedInprofiles,
              [userSwiped.id]: userSwiped,
            },
            usersMatched: [user.uid, userSwiped.id],
            timestamp: serverTimestamp(),
          })
          navigation.navigate("Match",{
            loggedInprofiles,
            userSwiped
          })

        } else {
          console.log(
            `You swiped on  ${userSwiped.displayName} (${userSwiped.job})`
          );

          setDoc(
            doc(db, "users", user.uid, "swipes", userSwiped.id),
            userSwiped
          );
        }
      }
    );
  };

  console.log(profiles);
  return (
    <SafeAreaView className="flex-1 pt-3 mt-3">
      {/* Header */}
      <View className="flex-row px-5 items-center justify-between relative">
        <TouchableOpacity onPress={logout} className="">
          <Image
            source={
              user.photoURL
                ? user.photoURL
                : require("../assets/images/tinder.png")
            }
            className="h-10 w-10 rounded-full"
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Modal")}>
          <Image
            source={require("../assets/tinder.png")}
            className="h-14 w-14 "
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
          <ChatBubbleLeftRightIcon size={40} color="#ff5864" />
        </TouchableOpacity>
      </View>

      {/* End of Header */}

      {/* Cards Start */}
      <View className="flex-1 -mt-6">
        <Swiper
          ref={swipeRef}
          containerStyle={{ backgroundColor: "transparent" }}
          stackSize={5}
          cardIndex={0}
          animateCardOpacity
          verticalSwipe={false}
          onSwipedLeft={(cardIndex) => {
            console.log("Swip pass");
            swipeLeft(cardIndex);
          }}
          onSwipedRight={(cardIndex) => {
            console.log("Swipe MATCH");
            swipeRight(cardIndex);
          }}
          overlayLabels={{
            left: {
              title: "NOPE",
              style: {
                label: {
                  textAlign: "right",
                  color: "red",
                },
              },
            },
            right: {
              title: "MATCH",
              style: {
                label: {
                  textAlign: "left",
                  color: "#4ded30",
                },
              },
            },
          }}
          cards={profiles}
          renderCard={(card) =>
            card ? (
              <View
                key={card.id}
                className="relative bg-white h-3/4 rounded-xl"
              >
                <Image
                  source={{ uri: card.photoURL }}
                  className="absolute top-0 h-full w-full rounded-xl"
                />
                <View className="absolute bottom-0 bg-white w-full flex-row justify-between items-center h-20 px-6 py-2 rounded-b-xl shadow-xl">
                  <View>
                    <Text className="text-xl font-bold">ici sera le nom</Text>
                    <Text>{card.job} </Text>
                  </View>
                  <Text className="text-2xl font-bold">{card.age} </Text>
                </View>
              </View>
            ) : (
              <View className="relative bg-white h-3/4 rounded-xl justify-center items-center shadow-sm">
                <Text className="pb-5 font-bold">No more profiles </Text>
                <Image
                  source={{ uri: "https://links.papareact.com/6gb" }}
                  className=" h-20 w-20 "
                />
              </View>
            )
          }
        />
      </View>
      {/* End of cards */}
      <View className="flex flex-row justify-evenly">
        <TouchableOpacity
          onPress={() => swipeRef.current.swipeLeft()}
          className="items-center justify-center rounded-full w-16 h-16 bg-red-200"
        >
          <XMarkIcon size={24} color="red" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => swipeRef.current.swipeRight()}
          className="items-center justify-center rounded-full w-16 h-16 bg-green-200"
        >
          <HeartIcon size={24} color="green" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
