import Ionicons from "react-native-vector-icons/Ionicons";
import {Pressable, View} from "react-native";
import supabase from "supabase";
import FinanceerText from "components/FinanceerText";
import {useNavigation} from "@react-navigation/native";
import useCurrentUser from "auth/useCurrentUser";

const ProfileScreen = () => {

    const navigation = useNavigation()
    const pkg = require('../../package.json');

    const user = useCurrentUser()

    if (!user) {
        return <><FinanceerText></FinanceerText></>
    }

    return <>
        <View className={"self-end"}>
            <Pressable onPress={() => navigation.pop()}>
                <Ionicons color={'white'} name="close-circle" size={'35'}/>
            </Pressable>
        </View>

        <View className={"flex-1 my-20 mx-auto justify-center"}>
            <FinanceerText>{user.email}</FinanceerText>
            <Pressable onPress={() => supabase.auth.signOut()}><FinanceerText
                className={"text-primary"}>Logout</FinanceerText></Pressable>
        </View>

        <FinanceerText className={"mb-10 justify-center mx-auto"}>Version: {pkg.version}</FinanceerText>
    </>
}

export default ProfileScreen