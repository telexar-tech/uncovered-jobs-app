import { Image, ImageSourcePropType, StyleSheet } from 'react-native';

interface ProfilePictureProps {
  imageUrl: ImageSourcePropType;
  height?: number;
  width?: number;
}

const ProfilePicture: React.FC<ProfilePictureProps> = ({
  imageUrl,
  width = 110,
  height = 110,
}) => (
  <Image
    source={imageUrl}
    style={styles.profilePicture}
    resizeMode="cover"
    height={height}
    width={width}
  />
);

const styles = StyleSheet.create({
  profilePicture: {
    borderRadius: 50,
    margin: 15,
  },
});

export default ProfilePicture;
