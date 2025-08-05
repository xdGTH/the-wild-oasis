import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  //If the image is uploaded then the image data is present otherwise the imageurl is present
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images${imageName}`;

  //1. Create/Edit a cabin
  let query = supabase.from("cabins");

  //A) CREATE
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]); // we have the fields name exactly like there on the supabase tables. so the newCabin object has the same named data (CreateCabinForm) as of the table

  //B) EDIT
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query
    .select() //This select will immediately select the inserted data and assign it to data variable
    .single();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }

  //2. Upload the image to the bucket
  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  //3. Delete the cabin IF there was an error uploading image but the cabin data was already inserted.
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "Cabin image could not be uploaded. So cabin was not created"
    );
  }
  return data;
}

export async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }
}
