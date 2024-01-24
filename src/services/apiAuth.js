import supabase, { supabaseUrl } from "./supabase";

export async function signup({ fullName, email, password }) {
    const { data, error } = await supabase.auth.signUp({
        email, password, options: {
            data: {
                fullName,
                avatar: '',
                asdasd: '', //test for seeing if this comes in user_metadata
            }
        }
    })

    if (error) throw new Error(error.message);
    return data;

}




export async function login({ email, password }) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })
    if (error)
        throw new Error(error.message);

    console.log(data);
    return data;
}

export async function getCurrentUser() {
    //
    const { data: session } = await supabase.auth.getSession();

    if (!session.session) {
        return null;
    }

    const { data, error } = await supabase.auth.getUser();

    if (error) {
        throw new Error(error.message);
    }

    return data?.user;
}

export async function logout() {
    const { error } = await supabase.auth.signOut()

    if (error) {
        throw new Error(error.message)
    }
}

export async function updateCurrentUser({ password, fullName, avatar }) {
    console.log(password, fullName, avatar)
    //1. Update password OR fullName
    let updateData;
    if (password) updateData = { password };
    if (fullName) updateData = { data: { fullName } }

    const { data, error } = await supabase.auth.updateUser(updateData)

    if (error) throw new Error(error.message);
    if (!avatar) return data;
    //2. Upload the avatar image
    const fileName = `avatar-${data.user.id}-${Math.random()}`;

    const { error: storageError } = await supabase.storage.from('avatars').upload(fileName, avatar);

    if (storageError) {
        throw new Error(storageError.message);
    }
    //3. Update avatar in the user
    // So We only do this after uploading the image to the storage and again update the avatar data so we can acces them in the frontend later

    const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({ data: { avatar: `${supabaseUrl}/storage/v1/object/public/avatars/870886.jpg?t=2023-12-23T15%3A36%3A39.643Z${fileName}` } })

    if (error2)
        throw new Error(error2.message);


    return updatedUser;
}