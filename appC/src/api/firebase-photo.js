// import database from '@react-native-firebase/database'
import storage from '@react-native-firebase/storage'
import logger from '../utils/logger'

const USER_PHOTO_TYPE = 'USERS/'

class PhotoApi {
    uploadPhoto = async (uid, photo) => {
        try {
            let link = USER_PHOTO_TYPE + uid

            const storageRef = storage().ref()

            const profilePictureRef = storageRef.child(link)

            try {
                const pictureUploaded = await profilePictureRef.putFile(photo.path)
                if (pictureUploaded) return await profilePictureRef.getDownloadURL()
            } catch (e) {
                throw new Error('error while uploading new picture')
            }
        } catch (error) {
            logger('error while uploading photo', error)

            throw new Error(error)
        }
    }
}

export default new PhotoApi()
