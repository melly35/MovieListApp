import { Alert, Linking } from "react-native";


const isNullOrEmpty = (value) => (value === "" || value === null || value === undefined || value === "undefined" || (value instanceof Array && value?.length === 0))

const generateRandomString = (length = 15) => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}


export default {
    isNullOrEmpty,
    generateRandomString
}
