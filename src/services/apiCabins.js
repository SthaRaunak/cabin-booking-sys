
import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
    const { data, error } = await supabase
        .from('cabins')
        .select('*')
    if (error) {
        console.log(error)
        throw new Error("Cabins could not be loaded")
    }
    return data;

}



export async function deleteCabin(id) {
    const { data, error } = await supabase
        .from('cabins')
        .delete()
        .eq('id', id)

    if (error) {
        console.log(error)
        throw new Error("Cabin could not be deleted!!")
    }
    return data;
}


export async function createEditCabin(newCabin, id) {

    //if the image is already having url path
    const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl)

    const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll("/", "")

    const imagePath = hasImagePath ? newCabin.image : `${supabaseUrl}/storage/v1/object/public/cabins/${imageName}`
    //https://vipcldfxtldtoxpxolpm.supabase.co/storage/v1/object/public/cabins/cabin-002.jpg

    //1. Create/edit cabin itself
    let query = supabase.from('cabins')


    //A) create
    if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

    // B) Editing
    //updating the query based on id 
    if (id) query = query.update({ ...newCabin, image: imagePath }).eq('id', id)

    const { data, error } = await query.select().single();

    if (error) {
        console.log(error)
        throw new Error("Cabin could not be created!!")
    }


    //2. if success then we upload the image
    if (hasImagePath) return data;

    const { error: storageError } = await supabase.storage.from('cabins').upload(imageName, newCabin.image)

    //3. Delete the cabin If there was an error uploading Image
    //we get data from supa base in line 36
    if (storageError) {
        await supabase.from('cabins').delete().eq('id', data.id)
        console.log(storageError)
        throw new Error("Couldnt upload the cabin image to storage: cabin failed to create")
    }
    return data;
}